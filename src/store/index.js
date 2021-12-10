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
      return axios.post("/user/login", payload)
        .then(resp => {
          commit("SET_USER", resp.data)
          console.log(this.$app);
          this.$app.$bvToast.toast('Toast body content', {
            title: `Welcome ${resp.data.user.name}`,
            // variant: variant,
            solid: true
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    fetchFacilities({ commit }) {
      return axios.get("/facilities", {
        params: {
          // symbol: payload.symbol,
        }
      })
        .then(resp => {
          console.log(resp)
          commit("SET_FACILITIES", resp.data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
  },

})
