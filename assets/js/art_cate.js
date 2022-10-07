$(function(){
let layer = layui.layer
let form = layui.form
  function initArtCateList(){
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success(res){
        console.log(res)
        if(res.code !== 0) return layer.msg('获取分类失败')
        // layer.msg('获取分类成功')
        const htmlStr = template('tpl-cate',res)
        $('tbody').html(htmlStr)
      }
    })
  }
  initArtCateList()

  let indexAdd = undefined
  //为添加类别按钮绑定点击事件
  $('#btnAddcate').on('click',function(){
   indexAdd = layer.open({
      type:1,
      area:['500px','270px'],
      title:'添加文章分类',
      content:$('#dialog-add').html()
    })
  })

  let isEdit = false //用来记录当前状态

  //为form-add表单绑定submit事件
  $('body').on('submit','#form-add',function(e){
    e.preventDefault()

    if(isEdit){
      $.ajax({
        method:'PUT',
        url:'/my/cate/info',
        data:$(this).serialize(),
        success(res){
          if(res.code !==0) return layer.msg('修改类别失败')
          layer.msg('修改类别成功')
          initArtCateList()
        }
      })
    }else {
      $.ajax({
        method:'POST',
        url:'/my/cate/add',
        data:$(this).serialize(),
        success(res){
          if(res.code !== 0) return layer.msg('添加类别失败')
         
          layer.msg('添加成功')       
          initArtCateList()
        }
      })
    }

    isEdit = false
    layer.close(indexAdd)
    // initArtCateList()
  })

 
  $('tbody').on('click','.btn-edit',function(){
    isEdit=true
    indexAdd = layer.open({
      type:1,
      area:['500px','270px'],
      title:'修改文章分类',
      content:$('#dialog-add').html()
    })

    let id = $(this).attr('data-id')
    $.ajax({
      method:'GET',
      url:`/my/cate/info?id=${id}`,
      success(res){
       if(res.code !==0) return layer.msg('获取分类详情失败')
        form.val('form-add',res.data)
      }
    })
  })

  $('tbody').on('click','.btn-delete',function(){
    const result = confirm('确定删除吗？')
    let id = $(this).attr('data-id')
    if(result){
      $.ajax({
        method:'DELETE',
        url:`/my/cate/del?id=${id}`,
        success(res){
          if(res.code !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')
          initArtCateList()
        }
      })
    }
  })

})

