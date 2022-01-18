<template>
  <header class="header">
    <div class="header__left">
      <MenuIconOpen
        v-if="!isMenuOpen"
        class="header__menu-btn open"
        @click="toggleMenuOpen"
      />
      <MenuIconClose
        v-else
        class="header__menu-btn close"
        @click="toggleMenuOpen"
      />
      <h1 class="header__logo">
        Chernykh.
      </h1>
    </div>

    <div class="header__center">
      <h2 class="header__title">
        Brand и digital решения для лидеров и стартапов
      </h2>
    </div>

    <div
      class="header__right"
      :style="{
        visibility: isMenuOpen ? 'hidden' : ''
      }"
    >
      <header-categories
        :items="categories"
        class="header__categories"
        @select="(i) => handleSelect('category', i)"
        @unselect="(i) => handleUnselect('category', i)"
      />
      <header-types
        :items="types"
        class="header__types"
        @select="(i) => handleSelect('type', i)"
        @unselect="(i) => handleUnselect('type', i)"
      />
      <header-colors
        :items="colors"
        class="header__colors"
        @select="(i) => handleSelect('color', i)"
        @unselect="(i) => handleUnselect('color', i)"
      />
    </div>
  </header>
</template>

<script>
import MenuIconOpen from '@/assets/icons/burger.svg?inline';
import MenuIconClose from '@/assets/icons/closeCross.svg?inline';
import HeaderCategories from './HeaderCategories.vue';
import HeaderTypes from './HeaderTypes.vue';
import HeaderColors from './HeaderColors.vue';

export default {
  components: {
    MenuIconOpen,
    MenuIconClose,
    HeaderCategories,
    HeaderTypes,
    HeaderColors,
  },

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    types: {
      type: Array,
      default: () => [],
    },
    colors: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      isMenuOpen: false,
    };
  },

  methods: {
    toggleMenuOpen() {
      if (this.isMenuOpen) {
        this.$emit('closeMenu');
      } else {
        this.$emit('openMenu');
      }

      this.isMenuOpen = !this.isMenuOpen;
    },

    handleSelect(propName, item) {
      const capitalizedPropName = propName.charAt(0).toUpperCase() + propName.slice(1);
      this.$emit('select' + capitalizedPropName, item);
    },

    handleUnselect(propName, item) {
      const capitalizedPropName = propName.charAt(0).toUpperCase() + propName.slice(1);
      this.$emit('unselect' + capitalizedPropName, item);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 12px 0 24px;

  &__left,
  &__center,
  &__right {
    display: flex;
    align-items: center;
  }

  &__menu-btn {
    margin: 0 20px 0 0;
    cursor: pointer;
  }

  &__logo {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: #FF0000;
    margin: 0;
    user-select: none;
  }

  &__title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    margin: 0;
    user-select: none;
  }

  &__categories,
  &__types {
    margin: 0 8px 0 0;
    user-select: none;
  }

  &__colors {
    user-select: none;
  }
}

@media (max-width: 767px) {
  .header {
    &__center {
      display: none;
    }
  }
}

@media (max-width: 340px) {
  .header {
    &__categories,
    &__types {
      margin: 0 6px 0 0;
    }
  }
}
</style>
