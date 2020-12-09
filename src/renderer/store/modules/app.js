import { loginPhone, CODE, logout} from "@/server"
import {setStorage, removeStorage, setCookie, getCookie, removeCookie} from "@/utils"
const state = {
    user: {
        isLogin: false
    },
    phone: '18144065880',
    password: '123456'
}

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    }
}
const actions = {
    login({ state, commit }, bool) {
        return new Promise((resolve, reject) => {
            if(!getCookie() || bool){
                const {phone, password} = state;
                loginPhone({phone, password}).then(res => {
                    if (res.code === CODE) {
                        res['isLogin'] = true;
                        commit('SET_USER', res || {isLogin: false});
                        setStorage('token', res.token);
                        setCookie(res.cookie);
                        resolve()
                    }
                }).catch(reject)
            }else{
                resolve()
            }
        })
    },
    onLogout({commit}) {
        logout().then(() => {
            commit('SET_USER',{isLogin: false});
            removeCookie();
            removeStorage('token')
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
