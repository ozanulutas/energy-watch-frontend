import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/plugins/axios"

Vue.use(Vuex)
console.log();

export default new Vuex.Store({
  state: {
    // Authentication state
    isLoggedIn: true,
    // User info
    user: {},
    // Facility records
    facilities: []
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_FACILITIES(state, payload) {
      state.facilities = payload
    },
  },
  actions: {
    // Logs user in and saves jwt to localstorage
    login({ commit }, payload) {
      return axios.post("/user/login", payload.user)
        .then(resp => {
          commit("SET_USER", resp.data.user)

          // Set default token header for axios
          axios.defaults.headers.common['x-access-token'] = resp.data.user.token

          // Set user info to local storage
          if(payload.rememberUser) {
            localStorage.setItem("user", JSON.stringify(resp.data.user))
            localStorage.setItem("rememberUser", true)
          }

          // Show welcome tast
          this.$app.$bvToast.toast(`You are logged in as ${resp.data.user.name}`, {
            title: `Welcome ${resp.data.user.name}`,
            toaster: "b-toaster-bottom-center",
          })

          return resp
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Unsuccessful Login",
            toaster: "b-toaster-bottom-center",
          })
        })
    },
    // Registers a user
    register(payload) {
      return axios.post("/user/register", payload.user)
        .then(resp => {

          // Show welcome tast
          this.$app.$bvToast.toast("Registeration is successful", {
            title: "You can login now.",
            toaster: "b-toaster-bottom-center",
          })

          return resp
        })
        .catch(err => {
          // Show error toast
          this.$app.$bvToast.toast(err.response.data.message, {
            title: "Unsuccessful registeration",
            toaster: "b-toaster-bottom-center",
          })
        })
    },

    // Fetches facility records
    fetchFacilities({ commit }) {
      return axios.get("/facilities")
        .then(resp => {
          commit("SET_FACILITIES", resp.data)
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

})
