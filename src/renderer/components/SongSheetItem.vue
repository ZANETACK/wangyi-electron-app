<template>
    <div class="song-sheet-item" @click="$emit('click')">
        <img class="img-box" :title="name" :src="src">
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
        width: calc((100% - 60px) / 5);
        margin: 0 15px 15px 0;
        cursor: pointer;
        border-radius: 4px;
        &:nth-child(5n + 2){
            margin-right: 0;
        }
        .img-box{
            width: 100%;
        }
        .name{
            line-height: 25px;
            color: @font-color-2;
            font-size: 14px;
            overflow: hidden;
            width: 100%;
        }
        .nickname{
            line-height: 16px;
            color: @font-color-1;
            font-size: 13px;
        }
    }
</style>
