$(function () {
  let layer = layui.layer
  // 点击退出事件  
  // 弹出确认弹窗确认后，清除本地存储里面的token值再进行跳转页面
  $('#btnBack').on('click', function () {
    layer.confirm('是否确认退出', { icon: 7, title: '提示' }, function (index) {
      localStorage.removeItem('big_news_token')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})

// var const 区别：由 var或function 关键字声明的变量会默认在window上显示   而从上图声明的变量不会再window上显示
function getUserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('big_news_token') || ''
    },
    success(res) {
      console.log(res)
      if (res.code !== 0) return layer.msg(res.message)
      /* if(res.user_pic){
        $('.text-avatar').hide()
        $('.userinfo img').css('src',res.user_pic)
      }else {
        $('.layui-nav-img').hide()
        const char = res.data.username.charAt(0).toUpperCase()
        $('.text-avatar').html(char)
      }
      $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`) */
      render(res)
    }

  })
}
getUserinfo()

const render = (res) => {
  if (res.data.user_pic) {
    $('.text-avatar').hide()
    $('.userinfo img').attr('src', res.data.user_pic).show()
  } else {
    $('.layui-nav-img').hide()
    const name = res.data.nickname || res.data.username
    const char = name[0].toUpperCase()
    $('.text-avatar').css('display','flex').html(char).show()
  }
  $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}