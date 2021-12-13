import axios from "@/plugins/axios"

export default {
  namespaced: true,

  state: () => ({
    colTypes: []
  }),
  mutations: {
    SET_COL_TYPES(state, payload) {
      state.colTypes = payload
    },
  },
  actions: {
    // Fetches column types
    fetchColTypes({ commit }) {
      return axios.get("/custom-cols/types")
        .then(resp => {
          commit("SET_COL_TYPES", resp.data.results)
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })
        })
    },
    // Create a custom column record and fetches the associated table
    createCol({ dispatch }, payload) {

      return axios.post(`/custom-cols`, {
        ...payload
      })
        .then(resp => {
          if(payload.tbl_id == 1) {
            dispatch('facility/fetchCustomCols', null, { root: true })
          } else if(payload.tbl_id == 2) {
            dispatch('consumption/fetchCustomCols', null, { root: true })
          }
          // Show success toast
          this.$app.$bvToast.toast(resp.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })

          return resp
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
    getColTypes: state => {
      return state.colTypes.map(type => ({
        value: type, text: type
      }))
    }
  }
}