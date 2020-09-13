$(function () {
    // 点击注册账号连接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登陆连接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.veryfy() 函数的自定义校验规则
    form.verify({
        // 自定义pass的自定义规则
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        // 检验两次密码是否一致
        , repass: function (value) {
            //   通过形参拿到的是确认密码框中的内容
            //   还需要拿到密码框的内容
            //   然后进行比较
            //   判断失败则return一个提示消息
            var pass = $('.reg-box [name=password]').val()
            if (pass !== value) {
                return '密码不一致'
            }
        }
    })
    // 监听注册表单事件
    $('#form_reg').on('submit', function (e) {
        // 组织默认提交
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('res.message');
            }
            layer.msg('注册成功,请登录');
            // 模拟点击行为
            $('#link_login').click()
        })
    })

    //    监听登录表单事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }

        })
    })
})