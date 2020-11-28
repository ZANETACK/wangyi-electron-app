<template>
    <div class="Menu scrollbar">
        <ul class="menu-list">
            <li class="menu-item title">{{recommend.title}}</li>
            <template v-for="item in recommend.list">
                <li class="menu-item" :class="{active: activePath === item.path}" @click="handelClick(item)"><i class="iconfont" :class="[item.icon]"></i>{{item.label}}</li>
            </template>
        </ul>
        <ul class="menu-list" style="margin-top: 5px;">
            <li class="menu-item title">{{songSheet.title}}</li>
            <template v-for="item in songSheet.list">
                <li class="menu-item" :class="{active: activePath === item.path}" @click="handelClick(item)"><i class="iconfont" :class="[item.icon]"></i>{{item.label}}</li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data(){
            return {
                activePath: '/find',
                recommend:{
                    title: '推荐',
                    list: [
                        {label: '发现音乐', path: '/find', icon: 'icon-faxian3'},
                        {label: '私人FM', path: '/privatefm', icon: 'icon-yinle8'},
                        {label: '视频', path: '/video', icon: 'icon-shipin3'},
                        {label: '朋友', path: '/friend', icon: 'icon-renliziyuan'},
                        {label: '我的音乐', path: '/mymusic', icon: 'icon-yinle5'},
                        {label: '我的电台', path: '/mystation', icon: 'icon-xianxing_diantai'}
                    ]
                },
                songSheet:{
                    title: '我的歌单',
                    list: [
                        {label: '我喜欢的音乐', path: '/mylove', icon: 'icon-huaban'},
                    ]
                }
            }
        },
        methods: {
            handelClick({path}){
                if(this.$route.path !== path){
                    this.activePath = path;
                    this.$router.push(path)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .Menu{
        overflow-x: hidden;
        overflow-y: auto;
        height: calc(100% - 30px);
        padding-bottom: 30px;
        .menu-list{
            color: @font-color-1;
            .title{
                font-size: 13px;
                padding-left: 5px;
                &:hover{
                    background-color: transparent;
                }
            }
        }
        .menu-item{
            font-size: 13px;
            padding: 7px 14px;
            cursor: pointer;
            position: relative;
            &.active{
                background-color: #eee;
            }
            &.active:before{
                content: '';
                position: absolute;
                left: 0;
                height: 30px;
                border-left: 3px solid @theme;
                top: 50%;
                transform: translate(0, -50%);
            }
            &:hover{
                background-color: #f5f3f3;
            }
            .iconfont{
                padding-right: 2px;
            }
            .icon-xianxing_diantai{
                font-size: 13px;
            }
        }
    }
</style>
