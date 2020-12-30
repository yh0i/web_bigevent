$(function() {
    let { form } = layui;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须小于六位';
            }
        }
    })

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            }
        })

    }


    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户数据失败')
                }
                layer.msg('更新用户数据成功');
                window.parent.getUserInfo();
            }
        })
    })
})