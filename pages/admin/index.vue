<template>
  <main class="admin-panel" role="main">
    <div class="admin-panel__container">
      <h1 class="admin-panel__title">Панель управления</h1>
      <div
        class="admin-panel__add-btn"
        @click="handleAddProject"
      >
        <PlusIcon class="admin-panel__add-btn__thumb" />
      </div>
      <admin-projects-catalog
        :projects="projects"
        class="admin-panel__catalog"
        @clickItem="handleEditProject"
        @editItem="handleEditProject"
        @deleteItem="handleDeleteProject"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import AdminProjectsCatalog from '../../components/admin/AdminProjectsCatalog.vue';
import PlusIcon from '@/assets/icons/plus.svg?inline';

export default {
  components: {
    AdminProjectsCatalog,
    PlusIcon
  },

  async validate({ redirect, $cookies, $api }) {
    const isAdmin = await $api.isAdmin();
    if (isAdmin) {
      return true;
    }

    redirect('/login');
  },

  async fetch() {
    const projects = await this.$api.getProjects(); 
    this.$store.dispatch('project/setList', projects);
  },

  computed: {
    ...mapState({
      projects: (state) => state.project.list,
    }),
  },

  methods: {
    handleEditProject(id) {
      this.$router.push('/admin/edit/' + id);
    },

    handleAddProject() {
      this.$router.push('/admin/new');
    },

    async handleDeleteProject(id) {
      const isDelete = confirm('Вы уверены что хотите удалить проект?');
      
      if (isDelete) {
        await this.$api.deleteProject(id);
        await this.$fetch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 120px 0 60px 0;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    height: 100%;
  }

  &__title {
    font-weight: 500;
    margin: 0 0 50px 0;
  }

  &__add-btn {
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    margin: 0 0 24px 0;
    border-radius: 50%;
    box-shadow: 0px 2px 6px rgba(222, 222, 222, 0.6);
    cursor: pointer;

    &__thumb {
      width: 48px;
      height: 48px;
    }
  }

  &__catalog {
    max-width: 800px;
  }
}
</style>
