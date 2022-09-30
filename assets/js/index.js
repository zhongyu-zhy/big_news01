$(function(){
  let layer = layui.layer
 
  const getUserinfo = ()=>{
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      headers:{
        Authorization:localStorage.getItem('big_news_token') ||''
      },
      success(res){
        console.log(res)
        if(res.code !== 0) return layer.msg(res.message)
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

  const render = (res)=>{
    if(res.user_pic){
      $('.text-avatar').hide()
      $('.userinfo img').css('src',res.user_pic)
    }else {
      $('.layui-nav-img').hide()
      const name = res.data.nickname || res.data.username
      const char = name[0].toUpperCase()
      $('.text-avatar').html(char)
    }
    $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
  }
})