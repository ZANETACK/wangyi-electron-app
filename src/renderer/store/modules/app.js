import { loginPhone, CODE } from "@/server"
import { formatObjToParams, setStorage, getStorage, setCookie } from "@/utils"
const state = {
    user: {}
}

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    }
}
const actions = {
    login({ state, commit }, params) {
        return new Promise((resolve, reject) => {
            if (!getStorage('token')) {
                loginPhone(params).then(res => {
                    if (res.code === CODE) {
                        commit('SET_USER', res || {});
                        setStorage('token', res.token);
                        setCookie(res.cookie)
                        resolve()
                    }
                }).catch(reject)
            } else {
                reject()
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
