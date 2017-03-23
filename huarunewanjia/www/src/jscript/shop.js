/**
 * Created by my on 2017/2/4.
 */
load();
function load() {
    $.ajax({
        url : "../php/shop.php",
        type : "POST",
        success : function(data) {
            data = eval(data);
            //console.log(data);
            for (var i = 0; i < data.length ;i++) {
                //(function(i){
                    $img = $("<img class='img' src='../images/loading.jpg'>");
                    //$img.attr("src","../images/loading.jpg");
                    var src = data[i].shop;
                    //setTimeout(($img.attr("src",src)),2000);
                    $img.css({
                        display : "block",
                        width : "220px",
                        height : "220px",
                        borderBottom : "1px solid #ededed"
                    });
                    $("#box").append($("<div style='width: 220px;height: 340px;background: #fff;margin-bottom: 15px'>")
                        .append($img).append($("<p style='padding:10px 20px;color: #000;margin-bottom: 20px; '>").html(data[i].shuxing))
                        .append($("<span style='color: #e14041;margin-left: 20px'>").html(data[i].danjia))
                        .append($("<input type='button' class='addshopcar' value='加入购物车' style='border:1px solid #ededed;margin-left:40px;background: #f2f2f2;color: #333333;padding: 7px 11px'>"))
                        .append($("<div style='display: none' id='zl'>").html(data[i].zhongliang))
                        .append($("<div style='display: none' id='mon'>").html(data[i].money))
                        .append($("<div style='display: none' id='sl'>").html(data[i].shuliang))
                    );
                    //setTimeout(console.log(data[i].shop),2000);
                //})(i);
                /*setTimeout(function() {
                    for (var j = 0; j < data.length ;j++){
                        $img.attr("src",data[j].shop);
                    }
                },2000);*/

            }
           /* setTimeout(function() {
                console.log("aa");
            },2000);*/
            /*setTimeout(function() {
                for (var j = 0; j < data.length ;j++){
                    $img.attr("src",data[j].shop);
                }
            },2000);*/

            $(".addshopcar").click(function() {
                var $this = $(this).parent();
                $.ajax({
                    url : "../php/addcar.php",
                    type : "POST",
                    data : "shop=" + $this.children("img")[0].src + "&shuxing=" + $this.children("p").html()
                        + "&danjia=" + $this.children("span").html() + "&zhonglinag=" + $this.children("div[id=zl]").html()
                        + "&money=" + $this.children("div[id=mon]").html() + "&shuliang=" + $this.children("div[id=sl]").html()
                    ,
                    success : function (data) {
                        layer.open({
                            title : "购物车",
                            skin: 'demo-class',
                            type: 0,
                            area: ['300px', '200px'],
                            shadeClose: true, //点击遮罩关闭
                            content: '\<\div style="padding:20px;">该商品已加入购物车\<\/div>'
                        });
                        shopnum();
                        console.log(data);
                    }
                });
            });
        }
    });
}
$("#load").click(function() {
    load();
    loadimg();
    itnterval();
});
loadimg();
setTimeout(function() {
    if($("img[src='../images/loading.jpg']").length != 0) {
        loadimg();
    }
},3000);
itnterval();
function itnterval() {
    var timer = setInterval(function() {
        console.log("aa");
        console.log($("img[src='../images/loading.jpg']").length);
        if($("img[src='../images/loading.jpg']").length != 0) {
            loadimg();
        }
        if ($("img[src='../images/loading.jpg']").length == 0) {
            clearInterval(timer);
        }
    },4000);
}

function loadimg() {
    //setTimeout(function() {
        $.ajax({
            url: "../php/shop.php",
            type: "POST",
            success: function (data) {
                data = eval(data);
                //console.log(data[0]);
                //console.log($("img[src='../images/loading.jpg']"));
                var imgsrcarr = $("img[src='../images/loading.jpg']");
                console.log(imgsrcarr);

                /*setTimeout(function() {
                    if($("img[src='../images/loading.jpg']").length != 0) {
                        window.open("shop.html","_parent");
                    }
                },3000);*/
                for (var k = 0; k < imgsrcarr.length; k++) {
                    //imgsrcarr[k].src = data[k].shop;
                    (function(j){
                        setTimeout(function() {
                            imgsrcarr[j].src = data[j].shop;
                        },2000);
                    })(k)
                }
                /*for (var j = 0; j < data.length; j++) {
                    (function(j) {
                        setTimeout(function() {
                            var srcs = data[j].shop;
                            //console.log(data[j]);
                            //console.log($("img[src='../images/loading.jpg']"));
                            //console.log(j);
                            //console.log(srcs);
                            //console.log($("img[src='../images/loading.jpg']")[j]);
                            $(".img")[j].src = srcs;
                            //$("img[src='../images/loading.jpg']")[j].src = srcs;
                        },2000);
                    })(j)

                }*/
            },
            error : function() {
                window.open("shop.html");
            }
        });
    //},2000);
}
shopnum();
function shopnum() {
    $.ajax({
        url : "../php/shopnum.php",
        type : "POST",
        success : function(data) {
            //console.log(data);
            data = eval(data);
            $("#shops").html(data.length);
        }
    });
}

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
