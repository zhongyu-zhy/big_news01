$(function () {
  let layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChoose').on('click', function () {
    //打开文件选择框
    $('#file').click()
  })

  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    let filelist = e.target.files
    if(filelist.length === 0){
      return layer.msg('请选择图片')
    }
     // 获取用户选择的文件
     let file = e.target.files[0]
    //将文件转换位路径
    const imgUrl = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

  })
})