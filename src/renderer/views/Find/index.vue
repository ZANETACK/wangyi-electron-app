<template>
    <div class="Find">
        <el-carousel :interval="4000" :loop="true" :autoplay="false" type="card" height="160px">
            <el-carousel-item v-for="(item, i) in banner" :key="i">
                <img style="width: 100%;height: 100%" :src="item.imageUrl" @click="bannerClick(item)">
                <span class="typeTitle" :style="`background: ${item.titleColor}`">{{item.typeTitle}}</span>
            </el-carousel-item>
        </el-carousel>
        <card-header title="推荐歌单"></card-header>
        <template v-for="item in commendSongList">
            <song-sheet-item :key="item.id" :src="item.coverImgUrl" :name="item.name" :nickname="item.creator.nickname" @click="songSheetClick(item)" ></song-sheet-item>
        </template>
        <card-header title="独家放送"></card-header>
        <card-header title="最新音乐"></card-header>
        <card-header title="推荐MV"></card-header>
        <card-header title="主播电台"></card-header>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import CardHeader from "@/components/CardHeader"
    import SongSheetItem from "@/components/SongSheetItem"
    import { ipcRenderer } from 'electron';
    export default {
        name: "Find",
        components:{
            CardHeader,
            SongSheetItem
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
                        query: {
                            id: item.targetId
                        }
                    })
                }
            },
            songSheetClick(item){
                console.log({...item})
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
</style>
