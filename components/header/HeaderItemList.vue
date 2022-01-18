<template>
  <div
    v-if="isOpen"
    :class="['header-item-list', { colors: isColors }]"
    @click.stop=""
  >
    <template v-if="isColors">
      <div v-for="(color, index) in list"
        :key="index"
        :class="[
          'header-item-list__item color',
          { selected: selectedItems.includes(color) } 
        ]"
        :style="{ 'background-color': '#'.concat(color) }"
        @click="toggleSelect(color)"
      >
        <CheckMark class="header-item-list__check-mark" />
      </div>
    </template>
    <template v-else>
      <div
        :class="[
          'header-item-list__item',
          { selected: selectedItems.length === 0 }
        ]"
        @click="unselectAll"
      >
        <CheckMark class="header-item-list__check-mark" />
        Показать все
      </div>
      <div v-for="(item, index) in list"
        :key="index"
        :class="[
          'header-item-list__item',
          { selected: selectedItems.includes(item) }
        ]"
        @click="toggleSelect(item)"
      >
        <CheckMark class="header-item-list__check-mark" />
        {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
import CheckMark from '@/assets/icons/checkMark.svg?inline';

export default {
  emits: ['select', 'unselect'],
  components: { CheckMark },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isColors: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedItems: [],
    };
  },

  methods: {
    toggleSelect(item) {
      if (this.selectedItems.includes(item)) {
        this.$emit('unselect', item);
        this.selectedItems
          = this.selectedItems.filter(el => el !== item);
      } else {
        this.$emit('select', item);
        this.selectedItems = [...this.selectedItems, item];
      }
    },

    unselectAll() {
      this.selectedItems.forEach(item => {
        this.$emit('unselect', item);
      });
      this.selectedItems = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.header-item-list {
  display: flex;
  flex-direction: column;
  width: 160px;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  &.colors {
    flex-direction: row;
    flex-wrap: wrap;
    width: 162px;
    padding: 12px 4px 4px 12px;
  }

  &__item {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 36px;
    padding: 0 0 0 32px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }

    &.color {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin: 0 8px 8px 0;
      padding: 0;
      border-radius: 50%;

    .header-item-list__check-mark {
        position: static;

        path {
          stroke: #fff;
        }
      }
    }

    &.selected {
      background-color: #f2f2f2;

      .header-item-list__check-mark {
        display: block;
      }
    }
  }

  &__check-mark {
    position: absolute;
    display: none;
    left: 13px;
    top: 12px;

    path {
      stroke: #333;
    }
  }
}
</style>
