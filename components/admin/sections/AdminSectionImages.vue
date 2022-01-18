<template>
  <section class="admin-section">
    <h2 class="admin-section__subtitle">
      Изображения
    </h2>
    <che-drag-and-drop @loadFiles="handleLoadFiles" />

    <div class="admin-section__images">
      <div v-for="(image, index) in loadedImages"
        :key="index"
        class="admin-section__image-container"
      >
        <CloseIcon class="admin-section__image-remove" @click="handleRemove(image, true)" />
        <img :src="getLoadedImageSrc(image)" class="admin-section__image" />
      </div>

      <div v-for="(image, index) in newImages"
        :key="100 + index"
        class="admin-section__image-container"
      >
        <CloseIcon class="admin-section__image-remove" @click="handleRemove(image, false)" />
        <img :src="getNewImageSrc(image)" class="admin-section__image" />
      </div>
    </div>
  </section>
</template>

<script>
import CheDragAndDrop from '@/components/share/CheDragAndDrop.vue';
import CloseIcon from '@/assets/icons/closeCross.svg?inline';

export default {
  components: {
    CheDragAndDrop,
    CloseIcon,
  },

  props: {
    // изображения, загруженный на сервер
    loadedImages: {
      type: Array,
      default: () => [],
    },
    // новые изображения
    newImages: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleLoadFiles(files) {
      this.$emit('loadImages', files);
    },

    getLoadedImageSrc(name) {
      return process.env.baseImageUrl + name;
    },

    getNewImageSrc(image) {
      return URL.createObjectURL(image);
    },

    handleRemove(image, isLoadedImage) {
      if (isLoadedImage) {
        this.$emit('removeLoaded', image);
      } else {
        this.$emit('removeNew', image);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-section {
  margin: 0 0 30px 0;

  &__subtitle {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 12px 0;
  }

  &__images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 24px 0 0 0;
  }

  &__image-container {
    position: relative;
    width: 128px;
    height: 128px;
    margin: 0 12px 12px 0;
  }

  &__image {
    width: 128px;
    height: 128px;
    object-fit: cover;
    border-radius: 12px;
  }

  &__image-remove {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
}
</style>
