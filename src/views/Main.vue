<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <commond-aside></commond-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <commond-header></commond-header>
                </el-header>
                <commond-tag></commond-tag>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container> 
    </div>
</template>
<script>
   import CommondAside from "../components/CommondAside.vue" 
   import CommondHeader from "../components/CommondHeader.vue" 
   import CommondTag from "@/components/CommondTag.vue"
   export default{
    data(){
        return{
            
        }
    },
    components:{
        CommondAside,
        CommondHeader,
        CommondTag
    }
   }
</script>
<style lang="less" scoped>
    .el-header{
        padding: 0;
    }
</style>
