<template>
  <textarea
    v-model="model"
    class="che-textarea"
    @click="(e) => $emit('clk', e)"
  />
</template>

<script>
export default {
  emits: ['change'],

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit('change', value);
      },
    }
  },
};
</script>

<style lang="scss" scoped>
.che-textarea {
  width: 262px;
  height: 100px;
  margin: 0 0 15px 0;
  padding: 5px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;

  &:focus {
    border-color:#218bff;
    box-shadow: 0 0 0 3px rgba(#54aeff, .3);
    outline: none;
  }
}
</style>
