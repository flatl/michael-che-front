<template>
  <div
    ref="headerCategories"
    class="header-categories"
    @click="handleClickIcon"
  >
    <CategoriesIcon class="header-categories__thumb" />
    <header-item-list
      :list="items"
      :is-open="isListOpen"
      class="header-categories__list"
      @select="handleSelect"
      @unselect="handleUnselect"
    />
  </div>
</template>

<script>
import HeaderItemList from '@/components/header/HeaderItemList.vue';
import CategoriesIcon from '@/assets/icons/categories.svg?inline';

export default {
  components: { HeaderItemList, CategoriesIcon },

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
        tag => tag === this.$refs.headerCategories
      );
      if (clickSelf) return;
      this.isListOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-categories {
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
