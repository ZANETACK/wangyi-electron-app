<template>
    <div class="Find">
        <el-tabs class="album-tab" v-model="tabActive" style="text-align: center">
            <el-tab-pane label="个性推荐" name="1">
                <el-carousel :interval="4000" :loop="true" :autoplay="false" type="card" height="200px">
                    <el-carousel-item v-for="(item, i) in banner" :key="i">
                        <img style="width: 100%;height: 100%" :src="item.imageUrl" @click="bannerClick(item)">
                        <span class="typeTitle" :style="`background: ${item.titleColor}`">{{item.typeTitle}}</span>
                    </el-carousel-item>
                </el-carousel>
                <card-header title="推荐歌单"></card-header>
                <day-view @click="onDaySong"></day-view>
                <template v-for="item in commendSongList">
                    <song-sheet-item :key="item.id" :src="item.coverImgUrl" :name="item.name" :nickname="item.creator.nickname" @click="songSheetClick(item)" ></song-sheet-item>
                </template>
                <card-header title="独家放送"></card-header>
                <card-header title="最新音乐"></card-header>
                <card-header title="推荐MV"></card-header>
                <card-header title="主播电台"></card-header>
            </el-tab-pane>
            <el-tab-pane label="歌单" name="2">
                <song-sheet></song-sheet>
            </el-tab-pane>
            <el-tab-pane label="主播电台" name="3">
                <radio-station></radio-station>
            </el-tab-pane>
            <el-tab-pane label="排行榜" name="4">
                <ranking-list></ranking-list>
            </el-tab-pane>
            <el-tab-pane label="歌手" name="5">
                <Singer></Singer>
            </el-tab-pane>
            <el-tab-pane label="最新音乐" name="6">
                <new-music></new-music>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import CardHeader from "@/components/CardHeader"
    import SongSheetItem from "@/components/SongSheetItem"
    import DayView from "@/components/DayView"
    import { ipcRenderer } from 'electron';
    import {querySongSheetDetail} from '@/server'
    import SongSheet from "@/views/SongSheet";//歌单
    import RadioStation from "@/views/RadioStation";//主播电台
    import RankingList from "@/views/RankingList"; //排行榜
    import Singer from "@/views/Singer"; //歌手
    import NewMusic from "@/views/NewMusic"; //歌手
    import {getCookie} from "@/utils"
    
    export default {
        name: "Find",
        components:{
            CardHeader,
            SongSheetItem,
            SongSheet,
            RadioStation,
            RankingList,
            Singer,
            NewMusic,
            DayView
        },
        data(){
            return {
                tabActive: '1'
            }
        },
        computed:{
            ...mapGetters(['banner', 'commendSongList'])
        },
        mounted() {
            this.$store.dispatch('find/getBanner');
            this.$store.dispatch('find/getCommentList');
        },
        methods: {
            bannerClick(item){
                if(item.targetType === 3000 && item.url){
                    ipcRenderer.send('open-url', item.url);
                }else if(item.targetType === 10){
                    this.$router.push({
                        path:'/album',
                        query: {id: item.targetId}
                    })
                }
            },
            songSheetClick(item){
                console.log({...item})
                // querySongSheetDetail(item.id).then(res => {
                //     console.log(res)
                // })
            },
            //每日歌曲
            onDaySong(){
            
            }
        }
    }
</script>

<style scoped lang="less">
    .Find{
        padding: 0 15px;
    }
    .typeTitle{
        display: inline-block;
        line-height: 16px;
        padding: 2px 4px 0px;
        position: absolute;
        right: 0;
        bottom: 3px;
        color: #fff;
        border-radius: 20px 0 0 20px;
        font-size: 11px;
        opacity: 0.8;
    }
    /deep/.el-carousel__indicator.is-active button{
        background-color: @theme;
    }
    /deep/.el-tabs__nav-scroll{
        display: flex;
        justify-content: center;
    }
    /deep/.el-tab-pane{
        text-align: left;
    }
</style>
