export default ({ app, store }, inject) => {
  /**
   * Server API
   * @param string uri
   * @return string
   */
  inject('api', (uri) => {
    if (uri.charAt(0) === '/') {
      uri = uri.substring(1)
    }
    return `${process.env.baseApi}/${uri}`
  })

  /**
   * Auth Dialog (Login | Sign Up)
   * @param string uri
   * @return string
   */
  inject('showAuthDialog', (dialog, show) => {
    store.dispatch('auth/showModal', {
      show,
      property: dialog,
    })
  })
}
