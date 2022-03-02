export const getUrlParams = url => {
  const paraIndex = url.indexOf('?')
  if (paraIndex === -1) {
    return null
  }
  const params = {}
  url = url.substr(paraIndex + 1, url.length)
  const paras = url.split('&')
  paras.forEach(element => {
    const para = element.split('=')
    params[para[0]] = decodeURIComponent(para[1])
  })
  return params
}
