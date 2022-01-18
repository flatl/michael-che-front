<template>
  <main class="login">
    <h1 class="login__title">Войдите</h1>
    <div class="login__box">
      <label for="username" class="login__label">
        Имя пользователя или email-адрес
      </label>
      <che-input
        ref="username"
        :value="username"
        type="text"
        class="login__username"
        id="username"
        @change="setUsername"
      />
      <label for="password" class="login__label">
        Пароль
      </label>
      <che-input
        ref="password"
        :value="password"
        type="password"
        class="login__password"
        id="password"
        @change="setPassword"
      />
      <input
        type="submit"
        value="Войти"
        :class="[
            'login__submit',
            { 'active': isUserDataFilled },
        ]"
        @click="handleSubmit"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import CheInput from '@/components/share/CheInput.vue';

export default {
  components: {
    CheInput,
  },

  data() {
    return {
      iShowIncorrectBanner: false,
    };
  },

  computed: {
    ...mapState({
      username: (state) => state.user.name,
      password: (state) => state.user.password,
    }),

    isUserDataFilled() {
      return this.username.length && this.password.length;
    },
  },

  methods: {
    setUsername(value) {
      this.$store.dispatch('user/setName', value);
    },

    setPassword(value) {
      this.$store.dispatch('user/setPassword', value);
    },

    async handleSubmit() {
      if (!this.isUserDataFilled) return;

      const resp = await this.$api.getToken({
        password: this.password,
        login: this.username,
      });

      if (resp) {
        this.$store.dispatch('user/setIsAuthorized', true);
        this.$store.dispatch('user/setToken', resp.token);
        this.$router.push('/admin');
      } else {
        this.isShowIncorrectBanner = true;
        // this.$refs.username.focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 0 0;

  &__title {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: #111;
  }

  &__box {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: rgb(246, 248, 250);
    border: 1px solid rgb(216, 222, 228);
    border-radius: 6px;
  }

  &__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin: 0 0 7px 0;
  }

  &__submit {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #fff;
    margin: 17px 0 0 0;
    padding: 5px 16px;
    outline: none;
    border: 1px solid rgba(27, 31, 36, 0.15);
    border-radius: 6px;
    background-color: #2da24e;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    cursor: default;
    opacity: 0.7;

    &.active {
      opacity: 1;
      cursor: pointer;

      &:hover {
        background-color: #2d924e;
      }
    }
  }
}
</style>