<template>
  <aside class="che-about">
    <div class="che-about__content">
      <div class="che-about__content__top">
        <g3 class="che-about__subtitle">Привет!</g3>
        <p class="che-about__text">
          Меня зовут Михаил, я ведущий дизайнер, который имеет за
          своими плечами более 10 лет опыта работы с лидерами рынка.
          Специализируюсь на создании брендов, иллюстраций и проектировании
          интерфейсов.
        </p>
      </div>
      <div class="che-about__content__middle">
        <h3 class="che-about__subtitle">Клиенты:</h3>
        <p class="che-about__text">
          Mars, Reebok, Сбербанк, AnchorFree, Durex, Yellow Images,
          Federal Finance, Get-Net, The Kilo, Praxis Group, Alternativa Games,
          Mosaic
        </p>
      </div>
      <div class="che-about__contacts">
        <a href="/" class="che-about__contact">
          mamozinger@gmail.com
        </a>
        <a href="/" class="che-about__contact">
          Behance
        </a>
        <a href="/" class="che-about__contact">
          Dribbble
        </a>
        <a href="/" class="che-about__contact">
          Instagram
        </a>
        <a href="/" class="che-about__contact">
          Facebook
        </a>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.che-about {
  position: fixed;
  top: 64px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: calc(100% - 64px);
  padding: 40px;
  background-color: #fff;

  &__content {
    display: flex;
    flex-direction: column;

    &__top,
    &__middle {
      display: flex;
      flex-direction: column;
      margin: 0 0 40px 0;
    }
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #333;
    margin: 0 0 4px 0;
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    max-width: 680px;
    margin: 0;
  }

  &__contacts {
    display: flex;
    flex-direction: row;
  }

  &__contact {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #333;
    text-decoration: none;
    margin: 0 20px 0 0;
    cursor: pointer;

    &:last-child {
      margin: 0;
    }
  }
}
</style>
