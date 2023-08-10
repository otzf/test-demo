<template>
  <div class="Container">
    <div class="container-l">
      
        <el-button
          icon="el-icon-menu"
          size="mini"
          @click="ClickMenu()"
          style="margin-right: 20px"
        ></el-button>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{path:item.path}">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
      
    </div>
    <div class="container-r">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/image/user.png" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style  lang="less" scoped>
.Container {
  background-color: black;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: white;
    font-size: 14px;
    margin-left: 20px;
  }
  .container-r {
    .user {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
  .container-l{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner {
        font-weight:normal;
        &.is-link{
          color:#666
        }
       
      }
      &:last-child{
          .el-breadcrumb__inner {

            color: #fff;
          }
        }
    }
  }
 
}
</style>

<script>
import { mapState } from 'vuex';
import Cookie from "js-cookie"

export default {
  methods: {
    ClickMenu() {
      return this.$store.commit("changeCollapse");
    },
    handleCommand(command){
      if(command ==="logOut"){
        Cookie.remove("token")
        Cookie.remove("menu")
        this.$router.push({name:"login"})
        // Cookie.remove("menu")
      }
      // Cookie.remove("token")
    }
  },
  computed:{
    ...mapState({
        tags: state=>state.tab.tabsList
    })
  },
  mounted(){
    console.log(this.tags,"tags")
  }
};
</script>

