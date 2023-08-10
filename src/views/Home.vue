<template>
  <el-row>
    <!-- 主内容区左侧部分 -->
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="top">
          <img src="../assets/image/user.png" class="user" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>

        <div class="bottom">
          <p>上次登录时间:<span>2023/7/18</span></p>
          <p>上次登录地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLables"
            :prop="key"
            :label="val"
          />
        </el-table>
      </el-card>
    </el-col>

    <!-- 右侧导航栏部分 -->
    <el-col :span="16" style="padding-left: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: '0px' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph" style="margin-top: 20px">
        <el-card>
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card>
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../api"
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [],
      tableLables: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({data})=>{
      const {tableData} =data.data;
      this.tableData =tableData
      const echarts1 =echarts.init(this.$refs.echarts1)
      var echarts1Options ={}
     
      const {orderData,userData,videoData} =data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData ={
        data : xAxis
      }
      echarts1Options.xAxis =xAxisData
      echarts1Options.yAxis ={}
      echarts1Options.legend =xAxisData
      echarts1Options.series =[]
      xAxis.forEach(key =>{
        echarts1Options.series.push({
          name:key,
          data:orderData.data.map(item =>item[key]),
          type:'line'
        })
      })
      echarts1.setOption(echarts1Options)

      // 柱状图
      const echarts2 =echarts.init(this.$refs.echarts2)
      const echarts2Options ={
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
           
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:"新增用户",
              data:userData.map(item =>item.new),
              type:'bar'
            },
            {
              name:"活跃用户",
              data:userData.map(item =>item.active),
              type:'bar'
            }
          ],
        }
        console.log(data.data);
        echarts2.setOption(echarts2Options)
        const echarts3 =echarts.init(this.$refs.echarts3)
        const echarts3Options = {
            tooltip: {
              trigger: "item",
            },
            color: [
              "#0f78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf",
            ],
            series: [
              { 
                 data:videoData,
                  type:'pie'
              }

            ],
          }
          echarts3.setOption(echarts3Options)
    })
      
  }
};
</script>
<style lang="less" scoped>
.el-card {
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;

    border-bottom: 1px solid #ccc;
    .user {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .userInfo {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: gray;
      }
    }
  }
  .bottom {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999999;

      span {
        color: #666666;
        margin-left: 60px;
      }
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    color: white;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: gray;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;

  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>
