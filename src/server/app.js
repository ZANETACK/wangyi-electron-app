import express from 'express';
import bodyParser from 'body-parser';
import request from './util/request';
const cache = require('apicache').middleware;
const config = require('../../.electron-vue/config.js')

const app = express();

// CORS & Preflight request
app.use((req, res, next) => {
    if(req.path !== '/' && !req.path.includes('.')){
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// cookie parser
app.use((req, res, next) => {
    req.cookies = {}, (req.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
        let crack = pair.indexOf('=')
        if(crack < 1 || crack == pair.length - 1) return
        req.cookies[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim()
    })
    next()
})
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// cache
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

//api
const special = {
    'daily_signin.js': '/daily_signin',
    'fm_trash.js': '/fm_trash',
    'personal_fm.js': '/personal_fm'
}
let files = ["weblog.js", "video_url.js", "video_sub.js", "video_group_list.js", "video_group.js", "video_detail_info.js", "video_detail.js", "user_update.js", "user_subcount.js", "user_record.js", "user_playlist.js", "user_follows.js", "user_followeds.js", "user_event.js", "user_dj.js", "user_detail.js", "user_cloud_detail.js", "user_cloud_del.js", "user_cloud.js", "user_audio.js", "top_song.js", "top_playlist_highquality.js", "top_playlist.js", "top_mv.js", "top_list.js", "top_artists.js", "top_album.js", "toplist_detail.js", "toplist_artist.js", "toplist.js", "song_url.js", "song_detail.js", "simi_user.js", "simi_song.js", "simi_playlist.js", "simi_mv.js", "simi_artist.js", "share_resource.js", "setting.js", "send_text.js", "send_playlist.js", "search_suggest.js", "search_multimatch.js", "search_hot_detail.js", "search_hot.js", "search_default.js", "search.js", "scrobble.js", "resource_like.js", "related_playlist.js", "related_allvideo.js", "register_cellphone.js", "recommend_songs.js", "recommend_resource.js", "rebind.js", "program_recommend.js", "playmode_intelligence_list.js", "playlist_update.js", "playlist_tracks.js", "playlist_tags_update.js", "playlist_subscribers.js", "playlist_subscribe.js", "playlist_name_update.js", "playlist_hot.js", "playlist_detail.js", "playlist_desc_update.js", "playlist_delete.js", "playlist_create.js", "playlist_catlist.js", "personal_fm.js", "personalized_privatecontent.js", "personalized_newsong.js", "personalized_mv.js", "personalized_djprogram.js", "personalized.js", "mv_url.js", "mv_sublist.js", "mv_sub.js", "mv_first.js", "mv_exclusive_rcmd.js", "mv_detail_info.js", "mv_detail.js", "mv_all.js", "msg_private_history.js", "msg_private.js", "msg_notices.js", "msg_forwards.js", "msg_comments.js", "lyric.js", "logout.js", "login_status.js", "login_refresh.js", "login_cellphone.js", "login.js", "likelist.js", "like.js", "hot_topic.js", "follow.js", "fm_trash.js", "event_forward.js", "event_del.js", "event.js", "dj_toplist_popular.js", "dj_toplist_pay.js", "dj_toplist_newcomer.js", "dj_toplist_hours.js", "dj_toplist.js", "dj_today_perfered.js", "dj_sublist.js", "dj_sub.js", "dj_recommend_type.js", "dj_recommend.js", "dj_radio_hot.js", "dj_program_toplist_hours.js", "dj_program_toplist.js", "dj_program_detail.js", "dj_program.js", "dj_paygift.js", "dj_hot.js", "dj_detail.js", "dj_catelist.js", "dj_category_recommend.js", "dj_category_excludehot.js", "dj_banner.js", "digitalAlbum_purchased.js", "digitalAlbum_ordering.js", "daily_signin.js", "comment_video.js", "comment_playlist.js", "comment_mv.js", "comment_music.js", "comment_like.js", "comment_hotwall_list.js", "comment_hot.js", "comment_event.js", "comment_dj.js", "comment_album.js", "comment.js", "check_music.js", "cellphone_existence_check.js", "captcha_verify.js", "captcha_sent.js", "batch.js", "banner.js", "artist_top_song.js", "artist_sublist.js", "artist_sub.js", "artist_mv.js", "artist_list.js", "artist_desc.js", "artist_album.js", "artists.js", "album_sublist.js", "album_sub.js", "album_newest.js", "album_detail_dynamic.js", "album.js", "activate_init_profile.js"];

files.map(file => {
    if(!file.endsWith('.js')) return;
    let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/');
    let question = require(`./module/${file}`).default;
    app.use(`/md${route}`, (req, res) => {
        let query = Object.assign({}, {cookie: req.cookies}, req.query, req.body);
        question(query, request)
        .then((answer) => {
            console.log('[OK]', decodeURIComponent(req.originalUrl))
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        })
        .catch((answer) => {
            console.log('[ERR]', decodeURIComponent(req.originalUrl), {
                status: answer.status,
                body: answer.body,
            })
            if (answer.body.code == '301') answer.body.msg = '需要登录'
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        })
    })
})

const port = config.SERVER_PORT;
const host = '';
app.server = app.listen(port, host, () => {
    console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
