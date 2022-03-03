export default ({app}, inject) => {
  /**
   * Server API
   * @param string uri
   * @return string
   */
  inject('api', (uri) => {
    return `${process.env.baseApi}/${uri}`;
  });
};