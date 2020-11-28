import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
import VuexPersistence from 'vuex-persist'
import getters from './getters'

Vue.use(Vuex);

//使用vuex-persist插件解决页面刷新后store为空的问题
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})


export default new Vuex.Store({
    modules,
    getters,
    plugins: [
        vuexLocal.plugin,
        createPersistedState(),
        // createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production'
})
