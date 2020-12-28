$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            // console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                    return;
                }
                layer.msg('注册成功,请登录');
                $('#link_login').click();
            }
        })
    })

    // 登录页面
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('登录失败');
                    return
                }
                layer.msg('登陆成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})