<template>
  <div class="content-slider">
    <che-slider :items="items" :active-element="imageIndex" />
    <h3 class="content-slider__title">
      {{ title }}
    </h3>
    <p class="content-slider__description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import CheSlider from '@/components/share/CheSlider.vue';

export default {
  components: { CheSlider },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    imageIndex: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 4,
        pagination: {
          el: '.swiper-pagination'
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
}

.swiper-wrapper {
  display: flex;
  align-items: center;
}

.swiper-slide {
  &.swiper-slide-active {
    width: auto !important;
    margin: 0 20px 20px 0;

    .swiper-slide__image {
      width: 600px;
      height: 600px;
    }
  }
}

.content-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  width: 100%;
  margin: 0 0 60px 0;

  &__title {
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    color: #333;
    margin: 20px 0 4px 0;
  }

  &__description {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #333;
  }

  &__slide {
    width: 264px;
    height: 264px;
    margin: 0 20px 20px 0;
    object-fit: cover;
    border-radius: 8px;
  }
}
</style>
