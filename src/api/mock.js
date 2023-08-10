import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from "./mockServeData/user"
import permission from "./mockServeData/permission"
import mall from './mockServeData/mall'
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

Mock.mock('/api/user/add','post' ,user.createUser)
Mock.mock('/api/user/edit','post' ,user.updateUser)
Mock.mock('/api/user/del', 'post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)
Mock.mock(/api\/permission\/getMenu/,"post",permission.getMenu)
Mock.mock(/api\/mall\/getGoods/,mall.getMallList)

Mock.mock('/api/mall/add','post' ,mall.createMall)
Mock.mock('/api/mall/edit','post' ,mall.updateMall)
Mock.mock('/api/mall/del', 'post',mall.deleteMall)