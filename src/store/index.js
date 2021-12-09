import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/plugins/axios"

Vue.use(Vuex)

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
    fetchFacilities({ commit }, payload) {
      console.log(payload)
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
    }
  },

})
