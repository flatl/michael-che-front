<template>
  <div class="page">
    <div class="page-container">
      <che-header
        :categories="categories"
        :types="types"
        :colors="colors"
        @selectCategory="handleSelectCategory"
        @selectType="handleSelectType"
        @selectColor="handleSelectColor"
        @unselectCategory="handleUnselectCategory"
        @unselectType="handleUnselectType"
        @unselectColor="handleUnselectColor"
        @openMenu="toggleMenuOpen"
        @closeMenu="toggleMenuOpen"
      />
      <che-about v-if="isMenuOpen" />
      <che-content v-else :list="projects"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheHeader from '@/components/header/CheHeader.vue';
import CheContent from '@/components/content/CheContent.vue';

export default {
  components: {
    CheHeader,
    CheContent,
  },

  async fetch() {
    const projects = await this.$api.getProjects();
    const categories = await this.$api.getProjectCategories();
    const types = await this.$api.getProjectTypes();
    const colors = await this.$api.getProjectColors();

    this.$store.dispatch('project/setList', projects);
    this.$store.dispatch('project/setCategories', categories);
    this.$store.dispatch('project/setTypes', types);
    this.$store.dispatch('project/setColors', colors);
  },

  data() {
    return {
      isMenuOpen: false,
      categoryFilters: [],
      typeFilters: [],
      colorFilters: [],
    };
  },

  computed: {
    ...mapState({
      projects(state) {
        return state.project.list
          .filter(this.filterCategory)
          .filter(this.filterType)
          .filter(this.filterColor);
      },

      categories: (state) =>
        state.project.categories
          .map(category => category.title),

      types: (state) =>
        state.project.types
          .map(type => type.title),

      colors: (state) =>
        state.project.colors
          .map(color => color.value),
    }),
  },

  methods: {
    handleSelectCategory(category) {
      this.categoryFilters = [...this.categoryFilters, category];
    },

    handleSelectType(type) {
      this.typeFilters = [...this.typeFilters, type];
    },

    handleSelectColor(color) {
      this.colorFilters = [...this.colorFilters, color];
    },

    handleUnselectCategory(category) {
      this.categoryFilters =
        this.categoryFilters.filter((cat) => cat !== category);
    },

    handleUnselectType(type) {
      this.typeFilters =
        this.typeFilters.filter((t) => t !== type);
    },

    handleUnselectColor(color) {
      this.colorFilters =
        this.colorFilters.filter((col) => col !== color);
    },

    toggleMenuOpen() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    filterCategory(item) {
      if (this.categoryFilters.length === 0) return true;

      return item.categories.some(
        (category) => this.categoryFilters.includes(category)
      );
    },

    filterType(item) {
      if (this.typeFilters.length === 0) return true;

      return item.types.some(
        (type) => this.typeFilters.includes(type)
      );
    },

    filterColor(item) {
      if (this.colorFilters.length === 0) return true;

      return item.colors.some(
        (color) => this.colorFilters.includes(color)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.page-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
