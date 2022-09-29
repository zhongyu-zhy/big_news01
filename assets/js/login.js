$(function () {
  //点击注册
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击登录
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })



  let form = layui.form
  let layer = layui.layer
  //自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码为6~12位,且不能出现空格'],
    //校验两次密码是否一致
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'

      }

    }
  })

  //监听注册表单提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/reg',
      // contentType:'application/json',
      /* data:JSON.stringify({
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val(),
        repassword:$('#form_reg [name=repassword]').val()
      }), */
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#link_login').trigger('click')
      }
    })

  })

  //监听登录事件
  $('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/login',
      // contentType:'application/json',
      data:$(this).serialize(),
      success(res){
        if(res.code !==0) return layer.msg(res.message)

        localStorage.setItem('big_news_token',res.token)

        location.href = '/index.html'
      }
    })

  })



})

