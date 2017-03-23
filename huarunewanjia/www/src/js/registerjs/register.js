/**
 * Created by my on 2017/1/18.
 */
$("#login").css({
    cursor : "pointer"
})
$("#login").click(function() {
    $.removeCookie("name",{ expires: 7, path: '/' });
    open("http://localhost/huarun/www/src/html/login.html","_parent");
});
var comm = {
    regExp : {
        email : function(str) {
            return /^\w+@\w+(\.\w+)+$/.test(str);
        },
        mobile : function(str) {
            return /^1[3456789]\d{9}$/.test(str);
        },
        account : function(str) {
            return /^\w+$/.test(str);
        },
        pwd : function(str) {
            return /^.{6,20}$/.test(str);
        },
        realName : function(str) {
            return /^[\u4e00-\u9fa5]*$/.test(str);
        }
    }
}
$.ajax({
    type: "GET",
    url: "../php/registerphp/yanzheng.php",
    success: function (data) {
        /*console.log(data);
        console.log(eval(data));*/
        var data = eval(data);
        var length = data.length;
        var str = "";
        for (var i = 0; i < 4; i++) {
            str += data[parseInt(Math.random() * length)];
        }
        $("#inp5").val(str);
        $("#flushCode").click(function() {
            remain();
        });
        $("#inp5").click(function() {
            remain();
        });
        $("#yanzheng").change(function() {
            if ($(this).val() != $("#inp5").val()) {
                $(this).val("");
                layer.open({
                    title : "注册信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">请输入正确的验证码！\<\/div>'
                });
                remain();
            }
        });
        function remain() {
            var str = "";
            for (var i = 0; i < 4; i++) {
                str += data[parseInt(Math.random() * length)];
            }
            $("#inp5").val(str);
        }
        //console.log(str);
    }
})
/*$.ajax({
    type : "POST",
    url : "../php/registerphp/userku.php",

});*/
$.ajax({
    type: "GET",
    url: "../php/registerphp/userku.php",
    success: function (data) {
        console.log(data);
        var data = eval(data);
        var str = "";
        $("#text").change(function() {
            //console.log(data[0].name);
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == $("#text").val()){
                    $("#text").val("");
                    layer.open({
                        title : "注册信息",
                        type: 0,
                        area: ['300px', '200px'],
                        shadeClose: true, //点击遮罩关闭
                        content: '\<\div style="padding:20px;">您填写的用户名已被注册！\<\/div>'
                    });
                    return;
                }
            }
            //console.log("a");
            str += $("#text").val();
        });
        $("#phone").change(function() {
            if (!comm.regExp.mobile(this.value)) {
                $(this).val("");
                layer.open({
                    title : "注册信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">请填写正确的手机号码！\<\/div>'
                });
                return;
            }
            str += "=" + $("#phone").val();
        });
        $("#password").change(function() {
            if (!comm.regExp.pwd(this.value)) {
                $(this).val("");
                layer.open({
                    title : "注册信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">请填写合格的密码！\<\/div>'
                });
                return;
            }
            str += "=" + $("#password").val();
        });
        $("#remainpass").change(function() {
            if (this.value != $("#password").val()) {
                $(this).val("");
                layer.open({
                    title : "注册信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">两次密码请一致！\<\/div>'
                });
               alert("两次密码请输入一致！！！");
            }
        });
        $("#check").click(function() {
            $("#success").toggleClass("addclass");
        });
        $("#success").click(function () {
            if ($("#success").hasClass("addclass") && comm.regExp.mobile($("#phone").val()) && comm.regExp.pwd($("#password").val()) && ($("#password").val() == $("#remainpass").val()) ){
                $.cookie("name",str);
                var name = $("#text").val();
                var password = $("#password").val();
                var tel = $("#phone").val();
                var cookievalue = $("#password").val() + "=" + $("#text").val();
                $.ajax({
                    url : "../php/registerphp/success.php",
                    type : "POST",
                    data : "name=" + name + "&password=" + password + "&tel=" + tel,
                    success : function(data) {
                        if (data == "successfully") {
                            layer.open({
                                title : "注册信息",
                                type: 0,
                                area: ['300px', '200px'],
                                shadeClose: true, //点击遮罩关闭
                                content: '\<\div style="padding:20px;">恭喜您注册成功！\<\/div>',
                                btn: ['确定']
                                ,yes: function(index, layero){
                                    //按钮【按钮一】的回调
                                    $.cookie("name",cookievalue,{ expires: 7, path: '/' });
                                    open("success.html","_parent");
                                }
                            });
                            //open("../index.html","_parent");
                        }
                        if (data == "failed") {
                            layer.open({
                                title : "注册信息",
                                type: 0,
                                area: ['300px', '200px'],
                                shadeClose: true, //点击遮罩关闭
                                content: '\<\div style="padding:20px;">抱歉，您注册失败请重试！\<\/div>'
                            });
                            open("register.html","_parent");
                        }
                    }
                });
                //console.log($.cookie("name"));
            } else {
                layer.open({
                    title : "注册信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">请填写完整的注册信息！\<\/div>'
                });
                $("#check").prop("checked",false);
                $("#success").removeClass("addclass");
            }

        });
    }
});
