const defaultProject = {
  id: -1,
  title: '',
  description: '',
  categories: [],
  types: [],
  colors: [],
  images: [],
};

export const state = () => ({
  list: [],
  categories: [],
  types: [],
  colors: [],
  new: defaultProject,
  newImages: [],
  edited: {},
});

export const actions = {
  setList({ commit }, list) {
    commit('setList', list);
  },

  setTypes({ commit }, types) {
    commit('setTypes', types);
  },

  setCategories({ commit }, categories){
    commit('setCategories', categories);
  },

  setColors({ commit }, colors) {
    commit('setColors', colors);
  },

  setNew({ commit }, project) {
    commit('setNew', project);
  },
  
  clearNew({ commit }) {
    commit('setNew', defaultProject);
  },

  setNewImages({ commit }, images) {
    commit('setNewImages', images);
  },

  setEdited({ commit }, project) {
    commit('setEdited', project);
  },
};

export const mutations = {
  setList(state, list) {
    state.list = list;
  },

  setNew(state, project) {
    state.new = project;
  },

  setEdited(state, project) {
    state.edited = project;
  },

  setNewImages(state, images) {
    state.newImages = images;
  },

  setCategories(state, categories) {
    state.categories = categories;
  },

  setTypes(state, types) {
    state.types = types;
  },

  setColors(state, colors) {
    state.colors = colors;
  },
};

export const getters = {
  editedProjectFormData(state) {
    const fd = new FormData();
    
    fd.set('id', state.edited.id);
    fd.set('title', state.edited.title);
    fd.set('description', state.edited.description);
    fd.set('categories', JSON.stringify(state.edited.categories));
    fd.set('types', JSON.stringify(state.edited.types));
    fd.set('colors', JSON.stringify(state.edited.colors));
    fd.set('images', JSON.stringify(state.edited.images));
    
    state.newImages.forEach((image, index) => {
      fd.set('image' + index, image, image.name);
    });

    return fd;
  },

  newProjectFormData(state) {
    const fd = new FormData();
    
    fd.set('title', state.new.title);
    fd.set('description', state.new.description);
    fd.set('categories', JSON.stringify(state.new.categories));
    fd.set('types', JSON.stringify(state.new.types));
    fd.set('colors', JSON.stringify(state.new.colors));
    
    state.newImages.forEach((image, index) => {
      fd.set('image' + index, image, image.name);
    });

    return fd;
  },
};
