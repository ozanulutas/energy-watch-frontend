import axios from "@/plugins/axios"

export default {
  namespaced: true,
  
  state: () => ({
    // User roles
    userRoles: [],
  }),
  mutations: {
    SET_USER_ROLES(state, payload) {
      state.userRoles = payload
    },
  },
  actions: {

    // Fetches usser role records
    fetchUserRoles({ commit }) {
      axios.get("/user-roles")
        .then(resp => {
          commit("SET_USER_ROLES", resp.data)
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })
        })
    },
  },
  getters: {

  }
}