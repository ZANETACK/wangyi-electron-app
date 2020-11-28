<template>
    <div class="song-sheet-item" @click="$emit('click')">
        <div class="img-box" :title="name">
            <img :src="src">
        </div>
        <p class="name ellipsis" :title="name">{{name}}</p>
        <p class="nickname ellipsis">{{nickname}}</p>
    </div>
</template>

<script>
    export default {
        name: "song-sheet-item",
        props: ['src', 'name', 'nickname']
    }
</script>

<style scoped lang="less">
    .song-sheet-item{
        display: inline-block;
        width: calc((100% - 45px) / 4);
        height: 200px;
        margin: 0 15px 15px 0;
        cursor: pointer;
        border-radius: 4px;
        &:nth-child(4n + 2){
            margin-right: 0;
        }
        .img-box{
            width: 100%;
            height: 150px;
            overflow: hidden;
            border: 1px solid #eee;
            img{
                width: 100%;
            }
        }
        .name{
            line-height: 25px;
            color: @font-color-2;
            font-size: 14px;
        }
        .nickname{
            line-height: 16px;
            color: @font-color-1;
            font-size: 13px;
        }
    }
</style>
