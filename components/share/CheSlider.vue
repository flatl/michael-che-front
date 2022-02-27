<template>
  <div ref="slider" class="che-slider">
    <div
      class="che-slider__wrapper"
      :style="{
        transform: `translate(${translateValue}px, 0)`,
      }"
    >
      <div
        class="che-slider__slide-wrapper"
        v-for="(slide, index) in items"
        :key="index"
      >
        <div
          v-if="index === activeSlide"
          :style="{
            'background-image': `url(${getImageUrl(slide)})`,
          }"
          class="che-slider__slide active"
          @mousemove="handleMouseOver"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          @mouseleave="(e) => isMouseDowned && handleMouseUp(e)"
          @touchstart="handleMouseDown"
          @touchmove="handleMouseOver"
          @touchend="handleMouseUp"
          @click="handleClickActiveSlide(index)"
        >
          <nav v-if="items.length > 1" class="che-slider__nav">
            <span
              v-for="(_, index) in items"
              :key="index"
              :class="[
                'che-slider__nav__item',
                { active: index === activeSlide }
              ]"
              @click.stop="handleClickNavItem(index)"
            />
          </nav>
        </div>
        <div
          v-else
          class="che-slider__slide"
          :style="{
            'background-image': `url(${getImageUrl(slide)})`,
          }"
          @click.stop="handleClickSlide(index)"
        />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    activeElement: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      activeSlide: this.activeElement,
      isMouseDowned: false,
      startDragOverX: 0,
      sliderOffsetX: 0,
      counter: 0,
    }
  },

  computed: {
    translateValue() {
      const slideWidth = 264 + 20;
      return -(this.sliderOffsetX + (slideWidth * this.activeSlide));
    },
  },

  mounted() {
    if (this.$refs.slider.scrollIntoViewIfNeeded) {
      this.$refs.slider.scrollIntoViewIfNeeded();
    } else {
      this.$refs.slider.scrollIntoView();
    }
  },

  watch: {
    activeElement(val) {
      this.activeSlide = val;
    },
  },

  methods: {
    handleMouseDown(event) {
      this.isMouseDowned = true;
      const clientX = event.clientX || event.changedTouches.item(0).clientX;
      this.startDragOverX = clientX;
    },

    handleMouseOver(event) {
      if (!this.isMouseDowned) return;
      this.counter++
      const clientX = event.clientX || event.changedTouches.item(0).clientX
      this.sliderOffsetX = this.startDragOverX - clientX;
    },

    handleMouseUp(event) {
      const clientX = event.clientX || event.changedTouches.item(0).clientX;
      const differenceX = this.startDragOverX - clientX;

      if (Math.abs(differenceX) > 100) {
        event.stopImmediatePropagation();
        this.changeSlide(differenceX);
      }
      this.sliderOffsetX = 0;
      this.isMouseDowned = false;
    },

    handleClickSlide(slideIndex) {
      if (slideIndex !== this.activeSlide) {
        this.activeSlide = slideIndex;
      }
    },

    handleClickActiveSlide(index) {
      if (index === this.activeSlide) {
        this.$emit('close');
      }
    },

    handleClickNavItem(index) {
      this.activeSlide = index;
    },

    changeSlide(sign) {
      if (sign > 0) {
        const isLastSlide = this.activeSlide === this.items.length - 1;
        if (isLastSlide) return;
        this.activeSlide++;
      } else {
        const isFirstSlide = this.activeSlide === 0;
        if (isFirstSlide) return;
        this.activeSlide--;
      }
    },

    getImageUrl(imageName) {
      return process.env.baseImageUrl + imageName;
    },
  }
};
</script>

<style lang="scss" scoped>
.che-slider {
  position: relative;
  overflow-x: visible;
  width: 100%;
  height: 600px;
  padding: 0 0 0 calc(50% - 300px);

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: transform .3s ease-out;
  }

  &__slide {
    min-width: 264px;
    min-height: 264px;
    margin: 0 20px 0 0;
    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: cover;
    transition:
      width .5s ease-out,
      height .5s ease-out;
    animation-name: shrink;
    animation-duration: .4s;
    animation-iteration-count: 1;

    &.active {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 12px;
      animation-name: grow;
      animation-duration: .4s;
      animation-iteration-count: 1;
      min-width: 600px;
      min-height: 600px;
    }
  }

  &__nav {
    display: flex;
    flex-direction: row;

    &__item {
      width: 8px;
      height: 8px;
      margin: 0 4px 0 0;
      border-radius: 50%;
      background-color: rgba(#fff, .3);
      cursor: pointer;

      &.active {
        background-color: #fff;
      }
    }
  }
}

@media (max-width: 600px) {
  .che-slider {
    height: auto;

    &__slide {
      &.active {
        min-width: calc(100vw - 12px);
        min-height: calc(100vw - 12px);
      }
    }
  }
}

@keyframes grow {
  0% {
    min-width: 264px;
    min-height: 264px;
  }

  50% {
    min-width: 264px;
    min-height: 264px;
  }
}

@keyframes shrink {
  0% {
    min-width: 600px;
    min-height: 600px;
  }

  50% {
    min-width: 600px;
    min-height: 600px;
  }
}
</style>
