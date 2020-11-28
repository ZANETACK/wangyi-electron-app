import {queryBanner, queryHotSongSheet} from "@/server"

const state = {
    banner: [],
    commendSongList: []
}

const mutations = {
    SET_BANNER(state, list){
        state.banner = list
    },
    SET_COMMENT_LIST(state, list){
        state.commendSongList = list;
    }
}

const actions = {
    getBanner({commit}){
        queryBanner().then(res => {
            commit('SET_BANNER', res.banners || [])
        })
    },
    getCommentList({commit}, params = {limit: 8, order: 'new'}){
        queryHotSongSheet(params).then(({playlists}) =>{
            commit('SET_COMMENT_LIST', playlists)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
