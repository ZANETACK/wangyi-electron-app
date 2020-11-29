import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/find'
        },
        {
            path: '/search',
            name: 'search',
            component: require('@/views/Search').default,
            meta: { title: "搜索"}
        },
        {
            path: '/find',
            name: 'find',
            component: require('@/views/Find').default,
            meta: { title: "发现音乐"}
        },
        {
            path: '/privatefm',
            name: 'privatefm',
            component: require('@/views/PrivateFM').default,
            meta: { title: "私人FM"}
        },
        {
            path: '/video',
            name: 'video',
            component: require('@/views/Video').default,
            meta: { title: "视频"}
        },
        {
            path: '/friend',
            name: 'friend',
            component: require('@/views/Friend').default,
            meta: { title: "朋友"}
        },
        {
            path: '/mymusic',
            name: 'mymusic',
            component: require('@/views/MyMusic').default,
            meta: { title: "我的音乐"}
        },
        {
            path: '/mystation',
            name: 'mystation',
            component: require('@/views/MyStation').default,
            meta: { title: "我的电台"}
        },
        {
            path: '/mylove',
            name: 'mylove',
            component: require('@/views/MyLove').default,
            meta: { title: "我喜欢的音乐"}
        },
        {
            path: '/album',
            name: 'album',
            component: require('@/views/Album').default,
            meta: { title: "专辑详情"}
        },
        {
            path: '/songsheet',
            name: 'SongSheet',
            component: require('@/views/SongSheet').default,
            meta: { title: "歌单"}
        },
        {
            path: '/radiostation',
            name: 'RadioStation',
            component: require('@/views/RadioStation').default,
            meta: { title: "歌单"}
        },
        {
            path: '/rankinglist',
            name: 'RankingList',
            component: require('@/views/RankingList').default,
            meta: { title: "排行榜"}
        },
        {
            path: '/singer',
            name: 'Singer',
            component: require('@/views/Singer').default,
            meta: { title: "歌手"}
        },
        {
            path: '/newmusic',
            name: 'NewMusic',
            component: require('@/views/NewMusic').default,
            meta: { title: "最新音乐"}
        }
    ]
});
router.beforeEach(async (to, from, next) => {
    next();
})
export default router;
