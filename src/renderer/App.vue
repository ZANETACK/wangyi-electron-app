<template>
    <div id="app">
        <md-header @search="onSearch"/>
        <div class="md-body">
            <div class="md-body-left">
                <Menu @change="onMenuChange"/>
            </div>
            <div class="md-body-right scrollbar">
                <transition name="slide-left">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import MdHeader from "@/components/MdHeader"
    import Menu from "@/components/Menu"
    export default {
        name: 'wangyi-electron-app',
        components: {
            MdHeader,
            Menu
        },
        mounted() {
        
        },
        methods:{
            onSearch(value){
                if(this.$route.path !== '/search'){
                    this.$router.push('/search')
                }
                setTimeout(() => {
                    this.$bus.$emit('search', value)
                }, 200)
            },
            onMenuChange(itme){
                console.log(itme);
            }
        }
    }
</script>

<style scoped lang="less">
    #app{
        height: 100%;
    }
    .md-body{
        height: calc(100vh - 50px);
        overflow: hidden;
        display: flex;
    }
    .md-body-left{
        width: 194px;
        height: 100%;
        overflow: hidden;
        background-color: #f8f8f8;
        border-right: 1px solid #eee;
    }
    .md-body-right{
        flex: 1;
        height: 100%;
        background-color: #fff;
        padding:5px 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100px, 0);
        transform: translate(100px, 0);
    }
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100px, 0);
        transform: translate(-100px, 0);
    }
</style>
