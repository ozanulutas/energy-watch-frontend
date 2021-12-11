import axios from "@/plugins/axios"

export default {
  namespaced: true,
  
  state: () => ({
    // User info
    user: {},
  }),
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
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
          if (payload.rememberUser) {
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
    register(_, payload) {
      return axios.post("/user/register", payload)
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
    // Logs user out
    logout({ commit }) {
      localStorage.removeItem("user")
      localStorage.removeItem("rememberUser")
      commit("SET_USER", {})

      this.$app.$bvToast.toast("See you soon", {
        title: "Successfully Logged Out",
        toaster: "b-toaster-bottom-center",
      })
    },
  },
  getters: {
    getUser: state => {
      return JSON.parse(localStorage.getItem("user")) || state.user;
    }
  }
}