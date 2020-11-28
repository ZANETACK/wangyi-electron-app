<template>
    <div class="Search scroll scrollbar">
        <template v-for="(item, index) in list">
            <div style="padding: 5px 10px;">
                <img style="width: 60px;border-radius: 1px;    vertical-align: middle;" :src="item.album && item.album.artist && item.album.artist.img1v1Url">
                {{item.id}} - {{item.name}}</div>
        </template>
    </div>
</template>

<script>
    import { querySearch } from "@/server"
    import { formatObjToParams } from "@/utils"
    export default {
        name: "Search",
        data(){
            return {
                list: [],
                params: {
                    type: 1,  // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
                    limit: 30, //每页大小
                    offset: 0, //便宜多少
                }
            }
        },
        mounted() {
            this.$bus.$on('search', this.queryList)
        },
        methods: {
            queryList(keywords){
                querySearch({
                    ...this.params,
                    keywords
                }).then(({result}) => {
                    this.list = result.songs || [];
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .Search{
        height: 100%;
    }
</style>
