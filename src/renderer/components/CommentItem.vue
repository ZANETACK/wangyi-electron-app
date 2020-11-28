<template>
    <div class="comment-item flexbox flex-align-center">
        <img :src="source.user.avatarUrl" >
        <div class="content">
            <p class="comment-content"><span class="nickname">{{source.user.nickname}}:</span> {{source.content}}</p>
            <div class="flexbox flex-align-center flex-justify-between" style="margin-top: 10px;">
                <span class="comment-time">{{getTime(source.time)}}</span>
                <div class="comment-tools">
                    <span class="comment-nice font-hover" ><i class="iconfont icon-nice-line"></i>点赞{{ source.likedCount ? `(${source.likedCount})` : ''}}</span>
                    &nbsp;|&nbsp; <span class="font-hover">回复</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "@/utils"
    export default {
        name: "CommentItem",
        props: ['source'],
        methods:{
            getTime(time){
                let {M, D, h, m} = formatDate(time, true, true);
                return `${M}月${D}日 ${h}:${m}`
            }
        }
    }
</script>

<style scoped lang="less">
    .comment-item{
        padding: 15px 0;
        border-bottom: 1px solid #f9f9f9;
        >img{
            width: 50px;
            height: 50px;
            border-radius: 50%
        }
        .content{
            flex: 1;
            padding: 0 10px;
            font-size: 13px;
        }
        .comment-content{
            color: @font-color-2;
            line-height: 1.6;
        }
        .comment-time{
            color: @font-color-3;
        }
        .comment-tools{
            color: @font-color-3;
        }
        .comment-nice{
            .iconfont{
                font-size: 20px;
                vertical-align: middle;
            }
        }
        .nickname{
            color: #3d99d7;
        }
    }
</style>
