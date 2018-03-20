import Vue from 'vue'
import Vuex from 'vuex'
import * as action from './action'
import * as getter from './getter'
import state from './state'
import mutation from './mutation'
import createLogger from 'vuex/dist/logger'
 Vue.use(Vuex)

 const debug = process.env.NODE_ENV !== 'production'
 export default new Vuex.Store({
     action,
     getter,
     state,
     mutation,
     strict:debug,
     plugins:debug ? [createLogger()] : []
 })