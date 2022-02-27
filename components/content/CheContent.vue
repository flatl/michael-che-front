<template>
  <main class="content" role="main">
    <div
      v-for="(row, index) in rows"
      :key="index"
      :class="['content__row', { slider: row.type === 'slider' }]"
    >
      <content-slider
        v-if="row.type === 'slider'"
        :items="sliderImages"
        :title="list[selectedItemIndex].title"
        :description="list[selectedItemIndex].description"
        :image-index="selectedImageIndex"
        @close="handleClose"
      />
      <content-item
        v-else
        v-for="(item) in row.items"
        :key="item.id"
        :image-url="getImageUrl(item)"
        @click="handleClickItem(item)"
      /> 
    </div>
  </main>
</template>

<script>
import ContentSlider from './ContentSlider.vue';
import ContentItem from './ContentItem.vue';

export default {
  components: {
    ContentSlider,
    ContentItem,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedItemIndex: -1,
      selectedImageIndex: -1,
      windowWidth: 0,
    };
  },

  computed: {
    allImages() {
      return this.list.flatMap((item, itemIndex) => {
        return item.images.map((imageName, imageIndex) => {
          return {
            itemIndex,
            imageIndex,
            name: imageName,
          };
        })
      });
    },
    /* Вычисляем строки контента для рендеринга, в зависимости от разрешения  */
    rows() {
      if (!this.windowWidth) return [[]];
      
      const isMobile = this.windowWidth <= 600;
      let padding, elementWidth, elementMargin;

      if (isMobile) {
        [padding, elementWidth, elementMargin] = [12, 112 + 6, 6];
      } else {
        [padding, elementWidth, elementMargin] = [40, 264 + 20, 20];
      }

      const elementsPerRow = Math.trunc(
        (this.windowWidth - padding + elementMargin) / elementWidth
      );
      const rowsCount = Math.ceil(this.allImages.length / elementsPerRow);
      const rows = Array(rowsCount + 1).fill(null).map(
        _ => ({ items: [], type: 'list' })
      );

      let pointer = 0;
      let isAddSliderNextRow = false;

      /* исключяем из рендерящихся элементов те, которые будут в слайдере */
      this.allImages.forEach((image, index) => {
        const isCurrentImageSelected = image.itemIndex === this.selectedItemIndex
          && image.imageIndex === this.selectedImageIndex 

        if (isCurrentImageSelected) {
          isAddSliderNextRow = true;
        }

        const isRowFilled = rows[pointer].items.length === elementsPerRow;
        const isLastElement = index === this.allImages.length - 1;

        if (isRowFilled) {
          pointer++;
        }

        if (isAddSliderNextRow && isLastElement) {
          rows[pointer].items.push(image);
          pointer++;
          rows[pointer].type = 'slider';
        } else if (isAddSliderNextRow && isRowFilled) {
          rows[pointer].type = 'slider';
          pointer++;
          isAddSliderNextRow = false;
          rows[pointer].items.push(image);
        } else {
          rows[pointer].items.push(image);
        }
      });

      return rows;
    },

    sliderImages() {
      if (this.list[this.selectedItemIndex]) {
        return this.list[this.selectedItemIndex].images;
      }

      return [];
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    getImageUrl(image) {
      return process.env.baseImageUrl + image.name;
    },

    handleClickItem(item) {
      const isCurrentItemSelected = item.itemIndex === this.selectedItemIndex &&
        item.imageIndex === this.selectedImageIndex;
      
      if (isCurrentItemSelected) {
        return this.handleClose();
      }

      this.selectedItemIndex = item.itemIndex;
      this.selectedImageIndex = item.imageIndex;
    },

    handleResize(event) {
      this.windowWidth = event.target.innerWidth;
    },

    handleClose() {
      this.selectedItemIndex = -1;
      this.selectedImageIndex = -1;
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  overflow-x: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-row-gap: 20px;
  align-items: center;
  width: 100%;
  padding: 20px;

  &__row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    grid-column-gap: 20px;
    width: 100%;

    .content__item:last-child {
      margin-right: 0;
    }

    &.slider {
      overflow-x: visible;
    }
  }

  &__item {
    width: 264px;
    height: 264px;
    margin: 0;
    border-radius: 8px;
    user-select: none;

    &.slider {
      width: 100%;
      height: auto;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}

@media (max-width: 600px) {
  .content {
    grid-row-gap: 6px;
    padding: 6px;

    &__row {
      grid-column-gap: 6px;
    }
  }
}
</style>
