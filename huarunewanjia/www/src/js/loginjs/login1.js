/**
 * Created by my on 2017/2/6.
 */
$("#register").css({
    cursor : "pointer"
})
$("#register").click(function() {
    $.removeCookie("name",{ expires: 7, path: '/' });
    open("http://localhost/huarun/www/src/html/register.html","_parent");
});
var str = $.cookie("name");
//console.log(str);
if (str != undefined) {
    var arr = str.split("=");
    //console.log(arr);
    if(arr[0] != ""  && $("#inp4:checked") && arr[2] == "7") {
        window.open("../index.html","_parent");
        //console.log(arr);
    }
}
showsjax();
function showsjax() {
    $.ajax({
        type: "GET",
        url: "../php/loginphp/yanzheng.php",
        success: function (data1) {
            var data1 = eval(data1);
            var length = data1.length;
            var str = "";
            for (var i = 0; i < 4; i++) {
                str += data1[parseInt(Math.random() * length)];
            }
            $("#inp5").val(str);
        }
    })
}
$("#flushCode").click(function() {
    showsjax();
});
$("#inp5").click(function() {
    showsjax();
});
$("#inp3").change(function() {
   if ($(this).val() != $("#inp5").val()) {
       layer.open({
           title : "验证信息",
           type: 0,
           area: ['300px', '200px'],
           shadeClose: true, //点击遮罩关闭
           content: '\<\div style="padding:20px;">请填写正确的验证信息！\<\/div>'
       });
       $(this).val("");
       showsjax();
   }
});
/*$.ajax({
    type: "GET",
    url: "../php/loginphp/yanzheng.php",
    success: function (data) {
        //console.log(data);
        //console.log(eval(data));
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
        function remain() {
            var str = "";
            for (var i = 0; i < 4; i++) {
                str += data[parseInt(Math.random() * length)];
            }
            $("#inp5").val(str);
        }
    }
});*/
$("#inp4").on("click",function() {
    $("#inp4").toggleClass("active");
});

$("#btn1").click(function() {
    var name = "";
    name += $("#inp2").val();
    name += "=";
    name += $("#inp1").val();
    if($("#inp3").val() == $("#inp5").val()) {
        var names = $("#inp1").val();
        var password = $("#inp2").val();
        $.ajax({
            url : "../php/loginphp/userku.php",
            type : "POST",
            data : "name=" + names + "&password=" + password,
            success : function(data) {
                if (data == "successfully") {
                    $.cookie("name",name, { path: '/' });
                    if($("#inp4").hasClass("active")) {
                        $.cookie("name",name + "=" + 7, { expires: 7, path: '/' });
                    }
                    layer.open({
                        title : "登录信息",
                        type: 0,
                        area: ['300px', '200px'],
                        shadeClose: true, //点击遮罩关闭
                        content: '\<\div style="padding:20px;">恭喜您登录成功！\<\/div>',
                        btn: ['确定']
                        ,yes: function(index, layero){
                            //按钮【按钮一】的回调
                            open("../index.html","_parent");
                        }
                    });

                }
                if (data == "failed") {
                    showsjax();
                    layer.open({
                        title : "登录信息",
                        type: 0,
                        area: ['300px', '200px'],
                        shadeClose: true, //点击遮罩关闭
                        content: '\<\div style="padding:20px;">您用户名或密码有误！\<\/div>'
                    });
                    $("#inp1").val("");
                    $("#inp2").val("");
                    $("#inp3").val("");

                }
            }
        });
    } else {
        layer.open({
            title : "注册信息",
            type: 0,
            area: ['300px', '220px'],
            shadeClose: true, //点击遮罩关闭
            content: '\<\div style="padding:20px;">您用户名或密码有误，或验证码没填写！\<\/div>'
        });
        $("#inp1").val("");
        $("#inp2").val("");
    }
});
//console.log(str);
/*
$.ajax({
    type: "GET",
    url : "../php/loginphp/userku.php",
    success : function(data){
        //console.log(data);
        data = JSON.parse(data);
        //console.log(data[0].name);
        $("#btn1").click(function(){
            var name = "";
            name += $("#inp1").val();
            name += "=";
            name += $("#inp2").val();
            for(var i = 0; i < data.length; i++) {
                if(data[i].name == $("#inp1").val()){
                    var index = i;
                    if(data[index].password == $("#inp2").val()){
                        if ($("#inp3").val() == $("#inp5").val()) {
                            $.cookie("name",name);
                            if($("#inp4").hasClass("active")) {
                                $.cookie("name",name + "=" + 7,{ expires: 7 });
                            }
                            window.open("../index.html","_blank");
                        } else {
                            $("#inp3").val("");
                            showsjax();
                            alert("请输入正确的验证码！！！")
                        }

                    } else {
                        $("#inp3").val("");
                        showsjax();
                        alert("您输入的密码有误！！！");
                        return;
                    }
                    $("#inp3").val("");
                    showsjax();
                    return;
                }
                if(data[i].password == $("#inp2").val()){
                    var index = i;
                    if(data[index].name == $("#inp1").val() ){
                        if($("#inp3").val() == $("#inp5").val()){
                            $.cookie("name",name);
                            if($("#inp4").hasClass("active")) {
                                $.cookie("name",name + "=" + 7,{ expires: 7 });
                            }
                            window.open("../index.html","_blank");
                        } else {
                            $("#inp3").val("");
                            showsjax();
                            alert("请输入正确的验证码！！！")
                        }

                    } else {
                        $("#inp3").val("");
                        showsjax();
                        alert("您输入的用户名有误！！！");
                        return;
                    }
                    $("#inp3").val("");
                    showsjax();
                    return;
                }
                if(data[i].name != $("#inp1").val() && i >= data.length - 1){
                    $("#inp3").val("");
                    showsjax();
                    alert("您输入的用户名不存在！！！");
                }
            }
        })
    }
})
*/
