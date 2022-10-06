$.ajaxPrefilter(function (config) {

  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = decodeURIComponent(kv[1])
    })
    return JSON.stringify(target)
  }

  //统一设置基准地址
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url

  //统一设置请求头Content-Type值
  config.contentType = 'application/json'

  //统一设置请求的参数-post请求
  config.data = config.data && format2Json(config.data)

  if (config.url.includes('/my')) {
    config.headers = { Authorization: localStorage.getItem('big_news_token') || '' }
  }
  //解决没有登录却可以访问index页面的问题
  config.complete = function (res) {
    // console.log(res)
    if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('big_news_token')
      location.href = '/login.html'
    }
  }
})