// 每次调用get() post() ajax()的时候，会先调用ajaxPrefilter这个函数，在这个函数中我们可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf(/my/) !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //  全局统一挂载complete
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转登录页面
            location.href = '//login.html'
        }
    }
})