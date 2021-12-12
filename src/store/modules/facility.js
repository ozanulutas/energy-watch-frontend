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
    // Delete a facility record
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
    // Create a facility record
    createFacility({ dispatch/*, rootGetters*/ }, payload) {
      // // Get user id and attach it to the payload
      // const { id: userId } = rootGetters['user/getUser']
      // payload.user_id = userId
      
      return axios.post(`/facilities`, {
        ...payload
      })
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
    // Update a facility record
    updateFacility({ dispatch }, payload) {
      return axios.put(`/facilities/${payload.id}`, {
        ...payload
      })
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
    // Removes user specificied facility column
    deleteCustomCol({ commit }, payload) {
      return axios.delete(`/custom-cols/${payload}/1`)
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
        key: col.name,
        label: col.alias,  
        sortable: true 
      }))
    },
  }
}