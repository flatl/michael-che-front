<template>
  <div
    ref="headerColors"
    class="header-colors"
    @click="handleClickIcon"
  >
    <img
      src="@/assets/icons/colors.png"
      class="header-colors__thumb"
    />
    <header-item-list
      :list="items"
      :is-open="isListOpen"
      is-colors
      class="header-colors__list"
      @select="handleSelect"
      @unselect="handleUnselect"
    />
  </div>  
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isListOpen: false,
    };
  },

  mounted() {
    document.addEventListener('click', this.handleCloseList);
  },

  destroyed() {
    document.removeEventListener('click', this.handleCloseList);
  },

  methods: {
    handleClickIcon() {
      this.isListOpen = !this.isListOpen;
    },

    handleSelect(item) {
      this.$emit('select', item);
    },

    handleUnselect(item) {
      this.$emit('unselect', item);
    },

    handleCloseList(event) {
      const clickSelf = event.path.some(
        tag => tag === this.$refs.headerColors
      );
      if (clickSelf) return;
      this.isListOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-colors {
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &__list {
    position: absolute;
    right: 10px;
    top: 40px;
  }
}
</style>
