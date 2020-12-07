<template>
    <el-table size="mini" :data="list" :border="false" stripe  style="width: 100%;">
        <template  v-for="item in columns">
            <el-table-column
                    :prop="item.prop"
                    :width="item.width || 0"
                    :label="item.label || ''"
                    v-if="item.slot"
            >
                <slot  :name="item.slot"
                       slot-scope="{row, column, $index}"
                       :row="row"
                       :column="column"
                       :$index="$index"
                ></slot>
            </el-table-column>
            <el-table-column
                    :prop="item.prop"
                    :width="item.width || 0"
                    :label="item.label || ''"
                    v-else
            ></el-table-column>
        </template>
    </el-table>
</template>

<script>
    export default {
        name: "song-table",
        props: {
            list: {
                type: Array,
                default: () => []
            },
            columns: {
                type: Array,
                default: () => []
            },
        }
    }
</script>

<style scoped lang="less">
    /deep/.el-table_1_column_4 > div{
        white-space: nowrap;
    }
</style>
