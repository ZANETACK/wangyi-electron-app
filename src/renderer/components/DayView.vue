<template>
    <div class="day-view" @click="handelClick">
        <div>
            <p class="week">{{weekInfo.week}}</p>
            <p class="day">{{weekInfo.day}}</p>
            <p class="info" v-if="!user || !user.isLogin" style="font-size: 12px;color: #666;">未登录，请您先登录。</p>
        </div>
    </div>
</template>

<script>
    import {weekInfo} from "@/utils"
    import {mapGetters} from "vuex"
    export default {
        name: "day-view",
        data(){
            return {
                weekInfo: weekInfo(),
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            handelClick(){
                if(this.user && this.user.isLogin){
                    this.$emit('click', 'day')
                }
            }
        }
    }''
</script>

<style scoped lang="less">
    .day-view{
        width: calc((100% - 60px) / 5);
        border-radius: 4px;
        cursor: pointer;
        vertical-align: top;
        text-align: center;
        display: inline-block;
        >div{
            display: flex;
            flex-direction: column;
        }
        .week{
            font-size: 20px;
            color: @font-color-1;
            height: 30px;
        }
        .day{
            font-size: 6em;
            color: @theme;
            flex: 1;
        }
    }
</style>
