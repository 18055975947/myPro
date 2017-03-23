/**
 * Created by my on 2017/2/3.
 */
$(".addcar").css({
    position : "absolute",
    top : "361px",
    left : "174px",
    width : "100px",
    height : "40px",
    borderRadius : "20px",
    background : "#e14041",
    cursor : "pointer",
    textAlign : "center",
    lineHeight : "40px",
    color : "#fff"
});
//console.log($.cookie());
$(".addcar").click(function() {
    var str = $.cookie("name");
    //console.log(str);
    if (str == undefined) {
        layer.open({
            title : "购物信息",
            type: 0,
            area: ['300px', '200px'],
            shadeClose: true, //点击遮罩关闭
            content: '\<\div style="padding:20px;">请先登录在购物！\<\/div>',
            btn: ['确定', '取消']
            ,yes: function(index, layero){
                //按钮【按钮一】的回调
                open("html/login.html","_parent");
            },btn2: function(index, layero){
                //按钮【按钮二】的回调
            },
            btnAlign: 'c'
        });

    } else {
        //console.log($(this).parent().parent().children("img")[0].src);  //shop
        //console.log($(this).siblings("p").html());  //shuxing
        //console.log($(this).siblings("span[class=tsp1]").html());  //danjia
        var shop = $(this).parent().parent().children("img")[0].src;
        var shuxing = $(this).siblings("p").html();
        var danjia = $(this).siblings("span[class=tsp1]").html();
        var zhonglinag = "10kg";
        var money = $(this).siblings("span[class=tsp1]").html().split("￥")[1];
        var shuliang = "1";
        console.log(money);
        $.ajax({
            url : "php/addcar.php",
            type : "POST",
            data :"shop=" + shop + "&shuxing=" + shuxing + "&danjia=" + danjia + "&zhonglinag=" + zhonglinag + "&money=" + money + "&shuliang=" +shuliang,
            success : function(data) {
                //console.log(data);
                layer.open({
                    title : "购物信息",
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">此商品已加入购物车！\<\/div>'
                });
                shopnum();
            }
        });
    }
});

$("#shopnum").click(function(){
    var str2 = $.cookie("name");
    if (str2 == undefined) {
        layer.open({
            title: "购物信息",
            type: 0,
            area: ['300px', '200px'],
            shadeClose: true, //点击遮罩关闭
            content: '\<\div style="padding:20px;">请先登录在购物！\<\/div>',
            btn: ['确定', '取消']
            , yes: function (index, layero) {
                //按钮【按钮一】的回调
                open("html/login.html", "_parent");
            }, btn2: function (index, layero) {
                //按钮【按钮二】的回调
            },
            btnAlign: 'c'
        });
    } else {
        open("html/shopcar.html","_parent");
    }
});

$("#shopul").children().mouseenter(function() {
    $("#caidan").css("display","block");
    var index = $(this).index();
    $.get("php/index.php",function(data) {
        var data = eval(data);
        var html = data[index].neirong;
        var trhtml = data[index].kind;
        var tdhtml = data[index].neirong;
        var trarr = trhtml.split("=");
        var tdarr = tdhtml.split("=");
        $("#caidan").html("");
        for (var i = 0; i < trarr.length; i++) {
            var div = document.createElement("div");
            div.innerHTML = trarr[i] + " : " + tdarr[i];
            $("#caidan").append(div);
            div.style.position = "relative";
            div.setAttribute("class","shopdiv");
            div.style.top = "30px";
            div.style.left = "80px";
            div.style.margin = "20px";
        }
    })
});
$("#caidan").css({
    left : 304
 });
console.log($("#caidan").offset().left);
$("#caidan").mouseover(function() {
    //console.log("ll");
    $("#caidan").css({
        display  : "block",
});
});
$("#shopul").children().mouseleave(function() {
    //$("#caidan").css("display","none");
    //$("#caidan").html("");
});
$("#caidan").mouseleave(function() {
    $("#caidan").css("display","none");
    $("#caidan").html("");

});
$("#LoutiNav ul li").not(".last").hover(function() {
    //鼠标滑上去
    $(this).addClass("hover");
}, function() {
    //鼠标移开
    $(this).removeClass("hover");
});
//鼠标点击
var mark = 1;
$("#LoutiNav ul li").not(".last").click(function() {
    mark = 2; //改变标记
    $("#LoutiNav ul li").find("span").removeClass("active");
    $(this).find("span").addClass("active");
    //点击左边导航 然后跳到指定的楼层
    var $index = $(this).index(); //找到了对应的序列号
    //alert($index);
    var $top = $(".Louti").eq($index).offset().top; //获取制定Louti与浏览器上面的距离
    //alert($top);
    $("body,html").animate({
        scrollTop: $top
    }, 500, function() {
        mark = 1;
    }); //浏览器滚动的高度
});
//浏览器串口滚动事件
$(window).scroll(function() {
    if (mark == 1) {
        var $t = $(this).scrollTop(); //获取滚动条滚动的高度
        //document.title = $t;
        if ($t > 700) { //通过滚动条来判断
            $("#LoutiNav").fadeIn(); //淡入 导航慢慢显示出来
        } else {
            $("#LoutiNav").fadeOut(); //淡出 导航慢慢消失
        }
        var $obj = $(".Louti");
        //循环每一个Louti 然后找到最先满足条件的那个 Louti
        $obj.each(function() {
            var $index = $(this).index();
            //console.log($(this));
            //楼层与浏览器上面的高度
            var $height = $obj.eq($index).offset().top + $(this).height() / 2;
            //alert($height)
            if ($t < $height) {
                $("#LoutiNav ul li").find("span").removeClass("active");
                $("#LoutiNav ul li").eq($index).find("span").addClass("active");
                return false;
            }
        });
    }
});
//点击 Top按钮 跳转到浏览器顶部
$("#LoutiNav ul li.last").click(function() {
    $("body,html").animate({
        scrollTop: 0
    }, 3000, function() {
        mark = 1;
    });
});
var str = $.cookie("name");
//console.log(str);
if (str != undefined) {
    var arr = str.split("=");
    //console.log(arr);
    $("#user").html(arr[1] + " ");
    shopnum();
    //console.log(arr[1]);
        //console.log(arr);

}
$("#login").click(function() {
    $.removeCookie("name",{ expires: 7, path: '/' });

});

function shopnum() {
    $.ajax({
        url : "php/shopnum.php",
        type : "POST",
        success : function(data) {
            //console.log(data);
            data = eval(data);
            $("#shops").html(data.length);
        }
    });
}
//console.log($("#main").children("img"));
$(".col-md-3").children("img").click(function() {
   open("html/shop.html","_parent");
});
$("ul li img").click(function() {
    open("html/shop.html","_parent");
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
        url : "php/search.php",
        type : "POST",
        success : function(data) {
            var data = eval(data);
            for (var i = 0; i < data.length; i++) {
                if (value == data[i].shuxing) {
                    open("html/shop.html","_parent");
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
/*
oSearch.onkeyup = function(){
    var value = this.value;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + value + "&json=1&cb=search";
    document.body.appendChild(script);
}*/

//console.log($.cookie());
//var name = "ls";
//$.cookie("name","ad");
