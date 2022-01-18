<template>
  <div class="admin-projects-catalog">
      <admin-project-item
        v-for="project in projects"
        :key="project.id"
        :project="project"
        class="admin-projects-catalog__item"
        @clickItem="handleClickProject"
        @editItem="handleEditProject"
        @deleteItem="handleDeleteProject"
      />
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleClickProject(id) {
      this.$emit('clickItem', id);
    },

    handleEditProject(id) {
      this.$emit('editItem', id);
    },

    handleDeleteProject(id) {
      this.$emit('deleteItem', id);
    },
  }
};
</script>

<style lang="scss" scoped>
.admin-projects-catalog {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid rgb(216, 222, 228);
  border-radius: 6px;

  &__item {
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
