<template>
  <div class="admin-project-item">
    <div class="admin-project-item__left">
      <img :src="imageSrc" alt="" class="admin-project-item__image" />
      <span
        class="admin-project-item__title"
        @click="$emit('clickItem', project.id)"
      >
        {{ project.title }}
      </span>
    </div>

    <div class="admin-project-item__controls">
      <img
        src="@/assets/icons/edit.png"
        class="admin-project-item__edit"
        @click="$emit('editItem', project.id)"
      />
      <img
        src="@/assets/icons/basket.png"
        class="admin-project-item__delete"
        @click="$emit('deleteItem', project.id)"  
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    imageSrc() {
      const imageName = this.project.images[0];
      return process.env.baseImageUrl + imageName;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-project-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-bottom: 1px solid rgb(216, 222, 228);

  &:hover {
    background-color: rgb(246, 248, 250);
  }

  &__left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__image {
    width: 120px;
    margin: 0 16px 0 0;
    border-radius: 6px;
  }

  &__title {
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    color: #111;

    &:hover {
      color: #0969da;
      cursor: pointer;
    }
  }

  &__controls {
    display: flex;
    flex-direction: row;
  }

  &__delete {
    margin-right: 0;
  }

  &__edit,
  &__delete {
    width: 32px;
    margin: 0 20px 0 0;
    cursor: pointer;
  }
}
</style>
