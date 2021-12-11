import axios from "@/plugins/axios"

export default {
  namespaced: true,

  state: () => ({
    // Facility records
    facilities: []
  }),
  mutations: {
    SET_FACILITIES(state, payload) {
      state.facilities = payload
    },
  },
  actions: {
    // Fetches facility records
    fetchFacilities({ commit }) {
      return axios.get("/facilities")
        .then(resp => {
          commit("SET_FACILITIES", resp.data.results)
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