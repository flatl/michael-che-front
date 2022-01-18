<template>
  <div :class="[
      'che-select',
      { colors: colors },
      { open: isOpen },
    ]"
    @click="toggleOpen"
  >
    <che-input
      :value="inputValue"
      class="che-select__input"
      disabled
    />
    <ul v-if="isOpen" class="che-select__list">
      <li v-for="(item, index) in items"
        :key="index"
        :class="[
          'che-select__list__item',
          { selected: item.isSelected && !colors },
        ]"
        :style="{
          [colors ? 'background-color' : '']: '#' + item.value,
        }"
        @click.stop="handleClick(item)"
      >
        <template v-if="!colors">
          {{ item.value }}
        </template>
        <CheckMark
          v-if="item.isSelected"
          class="che-select__list__item__check-mark"  
        />
      </li>
    </ul>

    <ArrowUp v-if="isOpen" class="che-select__icon" />
    <ArrowDown v-else class="che-select__icon" />
  </div>
</template>

<script>
import CheInput from './CheInput.vue';
import ArrowDown from '@/assets/icons/arrowDown.svg?inline';
import ArrowUp from '@/assets/icons/arrowUp.svg?inline';
import CheckMark from '@/assets/icons/checkMark.svg?inline';

export default {
  components: {
    CheInput,
    ArrowDown,
    ArrowUp,
    CheckMark,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    colors: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    inputValue() {
      return this.items
        .filter(item => item.isSelected)
        .map(item => item.value)
        .join(', ')
        || 'Не выбрано';
    },
  },

  methods: {
    handleClick(item) {
      if (item.isSelected) {
        this.$emit('unselect', item);
      } else {
        this.$emit('select', item);
      }
    },

    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.che-select {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 262px;

  &.open {
    .che-select__input {
      margin-bottom: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom: none;
    }
  }

  &.colors {
    .che-select__list {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 12px;
      
      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        margin: 0 8px 8px 0;
        border-radius: 50%;

        &__check-mark {
          path {
            fill: #fff;
          }
        }
      }
    }
  }

  &__input {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    padding: 8px 15px;
    background-color: #fff;
    cursor: pointer;
  }


  &__list {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 250px;
    margin: 0;
    padding: 0;
    border: 1px solid #d0d7de;
    border-top: none;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    background-color: #fff;

    &__item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      color: #111;
      padding: 8px 15px;
      list-style: none;
      border-bottom: 1px solid #d0d7de;
      cursor: pointer;
      user-select: none;

      &.selected {
        background-color: #F5F7FE;
      }

      &:hover {
        background-color: #F5F7FE;
      }

      &:last-child {
        border: none;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 13px;
    right: 16px;
  }
}
</style>
