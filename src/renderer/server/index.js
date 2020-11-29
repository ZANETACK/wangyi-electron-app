import request from "@/utils/request";
import {formatObjToParams} from "@/utils"
export const CODE = 200;

//手机号登录
export function loginPhone(params = {}) {
    return request.get(`/login/cellphone?${formatObjToParams(params)}`)
}
//邮箱登录
export function loginEmail(params = {}) {
    return request.get(`/login?${formatObjToParams(params)}`)
}
/*
* 搜索
type: 1,  // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
limit: 30, //每页大小
offset: 0, //便宜多少
* */
export function querySearch(params = {}) {
    return request.get(`/search?${formatObjToParams(params)}`)
}
/*
轮播图
type: 'pc //'0: 'pc',1: 'android',2: 'iphone',3: 'ipad'W
* */
export function queryBanner() {
    return request.get(`/banner`)
}

/*
* 获取专辑内容
*id=95951744
* */
export function queryAlbumDetail(id) {
    return request.get(`/album?id=${id}`)
}
/*
* 获取动态评论
*threadId=R_AL_3_95951744
* limit: 30, //每页大小
  offset: 0, //便宜多少
* */
export function queryComment(params = {}) {
    return request.get(`/comment/event?${formatObjToParams(params)}`)
}
//每日歌单推荐
export function queryCommentResource(params = {}) {
    return request.get(`/recommend/resource?${formatObjToParams(params)}`)
}
//每日歌单推荐
export function queryCommentSongs(params = {}) {
    return request.get(`/recommend/songs?${formatObjToParams(params)}`)
}
/*
【获取歌单】
可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
limit: 取出歌单数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
* */
export function queryHotSongSheet(params = {}) {
    return request.get(`/top/playlist?${formatObjToParams(params)}`)
}
/*
获取歌单详情
必选参数 : id : 歌单 id
可选参数 : s : 歌单最近的 s 个收藏者,默认为8
* */
export function querySongSheetDetail(id) {
    return request.get(`/playlist/detail?id=${id}`)
}
