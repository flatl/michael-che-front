<template>
  <div
    ref="headerTypes"
    class="header-types"
    @click="handleClickIcon"
  >
    <TypesIcon class="header-types__thumb" />
    <header-item-list
      :list="items"
      :is-open="isListOpen"
      class="header-types__list"
      @select="handleSelect"
      @unselect="handleUnselect"
    />
  </div>
</template>

<script>
import HeaderItemList from '@/components/header/HeaderItemList.vue';
import TypesIcon from '@/assets/icons/types.svg?inline';

export default {
  components: { HeaderItemList, TypesIcon },

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
        tag => tag === this.$refs.headerTypes
      );
      if (clickSelf) return;
      this.isListOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-types {
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
