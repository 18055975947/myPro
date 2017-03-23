/**
 * Created by my on 2017/2/7.
 */
$("#vipdt dl dt").css({
    cursor : "pointer"
});
$("#vipdt dl dt").click(function(){
    $(this).siblings().slideToggle();
});
$("#mess");
var str = $.cookie("name");
if (str != undefined) {
    var arr = str.split("=");
    $("#user").html(arr[1] + " ");
    $("#sp1").html(arr[1]);
    //$("#sp2").html(arr[1]);
    console.log(arr);
}
$("#date").css({
    position : "absolute",
    top : "770px",
    left : "736px"
});
$("input[id=man]").addClass("check");
$("input[type=radio]").click(function() {
    $("input[type=radio]").removeClass("check");
    $(this).addClass("check");
    console.log($(this).val());
});
$("#baocun").click(function() {
    var name = $("#sp1").html();
    var relname = $("#sp3").val();
    if ($("#sp3").val() == "") {
        relname = "NULL";
    }
    var bir = $("#year").val() + "/" + $("#month").val() + "/" + $("#date").val();
    var sex = $("input[class=check]").val();
    $.ajax({
        url : "../php/vip.php",
        type : "POST",
        data : "name=" + name + "&relname=" + relname + "&bir=" + bir + "&sex=" +sex,
        success : function(data) {
            console.log(data);
            if (data == "successfully") {
                layer.open({
                    title : "保存信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">信息保存成功！\<\/div>',
                    btn: ['确定']
                    ,yes: function(index, layero){
                        //按钮【按钮一】的回调
                        open("../index.html","_parent");
                    }
                });
            }
        }
    });
});
$("#list").css({
    position : "absolute"
});
$("#search").keyup(function() {
    var value = this.value;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + value + "&json=1&cb=search";
    document.body.appendChild(script);
});
$("#search").blur(function() {
    $(".shopli").click(function() {
        console.log($(this));
        $("#search").val($(this).html());
        $("#list").html("");
    });
    //$("#list").html("");
});
function search(data){
    console.log(data);
    if (data.g != undefined) {
        var arr = data.g;
        var html = "";
        for (var i = 0; i < arr.length; i++) {
            //html += "<li >" + arr[i].q + "</li>";
            $("#list").append($("<li class='shopli' style='cursor:pointer;position:relative;z-index:1000;background:#fff;float: none;width: 340px;height: 36px;line-height: 36px;padding: 0 10px;color: red;border-bottom: 1px solid #ddd;' >").html(arr[i].q) );
        }
    } else {
        $("#list").html("");
    }
    $(".shopli").click(function() {
        console.log($(this));
        $("#search").val($(this).html());
    });
    //$("#list").(html);
}

$("#searchshop").click(function() {
    $("#list").html("");
    var value = $("#search").val();
    $.ajax({
        url : "../php/search.php",
        type : "POST",
        success : function(data) {
            var data = eval(data);
            for (var i = 0; i < data.length; i++) {
                if (value == data[i].shuxing) {
                    open("../html/shop.html","_parent");
                    return;
                }
            }
            if (i >= data.length) {
                $("#search").val("");
                layer.msg("本店铺暂无您搜索的商品！！！",{
                    time: 1500 //20s后自动关闭
                });
            }

            //console.log(data);
        }
    });
});
