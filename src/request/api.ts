import request from './request'
import qs from 'qs'

// 登陆返回token
export const adminLoginApi = (data: AdminLoginData): PromiseRes<AdminLoginRes> => request.post('/admin/login', data)

// 获取当前的登录用户信息
export const getAdminInfoApi = (): PromiseRes<AdminInfoRes> => request.get('/admin/info')

// 获取用户数据列表
export const getAdminLists = (data: AdminListParams): PromiseRes<{ list: {}[] }> =>
  request.get('admin/list', { params: data })

// 修改指定用户信息
export const updateAdmin = (id: number, data: AdminObjItf): PromiseRes => request.post('/admin/update/' + id, data)

// 获取所有角色
export const getRoleListAll = (): PromiseRes<RoleObjItf[]> => request.get('/role/listAll')

// 根据用户id获取角色
export const getAdminRoleById = (id: number): PromiseRes<RoleObjItf[]> => request.get('/admin/role/' + id)

// 给用户分配角色  因为后端要求参数要放在url后面所以要写在post请求的第三个参数里面,就像get请求的第二个参数一样

// application/json形式传参
// export const updateAdminRole = (data: { adminId: number; roleIds: string }): PromiseRes =>
//   request.post('/admin/role/update', null, { params: data })

// export const updateAdminRole = (data: { adminId: number; roleIds: number[] }): PromiseRes =>
//   request.post('/admin/role/update', data)

// form-data形式传参 要引入qs库来帮我们把对象转为form-data形式的参数
export const updateAdminRole = (data: { adminId: number; roleIds: string }): PromiseRes =>
  request.post(
    '/admin/role/update',
    qs.stringify(data) //就转换成了 adminId=num1&roleIds=num2
    // {
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, //接口里面设置请求头
    // }
  )

// 获取首页数据
export const getAdminStat = (): PromiseRes<IndexDataItf> => request.get('http://kumanxuan1.f3322.net:8360/admin/stat')
