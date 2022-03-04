export default ({ $axios, store, redirect }) => {
  if (process.server) {
    return
  }
  // Request interceptor
  $axios.interceptors.request.use((request) => {
    const token = store.getters['auth/token']
    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`
    }
    return request
  })
  // Response interceptor
  $axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response || {}

      if (status === 401 && store.getters['auth/check']) {
        // store.commit('auth/LOGOUT')
        // redirect({ name: 'admin-login' })
      }

      return Promise.reject(error)
    }
  )
}
