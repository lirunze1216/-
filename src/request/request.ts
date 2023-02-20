import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://120.24.64.5:8088/mall-admin',
  // 响应时间
  timeout: 15000,
})

// 拦截器   config=>{}成功的  err=>{}失败的
instance.interceptors.request.use(
  config => {
    let token = Cookies.get('token')
    if (token) {
      config.headers = config.headers || {} //这句话意思是如果headers存在则等于他自己，不存在就等于一个空对象
      config.headers['Authorization'] = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  result => {
    return result.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance
