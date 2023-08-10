import http from "../utils/request"

export const getData = ()=>{
    return http.get('/home/getData')
}

export const getUser =(params) =>{
    return http.get('/user/getUser', params)
}
export const addUser=(data)=>{
    return http.post('/user/add', data)
}
export const editUser=(data)=>{
    return http.post('/user/edit', data)
}
export const delUser=(data)=>{
    return http.post('/user/del', data)
}
export const getMenu=(data)=>{
    return http.post('/permission/getMenu', data)
}
export const getGoods =(params) =>{
    return http.get('/mall/getGoods', params)
}
export const addMall=(data)=>{
    return http.post('/mall/add', data)
}
export const editMall=(data)=>{
    return http.post('/mall/edit', data)
}
export const delMall=(data)=>{
    return http.post('/mall/del', data)
}