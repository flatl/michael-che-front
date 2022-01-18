<template>
  <div class="page">
    <div class="page-container">
      <che-header
        :categories="categories"
        :types="types"
        :colors="colors"
        @selectCategory="() => void 0"
        @selectType="() => void 0"
        @selectColor="() => void 0"
        @unselectCategory="() => void 0"
        @unselectType="() => void 0"
        @unselectColor="() => void 0"
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
    };
  },

  computed: {
    ...mapState({
      projects: (state) => state.project.list,
      categories: (state) => state.project.categories.map(
        category => category.title
      ),
      types: (state) => state.project.types.map(
        pType => pType.title
      ),
      colors: (state) => state.project.colors.map(
        color => color.value
      ),
    }),
  },

  methods: {
    toggleMenuOpen() {
      this.isMenuOpen = !this.isMenuOpen;
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
