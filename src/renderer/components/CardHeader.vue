<template>
    <div class="card-header flexbox flex-justify-between flex-align-center">
        <span>{{title}}</span>
        <span>更多<i class="iconfont icon-dayu3"></i></span>
    </div>
</template>

<script>
    export default {
        name: "card-header",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="less">
    .card-header{
        border-bottom: 1px solid #f0eded;
        font-size: 13px;
        line-height: 32px;
        color: #303030;
        margin-bottom: 10px;
        >span:first-child{
            font-size: 16px;
            font-weight: bold;
            color: @font-color-2;
        }
        >span:last-child{
            cursor: pointer;
            .iconfont{
                position: relative;
                left: -3px;
                font-size: 13px;
            }
        }
    }
</style>
