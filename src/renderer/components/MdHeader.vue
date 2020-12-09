<template>
    <div class="md-header flexbox">
        <div class="logo notSelect"><i class="iconfont icon-weibiaoti--"></i>麦兜音乐</div>
        <div class="content">
            <div class="page-switch">
<!--                <i class="iconfont icon-shouye1" @click="home"></i>-->
                <i class="iconfont icon-jiantou-zuo" @click="back"></i>
                <i class="iconfont icon-jiantou-you" @click="go"></i>
            </div>
            <div class="search">
                <div class="search-box">
                    <input @focus="onFocus" @blur="onBlur" v-model="searchValue" type="text" placeholder="搜索音乐，视频，歌词，电台">
                    <i class="iconfont icon-sousuo3" @click="onSearch"></i>
                </div>
            </div>
            <div class="drag">
            
            </div>
            <div class="user-info">
                <template v-if="user.isLogin">
                    
                    <el-popover
                            placement="bottom"
                            width="300"
                            trigger="click"
                            popper-class="user-info-popper"
                    >
                            <div slot="reference">
                                <el-avatar class="vertical-middle" shape="circle" size="small" :src="user.profile.avatarUrl"></el-avatar>
                                <span class="vertical-middle ellipsis" style="width: 100px;" :title="user.profile.nickname">{{user.profile.nickname}}</span>
                                <i class="el-icon-caret-bottom vertical-middle"></i>
                            </div>
                            <p style="padding: 0 15px;">
                                <el-avatar class="vertical-middle" shape="circle" size="small" :src="user.profile.avatarUrl"></el-avatar>
                                <span class="vertical-middle ellipsis font-1" :title="user.profile.nickname">{{user.profile.nickname}}</span>
                            </p>
                            <div class="user-info-number flexbox">
                                <div class="flex_1 br">
                                    <p class="font-1">{{user.profile.eventCount}}</p>
                                    <p>动态</p>
                                </div>
                                <div class="flex_1 br">
                                    <p class="font-1">{{user.profile.follows}}</p>
                                    <p>关注</p>
                                </div>
                                <div class="flex_1">
                                    <p class="font-1">{{user.profile.followeds}}</p>
                                    <p>粉丝</p>
                                </div>
                            </div>
                            <div class="user-logout" style="border-bottom: 1px solid #eee;">
                                <i class="iconfont icon-shezhi"></i><span>个人信息设置</span> <i class="el-icon-arrow-right"></i>
                            </div>
                            <div class="user-logout" @click="onLogout">
                                <i class="iconfont icon-tuichudenglu"></i><span>退出登录</span>
                            </div>
                    </el-popover>
                </template>
                <template v-else>
                    <span class="user-login" @click="onLogin"> <i v-if="loginLoading" class="el-icon-loading"></i> {{loginLoading ? '登录中...' : '未登录，现在登录'}}</span>
                </template>
            </div>
        </div>
        <div class="win-tool">
            <i class="iconfont icon-zuixiaohua1" @click="mini"></i>
            <i class="iconfont" :class="isMini ? 'icon-zuidahua' : 'icon-zuixiaohua'" @click="max"></i>
            <i class="iconfont icon-error" @click="close"></i>
        </div>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron';
    import {mapGetters} from "vuex"
    export default {
        name: "MdHeader.vue",
        data(){
            return {
                searchValue: '',
                isMini: true,
                loginLoading: false
            }
        },
        
        computed: {
            ...mapGetters(['user'])
        },
        mounted() {
            window.addEventListener('keyup', (e) => {
                if(this.focus && e.keyCode === 13){
                    this.onSearch()
                }
            });
            if(this.user.isLogin){
                this.onLogin();
            }
        },
        methods:{
            onLogout(){
                this.$confirm('你要离开我了吗? 谢谢这些日子的陪伴，我会想你的。',{
                    type: 'warning',
                    confirmButtonText: '残忍离去',
                    cancelButtonText: '在想一想'
                }).then(() => {
                    this.$store.dispatch('app/onLogout');
                }).catch(() => {
                    this.$message.info('谢谢您能留下来！')
                })
            },
            onLogin(){
                this.loginLoading = true;
                this.$store.dispatch('app/login', true).then(() => {
                    this.loginLoading = false;
                })
            },
            onFocus(){
                this.focus = true;
            },
            onBlur(){
                this.focus = false;
            },
            onSearch() {
                if (this.searchValue.trim() !== '') {
                    this.$emit('search', this.searchValue)
                }
            },
            home(){
                if(this.$route.path !== '/find'){
                    this.$router.push('/find')
                }
            },
            go(){
                this.$router.go(1)
            },
            back(){
                if(this.$route.path !== '/find' && this.$route.path !== '/'){
                    this.$router.go(-1)
                }
            },
            mini(){
                ipcRenderer.send('window-min');
            },
            max(){
                ipcRenderer.send('window-max');
                this.isMini = !this.isMini;
            },
            close(){
                ipcRenderer.send('window-close');
            }
        }
    }
</script>

<style scoped lang="less">
    .md-header{
        background-color: @theme;
        height: 50px;
        .logo{
            -webkit-app-region: drag;
            color: #f1dcdc;
            font-size: 20px;
            padding-left: 20px;
            line-height: 50px;
            width: 175px;
            .iconfont{
                font-size: 22px;
                vertical-align: middle;
                margin-right: 5px;
                font-weight: 900;
            }
        }
        .content{
            display: flex;
            align-items: center;
            flex: 1;
            .drag{
                -webkit-app-region: drag;
                flex: 1;
                height: 100%;
            }
        }
        .page-switch{
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid @hover;
            border-radius: 2px;
            height: 19px;
            overflow: hidden;
            i{
                color: #f38787;
                font-size: 15px;
                font-weight: bold;
                flex: 1;
                text-align: center;
                height: 19px;
                display: flex;
                cursor: pointer;
                &:before{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 20px;
                }
                &:hover{
                    background: @hover;
                }
            }
            i:nth-child(1){
                border-right: 1px solid @hover;
            }
        }
        .win-tool{
            display: flex;
            width: 85px;
            position: relative;
            align-items: center;
            padding-left: 20px;
            &:after{
                content: '';
                position: absolute;
                left: 0;
                border-left: 1px solid @hover;
                height: 22px;
                transform: translate(0, -50%);
                top: 50%;
            }
            i{
                height: 100%;
                flex: 1;
                line-height: 50px;
                font-size: 18px;
                color: #f38787;
                cursor: pointer;
                &:hover{
                    color: #fff;
                }
                &.icon-zuixiaohua{
                    font-size: 14px;
                }
            }
        }
        .search{
            width: 250px;
            height: 100%;
            display: flex;
            align-items: center;
            .search-box{
                height: 22px;
                background-color: @hover;
                border-radius: 20px;
                overflow: hidden;
                width: 100%;
                margin-left: 20px;
                display: flex;
                align-items: center;
                >input{
                    background-color: transparent;
                    width: calc(100% - 40px);
                    outline-style: none;
                    border: none;
                    height: 22px;
                    color: #f5d8d8;
                    padding: 0 8px;
                    font-size: 13px;
                    &::placeholder{
                        color: #f38787;
                    }
                }
                >.iconfont{
                    font-size: 12px;
                    color: #f38787;
                    height: 100%;
                    line-height: 24px;
                    width: 20px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
        .user-info{
            color: #fff;
            padding-right: 10px;
            font-size: 13px;
            cursor: pointer;
        }
    }
</style>
