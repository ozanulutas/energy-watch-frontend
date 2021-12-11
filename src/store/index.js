import Vue from 'vue'
import Vuex from 'vuex'

import user from "@/store/modules/user"
import facility from "@/store/modules/facility"
import userRole from "@/store/modules/user-role"

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    user,
    facility,
    userRole
  }
})
