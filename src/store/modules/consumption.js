import axios from "@/plugins/axios"
import { prepareDate } from "@/helpers/date-helpers"
import { authorizeOrDie } from "@/middleware/store-authorization"

export default {
  namespaced: true,

  state: () => ({
    // Facility records
    consumptions: [],
    // User specificied custom columns
    customCols: []
  }),
  mutations: {
    SET_CONSUMPTIONS(state, payload) {
      state.consumptions = payload
    },
    SET_CUSTOM_COLS(state, payload) {
      state.customCols = payload
    },
  },
  actions: {
    // Fetches consumptions records
    fetchConsumptions({ commit }) {
      return axios.get("/consumptions")
        .then(resp => {
          commit("SET_CONSUMPTIONS", resp.data.results)
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })
        })
    },
    // Fetches consumptions records
    fetchFacilityConsumptions({ commit }, payload) {
      return axios.get(`/consumptions/facilities/${payload}`)
        .then(resp => {
          commit("SET_CONSUMPTIONS", resp.data.results)
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Error",
            toaster: "b-toaster-bottom-center",
          })
        })
    },
    // Creates a consumption record
    createConsumption({ dispatch, rootGetters }, payload) {
      // Get user role
      const { role: userRole } = rootGetters["user/getUser"]
      // Checks if user authorized by given params,
      // die if fails
      authorizeOrDie({ 
        userRole, 
        contidions: ["admin", "editor"], 
        message: "You need to be EDITOR for create operations" 
      })

      // Parses date
      payload.start_date = prepareDate(payload.start_date)
      payload.end_date = prepareDate(payload.end_date)

      return axios.post("/consumptions", {
        ...payload
      })
        .then(resp => {
          dispatch("fetchConsumptions")
          // Show success toast
          this.$app.$bvToast.toast(resp.data.message, {
            title: "Success",
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
    // Updates a consumption record
    updateConsumption({ dispatch, rootGetters }, payload) {
      // Get user role
      const { role: userRole } = rootGetters["user/getUser"]
      // Checks if user authorized by given params,
      // die if fails
      authorizeOrDie({ 
        userRole, 
        contidions: ["admin", "editor"], 
        message: "You need to be EDITOR for update operations" 
      })

      // Parses date
      payload.start_date = prepareDate(payload.start_date)
      payload.end_date = prepareDate(payload.end_date)
      delete payload.facility_name
      
      return axios.put(`/consumptions/${payload.id}`, {
        ...payload
      })
        .then(resp => {
          dispatch("fetchConsumptions")
          // Show success toast
          this.$app.$bvToast.toast(resp.data.message, {
            title: "Success",
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
    // Delete a consumption record
    deleteConsumption({ dispatch, rootGetters }, payload) {
      // Get user role
      const { role: userRole } = rootGetters["user/getUser"]
      // Checks if user authorized by given params,
      // die if fails
      authorizeOrDie({ 
        userRole, 
        contidions: ["admin"], 
        message: "You need to be ADMIN for delete operations" 
      })

      return axios.delete(`/consumptions/${payload}`)
        .then(resp => {
          dispatch("fetchConsumptions")
          // Show success toast
          this.$app.$bvToast.toast(resp.data.message, {
            title: "Success",
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
    // Fetches user specificied custom consumption columns
    fetchCustomCols({ commit }) {
      return axios.get("/custom-cols/2")
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
    // Removes user specificied consumption column
    deleteCustomCol({ dispatch, rootGetters }, payload) {
      // Get user role
      const { role: userRole } = rootGetters["user/getUser"]
      // Checks if user authorized by given params,
      // die if fails
      authorizeOrDie({ 
        userRole, 
        contidions: ["admin"], 
        message: "You need to be ADMIN for delete operations" 
      })
      
      return axios.delete(`/custom-cols/${payload}/table/2`)
        .then(resp => {
          dispatch("fetchCustomCols")
          // Show success toast
          this.$app.$bvToast.toast(resp.data.message, {
            title: "Success",
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
  },
  getters: {
    // Prepares custom cols for using in b-table
    getCustomCols: state => {
      return state.customCols.map((col) => ({
        key: col.name,
        label: col.alias,
        sortable: true
      }))
    },
  }
}