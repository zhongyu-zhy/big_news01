$(function () {
  let layer = layui.layer
  let form = layui.form

  // 初始化富文本编辑器
  initEditor()

  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
      headers:{
        Authorization:localStorage.getItem('big_news_token')
      },
      success(res) {
        console.log(res)
        if (res.code !== 0) return layer.msg('获取分类失败')
        // layer.msg('获取分类成功')
        const html = template('tpl-cate', res)
        $('[name=cate_id]').html(html)
        //通过layui重新渲染
        form.render()
      }
    })
  }
  initArtCateList()


  // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)


  //为选择封面按钮添加点击事件
  $('#btnchooseImg').on('click',function(){
    $('#coverFile').click()
  })


  //更换裁剪图片
  $('#coverFile').on('change',function(e){
    const files = e.target.files
    if(files.length === 0) return layer.msg('请选择文件')
    const newImgURL = URL.createObjectURL(files[0])

    $image
   .cropper('destroy') // 销毁旧的裁剪区域
   .attr('src', newImgURL) // 重新设置图片路径
   .cropper(options) // 重新初始化裁剪区域

  })

  let state = '已发布'
  $('#btnSave2').on('click',function(){
    state = '草稿'
  })

  $('#formPub').on('submit',function(e){
    e.preventDefault()
    let fd = new FormData($(this)[0])
    fd.append('state',state)

    $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      fd.append('cover_img',blob)

      pubArt(fd)
    })
 })

 //调用发布文章方法
 function pubArt(fd){
  $.ajax({
    method:'POST',
    url:'http://big-event-vue-api-t.itheima.net/my/article/add',
    data:fd,
    // 注意：如果向服务器提交的是 FormData 格式的数据，
    //必须添加以下两个配置项
    contentType: false,
    processData: false,
    headers:{
      Authorization:localStorage.getItem('big_news_token')
    },
    success(res){
      if(res.code !==0) return layer.msg('发布文章失败')
      layer.msg('发布文章成功')
      location.href = '/cate/art_list.html'
    }
  })
 }


})