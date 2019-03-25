import Vue from 'vue'
import Vuex from 'vuex'

import notes from './notes'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    notes
  },

  strict: process.env.DEV
})

export default Store
