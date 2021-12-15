import axios from "@/plugins/axios"
import { prepareDate } from "@/helpers/date-helpers"
import { authorizeOrDie } from "@/middleware/store-authorization"

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
    deleteFacility({ dispatch, rootGetters }, payload) {
      // Get user role
      const { role: userRole } = rootGetters["user/getUser"]
      // Checks if user authorized by given params,
      // die if fails
      authorizeOrDie({ 
        userRole, 
        contidions: ["admin"], 
        message: "You need to be ADMIN for delete operations" 
      })

      return axios.delete(`/facilities/${payload}`)
        .then(resp => {
          dispatch("fetchFacilities")
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
    // Create a facility record
    createFacility({ dispatch, rootGetters }, payload) {
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
      payload.membership_start_date = prepareDate(payload.membership_start_date)
      payload.membership_end_date = prepareDate(payload.membership_end_date)

      return axios.post(`/facilities`, {
        ...payload
      })
        .then(resp => {
          dispatch("fetchFacilities")
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
    // Update a facility record
    updateFacility({ dispatch, rootGetters }, payload) {
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
      payload.membership_start_date = prepareDate(payload.membership_start_date)
      payload.membership_end_date = prepareDate(payload.membership_end_date)

      return axios.put(`/facilities/${payload.id}`, {
        ...payload
      })
        .then(resp => {
          dispatch("fetchFacilities")
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
    // Fetches user specificied custom facility columns
    fetchCustomCols({ commit }) {
      return axios.get("/custom-cols/table/1")
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

      return axios.delete(`/custom-cols/${payload}/table/1`)
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
    // Prepares facility records to use in b-select
    getFacilities: state => {
      return state.facilities.map((facility) => ({
        value: facility.id,
        text: facility.name
      }))
    },
  }
}