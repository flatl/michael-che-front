<template>
  <section class="admin-section">
    <h2 class="admin-section__subtitle">
      Описание
    </h2>
    <che-textarea
      id="title"
      type=""
      :value="value"
      @change="handleChange"
    />
  </section>
</template>

<script>
import CheTextarea from '@/components/share/CheTextarea.vue';

export default {
  components: {
    CheTextarea
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-section {
  width: 262px;
  margin: 0 0 30px 0;

  &__subtitle {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 12px 0;
  }
}
</style>
