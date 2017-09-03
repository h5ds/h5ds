/**
 * 注册
*/
import '../sass/pages/pages.scss';
// import '../h5ds/unit/tip.js'; //

$(function () {
    
    // 获取值
    function getValue() {
        // var email = $('#email').val();
        var password = $('#password').val();
        var repassword = $('#repassword').val();
        var tel = $('#tel').val();
        var code = $('#imgcode').val();

        // 验证邮箱
        // if (!testData(email, 'email')) {
        //     $.tip({
        //         msg: '邮箱格式错误',
        //         type: 'danger',
        //         time: 3000
        //     });
        //     return false;
        // }
        if(code === '') {
            $.tip({
                msg: '验证码不能为空',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        // 验证密码
        if (!testData(password, 'password') || password.length < 6) {
            $.tip({
                msg: '密码只能是数字，字母，下划线，且长度大于6',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        // 手机号
        let telArr = tel.slice(3, 10).split('');
        telArr = Array.from(new Set(telArr));
        if (!testData(tel, 'mobile') || telArr.length <= 2) {
            $.tip({
                msg: '无效手机号',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        if (password === '' || password !== repassword) {
            $.tip({
                msg: '两次密码不一致',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        return {
            // email: email,
            password: password,
            tel: tel,
            code: code,
            repassword: repassword
        }
    }

    // 注册
    $('#registerBtn').on('click', function () {
        var data = getValue();
        if (data) {
            $.ajax({
                type: 'post',
                url: '/api/register',
                data: data,
                dataType: 'json'
            }).done(function (res) {
                if(res.success) {
                    setStorage('user', res);
                    location.href = '/login';
                } else {
                    $.tip({
                        msg: '该手机号已被注册！',
                        type: 'danger',
                        time: 3000
                    });
                }
                
            });
        }
    });
});