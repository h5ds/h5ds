/**
 * 登录
*/
import '../sass/pages/pages.scss';

$(function () {

    $('.img-code').on('click', function(){
        $(this).attr('src', '/api/imgCode?t=' + +new Date());
    });
    
    // 获取值
    function getValue() {
        var tel = $('#tel').val();
        var password = $('#password').val();
        var code = $('#imgcode').val();

        // 验证邮箱
        if (!testData(tel, 'mobile')) {
            $.tip({
                msg: '请输入正确的手机！',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        // 验证密码
        if (password === '') {
            $.tip({
                msg: '密码不能为空！',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        if(code === '') {
            $.tip({
                msg: '验证码不能为空',
                type: 'danger',
                time: 3000
            });
            return false;
        }

        return {
            tel: tel,
            code: code,
            password: password
        }
    }

    $('#loginBtn').on('click', function () {
        var data = getValue();
        if (data) {
            $.ajax({
                type: 'post',
                url: '/api/login',
                data: data,
                dataType: "json"
            }).done(function (res) {
                // console.log(res);
                if(res.success) {
                    setStorage('user', res);
                    location.href = '/case';
                }else {
                    $.tip({
                        msg: res.msg,
                        type: 'danger',
                        time: 3000
                    });
                }
            });
        }
    });
});