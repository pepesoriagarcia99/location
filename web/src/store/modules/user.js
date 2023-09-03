export default {
  namespaced : true,
  state      : {
    /** user id */
    id   : '',
    /** user name */
    name : ''
  },
  getters : {
    user : state => state
  },
  mutations : {
    trackUser : (state, userData) => {
      state.id = userData.id;
      state.name = userData.name;
    }
  }
};
