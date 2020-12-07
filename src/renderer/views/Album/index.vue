<template>
    <div class="Album" v-loading="isLoading">
        <template v-if="isEmpty">
            <Empty>暂无专辑详情数据</Empty>
        </template>
        <template v-else>
            <div class="album-top">
                <img style="width: 180px;height: 180px" :src="img">
                <div class="album-top-content">
                    <span class="album-type">{{type}}</span>
                    <span class="album-title">{{title}}</span>
                    <br>
                    <el-button-group class="margin-top-20 vertical-middle">
                        <el-button type="primary" size="mini" icon="el-icon-video-play">播放全部</el-button>
                        <el-button type="primary" size="mini" icon="el-icon-plus"></el-button>
                    </el-button-group>
                    <el-button class="margin-top-20 vertical-middle margin-left-none"  size="mini" icon="el-icon-share">分享({{shareCount}})</el-button>
                    <p class="album-singer">歌手: <span>{{artists}}</span></p>
                    <p class="album-time">时间: <span>{{date}}</span></p>
                </div>
            </div>
    
            <el-tabs class="album-tab" v-model="activeName">
                <el-tab-pane label="歌曲列表" name="first">
                    <song-table :list="songList" :columns="[
                        {prop: 'key', width: 40},
                        {slot: 'operation', width: 100, label: '操作'},
                        {prop: 'name', label: '音乐标题'},
                        {prop: 'artists', label: '歌手'},
                        {prop: 'alName', label: '专辑'},
                        {prop: 'duration', label: '时长'},
                    ]">
                        <template slot="operation" slot-scope="scope">
                            <div class="album-tab-f-icon">
                                <i class="iconfont icon-zan" style="margin-top: 3px;"></i>
                                <i class="iconfont icon-xiazai"></i>
                            </div>
                        </template>
                    </song-table>
                </el-tab-pane>
                <el-tab-pane :label="`评论(${commentCount})`" name="second">
                    <div style="margin-top: 15px">
                        <P v-if="hotComments.length > 0" style="font-size: 13px;">精彩评论</P>
                        <comment-item v-for="item in hotComments" :source="item" :key="item.commentId"></comment-item>
                        <P v-if="comments.length > 0" style="margin-top: 20px;    font-size: 13px;">最新评论({{commentCount}})</P>
                        <comment-item v-for="item in comments" :source="item" :key="item.commentId"></comment-item>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="专辑详情" name="third">
                    <p class="font-1 font-bold" style="margin-top: 15px">专辑介绍</p>
                    <p class="font-2">{{description}}</p>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>
    import {queryAlbumDetail, queryComment, CODE} from "@/server"
    import {formatSecond, formatDate, zeroize, formatObjToParams} from "@/utils"
    import CommentItem from '@/components/CommentItem'
    import Empty from '@/components/Empty'
    import SongTable from '@/components/SongTable'
    export default {
        name: "Album",
        components:{
            CommentItem,
            Empty,
            SongTable
        },
        data(){
          return {
              isLoading: false,
              isEmpty: false,
              activeName: 'first',
              img: '',
              type: '',
              title: '',
              date: '2020-11-24',
              artists: '',
              shareCount: 0,
              commentCount: 0,
              description: '',
              songList: [],
              hotComments:[],//精彩评论
              comments: [],//最新评论
              params: {
                  limit: 30, //每页大小
                  offset: 0, //便宜多少
              }
          }
        },
        mounted() {
            this.id = this.$route.query.id;
            this.queryData()
        },
        methods: {
            queryData(){
                this.isLoading = true;
                queryAlbumDetail(this.id).then(res => {
                    this.formatData(res)
                }).catch(() => {
                    this.isEmpty = true;
                }).finally(() => {
                    this.isLoading = false;
                })
            },
            formatData({songs, album: {publishTime, artists, type, name, picUrl, description,info: {shareCount, commentCount, threadId}}}){
                this.date = formatDate(publishTime);
                this.type = type;
                this.title = name;
                this.img = picUrl;
                this.shareCount = shareCount;
                this.commentCount = commentCount;
                this.description = description;
                this.threadId = threadId;
                let songList = [];
                songs.map(({name, id, al, dt, fee, ar}, i) => {
                    songList.push({
                        key: zeroize(i + 1),
                        name,
                        id,
                        alName: al.name,
                        duration: formatSecond(dt / 1000),
                        fee,
                        artists: ar.map(item => item.name).join('/')
                    })
                })
                this.songList = songList;
                this.artists = artists.map(item => item.name).join(' / ');
                this.getCommentList()
            },
            getCommentList(){
                queryComment({
                    threadId: this.threadId,
                    ...this.params
                }).then(({comments, hotComments}) => {
                    this.comments = comments;
                    if(!this.hotComments || this.hotComments.length === 0){
                        this.hotComments = hotComments
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .Album{
        .album-top{
            display: flex;
            padding: 20px 30px;
        }
        .album-top-content{
            flex: 1;
            overflow: hidden;
            padding: 3px 0 0 15px;
        }
        .album-title{
            font-size: 20px;
            vertical-align: middle;
        }
        .album-singer,
        .album-time{
            margin-top: 20px;
            color: @font-color-2;
            font-family: sans-serif;
            font-size: 14px;
            >span{
                color: @font-color-1;
                font-family: sans-serif;
            }
        }
        .album-time{
            margin-top: 15px;
        }
        .font-2{
            line-height: 1.6;
            margin-top: 15px;
            text-indent: 32px;
            font-size: 13px;
        }
    }
    .album-tab{
        margin-top: 20px;
    }
    .album-tab-f-icon{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        >i{
            height: 18px;
            font-size: 18px;
            cursor: pointer;
        }
    }
    /deep/.el-table_1_column_2.is-leaf{
        text-align: center;
    }
    /deep/.el-tabs__header{
        margin: 0;
    }
    /deep/.el-tabs__nav-scroll{
        padding: 0 30px;
    }
    /deep/ .el-tabs__content{
        padding: 0 30px 50px;
    }
    /deep/.el-tabs__nav-wrap::after{
        height: 1px;
    }
</style>
