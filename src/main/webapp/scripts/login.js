/**
 * 页面初始化后，绑定函数。
 */
$(function(){
    //注册
    $("#regist_button").click(function(){
        register();
    });

    //登录
    $("#login").click(function(){
        login();
    });

    //登出
    $("#logout").click(function(){
        logout();
    });

    //修改密码
    $("#changePassword").click(function(){
        changepwd();
    })

});

//验证用户名是否存在
function checkName(e) {
    var name=$(e).val().trim();
    if(name==null||name.length==0){
        $('#regist_username').attr("data-content",'用户名不能为空');
        $('#regist_username').popover('show');
        return;
    }
    $.ajax({
        url: '/user/checkName.do',
        method:'post',
        data:{name:name},
        success: function (data) {
            if (!data) {
                $('#regist_username').attr("data-content",'用户名已存在');
                $('#regist_username').popover('show');
            }
        }
    })
}

//注册
function register() {
    var username=$('#regist_username').val().trim();
    var nickname=$('#nickname').val().trim();
    var password=$('#regist_password').val().trim();
    var finalPassword=$('#final_password').val().trim();
    if(username==null||username.length==0){
        $('#regist_username').attr("data-content",'用户名不能为空');
        $('#regist_username').popover('show');
        return;
    }
    if(nickname==null||nickname.length==0){
        $('#nickname').attr("data-content",'昵称不能为空');
        $('#nickname').popover('show');
        return;
    }
    if(password==null||password.length<6){
        $('#regist_password').attr("data-content",'密码长度不能少于六位');
        $('#regist_password').popover('show');
        return;
    }
    if(finalPassword==null||finalPassword.length==0){
        $('#final_password').attr("data-content",'确认密码不能为空');
        $('#final_password').popover('show');
        return;
    }
    if(finalPassword!=password){
        $('#final_password').attr("data-content",'两次密码不一致！');
        $('#final_password').popover('show');
        return;
    }
    $.ajax({
        url: '/user/reg.do',
        method:'post',
        data: {name: username,nickname:nickname, password: password},
        success: function (data) {
            if (data['success']==true) {
                swal({
                        title: "注册成功!",
                        type: "success",
                        confirmButtonColor: "#6be557",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    },
                    function(){
                        location.href="login.html"
                    });
            } else {
                if (data['name_null']) {
                    $('#regist_username').attr("data-content",'用户名不能为空');
                    $('#regist_username').popover('show');
                }else if (data['nickname_null']) {
                    $('#nickname').attr("data-content",'昵称不能为空');
                    $('#nickname').popover('show');
                }else if (data['password_null']) {
                    $('#regist_password').attr("data-content",'密码不能为空');
                    $('#regist_password').popover('show');
                }else if (data['name_repeat']) {
                    $('#regist_username').attr("data-content",'用户名已存在');
                    $('#regist_username').popover('show');
                }
            }
        }
    })
}

function clearError(e) {
    $(e).popover('hide');
}

//登陆
function login() {
    var name=$('#name').val().trim();
    var password=$('#password').val().trim();
    if(name==null||name.length==0){
        $('#name').attr("data-content",'用户名不能为空');
        $('#name').popover('show');
        return;
    }
    if(password==null||password.length==0){
        $('#password').attr("data-content",'密码不能为空');
        $('#password').popover('show');
        return;
    }
    $.ajax({
        url: '/user/login.do',
        method:'post',
        data: {name: name, password: password},
        success: function (data) {
            if (data['success']==true) {
                var user=data['user'];
                addCookie('userId',user.id);
                addCookie('nickname',user.nickname);
                swal({
                        title: "登录成功!",
                        type: "success",
                        confirmButtonColor: "#6be557",
                        confirmButtonText: "确定",
                        closeOnConfirm: true
                    },
                    function(){
                        location.href="/edit.html";
                    });
            } else {
                if (data['name_null']) {
                    $('#name').attr("data-content",'用户名不能为空');
                    $('#name').popover('show');
                }else if (data['password_null']) {
                    $('#password').attr("data-content",'密码不能为空');
                    $('#password').popover('show');
                }else if (data['name_password_error']) {
                    $('#name').attr("data-content",'用户名或密码错误');
                    $('#name').popover('show');
                }
            }
        }
    })
}

/**
 * 退出登录
 */
function logout(){
    $.ajax({
        url: '/user/logout.do',
        method:'get',
        success: function (data) {
            if (data) {
                delCookie("userId");
                delCookie("nickname");
                location.href="login.html";
            }
        }
    })
}

/**
 * 修改密码
 */
function changepwd(){
    var lastPassword=$('#last_password').val().trim();
    var newPassword=$('#new_password').val().trim();
    var finalPassword=$('#final_password').val().trim();
    if(lastPassword==null||lastPassword.length==0){
        $('#last_password').attr("data-content",'原密码不能为空');
        $('#last_password').popover('show');
        return;
    }
    if(newPassword==null||newPassword.length<6){
        $('#new_password').attr("data-content",'新密码长度不能少于六位');
        $('#new_password').popover('show');
        return;
    }
    if(finalPassword!=newPassword){
        $('#final_password').attr("data-content",'两次密码不一致！');
        $('#final_password').popover('show');
        return;
    }
    var userId=getCookie('userId');
    $.ajax({
        url: '/user/changePassword.do',
        method:'post',
        data: {userId:userId,lastPassword: lastPassword,newPassword:newPassword},
        success: function (data) {
            if (data['success']==true) {
                swal({
                        title: "修改密码成功!",
                        type: "success",
                        confirmButtonColor: "#6be557",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    },
                    function(){
                        logout();
                    });
            } else {
                if (data['authority']==true) {
                    swal({
                            title: "您没有权限，请先登录!",
                            type: "danger",
                            confirmButtonColor: "#e5374e",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        },
                        function(){
                            logout();
                        });
                    /*alert("您没有权限，请先登录!");
                    logout();*/
                }else if(data['last_password_error']==true){
                    $('#last_password').attr("data-content",'原密码错误');
                    $('#last_password').popover('show');
                }
            }
        }
    })
}


