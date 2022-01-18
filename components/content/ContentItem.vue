<template>
  <div class="content-item">
    <img
      :src="imageUrl"
      class="content-item__image"
      @click="handleClick"
    />
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.content-item {
  width: 264px;
  height: 264px;
  margin: 0 20px 20px 0;
  border-radius: 8px;
  user-select: none;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
}

@media (max-width: 600px) {
  .content-item {
    width: 112px;
    height: 112px;
    margin: 0 6px 6px 0;
  }
}
</style>
