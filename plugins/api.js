import Vue from 'vue';

const RESPONSE_CODES = {
  SUCCESS: 0,
  TOKEN_EXPIRED_ERROR: 1,
  WRONG_TOKEN_ERROR: 2,
  INCORRECT_DATA_ERROR: 3,
};

export default ({
  store,
  app: { $cookies, $axios, router },
  redirect,
}, inject) => {
  $axios.onRequest((config) => {
    const token = $cookies.get('token')
      || store.state.user.token
      || '';

    config.headers.Authorization = token;
    return config;
  });

  $axios.onResponse((response) => {
    const code = response.data.error;

    switch(code) {
      case RESPONSE_CODES.TOKEN_EXPIRED_ERROR:
      case RESPONSE_CODES.WRONG_TOKEN_ERROR:
        return redirect('/login');
      default:
        return;
    }
  });

  inject('api', Vue.observable({
    login: '',
    password: '',
    token: {
      expiredAt: '',
      value: '',
    },

    async getToken({ login, password }) {
      const url = process.env.baseUrl + '/login';
      const response = await $axios.$post(url, {
        login, password
      });

      if (response.success) {
        this.login = login;
        this.password = password;
        this.token = {
          expiredAt: new Date(response.expiredAt),
          value: response.token,
        };
        $cookies.set('token', response.token, {
          expires: new Date(response.expiredAt),
        });
        store.dispatch('user/setToken', response.token);

        return response;
      }

      return false;
    },

    async getProjects () {
      const url = process.env.baseUrl + '/projects';
      const response = await $axios.$get(url);
      
      if (response.success) {
        return response.data;
      }

      return false;
    },

    async getProjectCategories () {
      const url = process.env.baseUrl + '/categories';
      const response = await $axios.$get(url);
      
      if (response.success) {
        return response.data;
      }

      return false;
    },

    async getProjectTypes () {
      const url = process.env.baseUrl + '/types';
      const response = await $axios.$get(url);
      
      if (response.success) {
        return response.data;
      }

      return false;
    },

    async getProjectColors () {
      const url = process.env.baseUrl + '/colors';
      const response = await $axios.$get(url);
      
      if (response.success) {
        return response.data;
      }

      return false;
    },

    async isAdmin() {
      return await $axios.$post(process.env.baseUrl + '/is_authed');
    },

    async editProject(project) {
      const url = process.env.baseUrl + '/projects';
      const token = $cookies.get('token')
      || store.state.user.token;
      const response = await (await fetch(url, {
        method: 'PUT',
        body: project,
        headers: {
          Authorization: token
        },
      })).json();

      if (response.success) {
        return true;
      } else {
        this.checkTokenExpiredError(response.code);
      }

      return false;
    },

    async createProject(project) {
      const url = process.env.baseUrl + '/projects';
      const token = $cookies.get('token')
      || store.state.user.token;
      const response = await (await fetch(url, {
        method: 'POST',
        body: project,
        headers: {
          Authorization: token
        },
      })).json();

      if (response.success) {
        return true;
      } else {
        this.checkTokenExpiredError(response.code);
      }

      return false;
    },

    async deleteProject(id) {
      const url = process.env.baseUrl + '/projects';
      const token = $cookies.get('token')
      || store.state.user.token;
      const response = await (await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
      })).json();

      if (response.success) {
        return true;
      } else {
        this.checkTokenExpiredError(response.code);
      }

      return false;

    },

    checkTokenExpiredError(code) {
      switch(code) {
        case RESPONSE_CODES.WRONG_TOKEN_ERROR:
        case RESPONSE_CODES.TOKEN_EXPIRED_ERROR:
          return redirect('/login') 
      }
    },
  }));
};

