// import axios from '@/utils/request'

export function login(data) {
  // return axios.post('/user/login', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data && data.username === 'admin') {
        resolve({ code: 0, data: '21h3j2131b' })
      } else {
        reject({ code: 1 })
      }
    }, 2000)
  })
}

export function getInfo() {
  // return axios.get('/user/info')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: ['admin']
      })
    }, 2000)
  })
}