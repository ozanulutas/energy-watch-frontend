import Vue from 'vue'
import Vuex from 'vuex'

import user from "@/store/modules/user"
import facility from "@/store/modules/facility"
import consumption from "@/store/modules/consumption"
import userRole from "@/store/modules/user-role"
import customCol from "@/store/modules/custom-col"


Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    user,
    facility,
    consumption,
    userRole,
    customCol
  }
})
