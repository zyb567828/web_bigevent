$(function () {
    // 调用这个函数获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    // 点击按钮实现退出
    $('#btnLogout').on('click', function () {
        //  提示用户是否退出
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转登录页面
            location.href = 'login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('oo');
        //     // console.log(res);
        //     // 在回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         // 1.强制清空token
        //       localStorage.removeItem('token')
        //         // 2.强制跳转登录页面
               
        //         location.href='//login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 按照需求渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}