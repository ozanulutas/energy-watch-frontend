import axios from "@/plugins/axios"

export default {
  namespaced: true,

  state: () => ({
    // Facility records
    facilities: [],
    // User specificied custom columns
    customCols: []
  }),
  mutations: {
    SET_FACILITIES(state, payload) {
      state.facilities = payload
    },
    SET_CUSTOM_COLS(state, payload) {
      state.customCols = payload
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
    // Fetches facility records
    deleteFacility({ dispatch }, payload) {
      return axios.delete(`/facilities/${payload}`)
        .then(resp => {
          dispatch("fetchFacilities")
          // Show success toast
          this.$app.$bvToast.toast(resp.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })
        })
    },
    // Fetches user specificied custom facility columns
    fetchCustomCols({ commit }) {
      return axios.get("/custom-cols/1")
        .then(resp => {
          commit("SET_CUSTOM_COLS", resp.data.results)
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
    getCustomCols: state => {
      return state.customCols.map((col) => ({
        key: col.name.slice(1),
        label: col.alias,  
        sortable: true 
      }))
    }
  }
}