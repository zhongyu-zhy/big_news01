$(function(){
  let layer = layui.layer
  let form = layui.form
  let laypage = layui.laypage
  //定义事件过滤器
  template.defaults.imports.dataFormat=function(date){
    const dt = new Date(date)
    let y = dt.getFullYear()
    let m = (dt.getMonth()+1+'').padStart(2,'0')
    let d = (dt.getDate()+'').padStart(2,'0')

    let hh = (dt.getHours()+'').padStart(2,'0')
    let mm = (dt.getMinutes()+'').padStart(2,'0')
    let ss = (dt.getSeconds()+'').padStart(2,'0')

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

  }

  let q = {
    pagenum:1,   //当前页码值
    pagesize:2,  //当前页面显示条数
    cate_id:'',  //当前选择的文章分类
    state:'',    //当前文章所处状态
  }

  //加载文章列表
  loadArtlist()
  function loadArtlist(){
    $.ajax({
      method:'GET',
      url:`/my/article/list?pagenum=${q.pagenum}&pagesize=${q.pagesize}&cate_id=${q.cate_id}&state=${q.state}`,
      data:q,
      success(res){
        if(res.code !== 0) return layer.msg('获取文章列表失败')
        const str = template('tpl-table',res)
        $('tbody').empty().append(str)
        renderPage(res.total)
      }

    })
  }

  //初始化文章分类
  function initArtCateList(){
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success(res){
        console.log(res)
        if(res.code !== 0) return layer.msg('获取分类失败')
        // layer.msg('获取分类成功')
        const html = template('tpl-cate',res)
        $('[name=cate_id]').html(html)
        //通过layui重新渲染
        form.render()
      }
    })
  }
  initArtCateList()

  //为筛选表单添加submit事件
  $('#form-search').on('submit',function(e){
    e.preventDefault()
    const cate_id = $('[name=cate_id]').val()
    q.cate_id = cate_id
    const state = $('[name=state]').val()
    q.state = state

    loadArtlist()
  })

  function renderPage(total){
    // 调用 laypage.render() 方法来渲染分页的结构
    
     laypage.render({
        elem: 'pageBox', // 分页容器的 Id    
        count: total, // 总数据条数
        limit: q.pagesize, // 每页显示几条数据
        curr: q.pagenum, // 设置默认被选中的分页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        //分页切换触发jump回调
        jump:function(obj,first){
          q.pagenum=obj.curr
          q.pagesize = obj.limit
          //如果直接进行调用会死循环，应该是用户主动切换页码时才会调用
          // loadArtlist()  
          if(!first){
            loadArtlist() 
          }        
        }
      })
     
  }

  $('tbody').on('click','.btn-delete',function(){
    const result = confirm('确认删除吗？')
    let len = $('.btn-delete').length
    let id = $(this).attr('data-id')
    // console.log(id)
    if(result){
      $.ajax({
        method:'DELETE',
        url:`/my/article/info?id=${id}`,
        success(res){
          if(res.code !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')

          if(len === 1){
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }

          loadArtlist()
        }
      })
    }
  })


})