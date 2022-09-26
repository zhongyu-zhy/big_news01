$(function(){
  //点击注册
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击登录
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })

  
})