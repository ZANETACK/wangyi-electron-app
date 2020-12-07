<template>
    <div class="day-view" @click="$emit('click', 'day')">
        <div>
            <p class="week">{{weekInfo.week}}</p>
            <p class="day">{{weekInfo.day}}</p>
        </div>
    </div>
</template>

<script>
    import {weekInfo} from "@/utils"
    export default {
        name: "day-view",
        data(){
            return {
                weekInfo: weekInfo(),
            }
        }
    }
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
