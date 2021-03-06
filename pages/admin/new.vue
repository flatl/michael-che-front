<template>
  <div class="admin-edit-project">
    <div class="admin-edit-project__container">
      <h1 class="admin-edit-project__title">
        Создание проекта {{ project.title }}
      </h1>

      <admin-section-title
        :value="project.title"
        @change="handleChangeTitle"
      />
      <admin-section-description
        :value="project.description"
        @change="handleChangeDescription"
      />
      <admin-section-categories
        :items="categories"
        @select="(item) => handleSelect('categories')(item)"
        @unselect="(item) => handleUnselect('categories')(item)"
        @add="handleAddCategory"
      />
      <admin-section-types
        :items="types"
        @select="(item) => handleSelect('types')(item)"
        @unselect="(item) => handleUnselect('types')(item)"
        @add="handleAddType"
      />
      <admin-section-colors
        :items="colors"
        @select="(item) => handleSelect('colors')(item)"
        @unselect="(item) => handleUnselect('colors')(item)"
        @add="handleAddColor"
      />
      <admin-section-images
        :new-images="newImages"
        @loadImages="handleLoadImages"
        @removeNew="handleRemoveNewImage"
      />

      <input
        type="submit"
        value="Создать"
        class="admin-edit-project__submit"
        @click="submitData"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheInput from '@/components/share/CheInput.vue';
import CheTextarea from '@/components/share/CheTextarea.vue';
import CheSelect from '@/components/share/CheSelect.vue';
import AdminSectionTitle from '@/components/admin/sections/AdminSectionTitle.vue';
import AdminSectionDescription from '@/components/admin/sections/AdminSectionDescription.vue';
import AdminSectionCategories from '@/components/admin/sections/AdminSectionCategories.vue';
import AdminSectionTypes from '@/components/admin/sections/AdminSectionTypes.vue';
import AdminSectionColors from '@/components/admin/sections/AdminSectionColors.vue';
import AdminSectionImages from '@/components/admin/sections/AdminSectionImages.vue';

export default {
  components: {
    CheSelect,
    CheInput,
    CheTextarea,
    AdminSectionTitle,
    AdminSectionDescription,
    AdminSectionCategories,
    AdminSectionTypes,
    AdminSectionColors,
    AdminSectionImages,
  },

  async validate({ redirect, $api }) {
    const isAdmin = await $api.isAdmin();
    if (isAdmin) {
      return true;
    }
    redirect('/login');
  },


  async fetch() {
    const categories = await this.$api.getProjectCategories();
    const types = await this.$api.getProjectTypes();
    const colors = await this.$api.getProjectColors();

    this.$store.dispatch('project/setCategories', categories);
    this.$store.dispatch('project/setTypes', types);
    this.$store.dispatch('project/setColors', colors);
  },

  destroyed() {
    this.$store.dispatch('project/clearNew');
    this.$store.dispatch('project/setNewImages', []);
  },

  computed: {
    ...mapState({
      project: (state) => state.project.new,
      allCategories: (state) => state.project.categories,
      allTypes: (state) => state.project.types,
      allColors: (state) => state.project.colors,
      newImages: (state) => state.project.newImages,
    }),

    categories() {
      if (!this.project.categories) return [];

      return this.allCategories.map(category => ({
        value: category.title,
        isSelected: this.project.categories.includes(category.title),
      }));
    },

    colors() {
      if (!this.project.colors) return [];

      return this.allColors.map(color => ({
        value: color.value,
        isSelected: this.project.colors.includes(color.value),
      }));
    },

    types() {
      if (!this.project.types) return [];

      return this.allTypes.map(projectType => ({
        value: projectType.title,
        isSelected: this.project.types.includes(projectType.title),
      }));
    },
  },

  methods: {
    handleChangeTitle(value) {
      this.$store.dispatch('project/setNew', {
        ...this.project,
        title: value,
      });
    },

    handleChangeDescription(value) {
      this.$store.dispatch('project/setNew', {
        ...this.project,
        description: value,
      });
    },

    handleSelect(propName) {
      return function(item) {
        this.$store.dispatch('project/setNew', {
          ...this.project,
          [propName]: [...this.project[propName], item.value],
        });
      }.bind(this);
    },

    handleUnselect(propName) {
      return function(item) {
        this.$store.dispatch('project/setNew', {
          ...this.project,
          [propName]: this.project[propName].filter(i => i !== item.value),
        });
      }.bind(this);
    },

    handleAddCategory(value) {
      this.$store.dispatch('project/setCategories',
        [...this.allCategories, {
          id: 0,
          title: value,
        }]
      );
    },

    handleAddType(value) {
      this.$store.dispatch('project/setTypes',
        [...this.allTypes, {
          id: 0,
          title: value,
        }]
      );
    },

    handleAddColor(value) {
      this.$store.dispatch('project/setColors',
        [...this.allColors, {
          id: 0,
          value: value.slice(1),
        }]
      );
    },

    handleLoadImages(images) {
      this.$store.dispatch('project/setNewImages', [
        ...this.newImages,
        ...images
      ]);
    },

    handleRemoveNewImage(image) {
      this.$store.dispatch('project/setNewImages',
        this.newImages.filter(i => i !== image)
      );
    },

    async submitData() {
      const data = this.$store.getters['project/newProjectFormData'];
      this.$toast.show('Добавляем проект..');
      const isSuccess = await this.$api.createProject(data);

      this.$toast.clear();

      if (isSuccess) {
        this.$toast.success('Проект успешно добавлен', { duration: 2e3 });
        setTimeout(() => this.$router.push('/admin'), 1e3);
      } else {
        this.$toast.error('Ой-ой, произошла ошибка', { duration: 3e3 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-edit-project {
  width: 100%;
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 60px 24px;
  }

  &__title {
    font-size: 28px;
    font-weight: 500;
    margin: 0 0 40px 0;
  }

  &__submit {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #fff;
    width: 262px;
    height: 60px;
    margin: 12px 0 0 0;
    padding: 5px 16px;
    outline: none;
    border: 1px solid rgba(27, 31, 36, 0.15);
    border-radius: 6px;
    background-color: #2d924e;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    cursor: pointer;
  }
}
</style>
