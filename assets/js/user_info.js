$(function(){
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname:function(value){
      if(value.length >6){
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })


  //初始化用户信息
  function initUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res){
        if(res.code !== 0) return layer.msg('请求用户信息失败')
        console.log(res)
        //调用form.val()快速赋值
        form.val('formInfo',res.data)
      }
    })
  }
  initUserInfo()

  //重置表单数据
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
  })

  //监听表单提交事件
  $('.layui-form').on('submit',function(e){
    e.preventDefault()

    $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      data: form.val('formInfo'),
      success(res){
        if(res.code !==0) return layer.msg('更新用户信息失败')       
        // console.log(res)
        window.parent.getUserinfo()
        layer.msg('更新用户信息成功！')
      }
    })
  })


})