<template>
  <div class="che-dnd">
    <div
      :class="['che-dnd__area', { active: isDragOver }]"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
    >
      Перенесите файлы сюда
    </div>
    <input
      type="file"
      value="Выберите файл"
      class="che-dnd__input"
      accept=".png, .jpg, .jpeg, .webp"
      @change="handleChangeInput"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragOver: false,
    };
  },

  methods: {
    handleDragOver(event) {
      event.dataTransfer.dropEffect = 'copy';
      this.isDragOver = true;
    },

    handleDrop(event) {
      const fileList = event.dataTransfer.files;
      this.$emit('loadFiles', fileList);
      this.isDragOver = false;
    },

    handleChangeInput(event) {
      const fileList = event.target.files;
      this.$emit('loadFiles', fileList);
    },
  },
};
</script>

<style lang="scss" scoped>
.che-dnd {
  display: flex;
  flex-direction: column;

  &__area {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #777;
    width: 262px;
    height: 120px;
    margin: 0 0 24px 0;
    border: 1px solid #d0d7de;
    border-radius: 6px;

    &.active {
      border-color:#218bff;
      box-shadow: 0 0 0 3px rgba(#54aeff, .3);
    }
  }
}
</style>
