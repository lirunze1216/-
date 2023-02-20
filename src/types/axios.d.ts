interface AdminLoginData {
  username: string
  password: string
}

type PromiseRes<T = {}> = Promise<ManageResult<T>>

// T={}设置默认值
interface ManageResult<T = {}> {
  code?: number
  data: T
  errno?: number
  message: string
}
// 登陆返回接口
interface AdminLoginRes {
  token: string
  tokenHead: string
}
// 当前用户信息
interface AdminInfoRes {
  menus: []
}

// 用户的数据列表
interface AdminListParams {
  keyword: string
  pageNum: number
  pageSize: number
}
