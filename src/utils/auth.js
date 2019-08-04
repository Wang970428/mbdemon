const TOKEN_KEY = 'token'

// 获取token
export const getUser = () => JSON.parse(window.localStorage.getItem(TOKEN_KEY))
// 设置token
export const setUser = (data) => window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
// 移除User
export const removeUser = () => window.localStorage.removeItem(TOKEN_KEY)
