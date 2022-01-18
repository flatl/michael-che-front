<template>
  <section class="admin-section">
    <div class="admin-section__head">
      <h2 class="admin-section__subtitle">
        Цвета
      </h2>
      <div
        class="admin-section__add-btn"
        @click="toggleShowSelect"
      >
        <PlusIcon />
      </div>
    </div>
    <che-select
      v-if="showSelect"
      :items="items"
      colors
      @select="handleSelect"
      @unselect="handleUnselect"
    />
    <div v-else class="admin-section__add-section">
      <input ref="colorInput" type="color" />
      <input
        type="submit"
        value="Добавить"
        class="admin-section__submit"
        placeholder="Введите название"
        @click="handleAddColor"
      />
    </div>
  </section>
</template>

<script>
import CheSelect from '@/components/share/CheSelect.vue';
import CheInput from '@/components/share/CheInput.vue';
import PlusIcon from '@/assets/icons/plus.svg?inline';

export default {
  components: {
    CheSelect,
    CheInput,
    PlusIcon,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      showSelect: true,
      newColorValue: '',
    };
  },

  methods: {
    handleSelect(item) {
      this.$emit('select', item);
    },

    handleUnselect(item) {
      this.$emit('unselect', item);
    },

    toggleShowSelect() {
      this.showSelect = !this.showSelect;
    },

    handleChangeNewColor(value)  {
      this.newColorValue = value;
    },

    handleAddColor() {
      const color = this.$refs.colorInput.value;
      this.$emit('add', color);
      this.toggleShowSelect();
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-section {
  width: 262px;
  margin: 0 0 30px 0;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 12px 0;
  }

  &__subtitle {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }

  &__add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0px 2px 6px rgba(222, 222, 222, 0.6);
    cursor: pointer;
  }

  &__add-section {
    display: flex;
    flex-direction: column;
  }

  &__submit {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #fff;
    margin: 12px 0 0 0;
    padding: 5px 16px;
    outline: none;
    border: 1px solid rgba(27, 31, 36, 0.15);
    border-radius: 6px;
    background-color: #2d924e;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    cursor: pointer;
  }
}
</style>
