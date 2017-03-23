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
                            type: 1,
                            area: ['300px', '200px'],
                            shadeClose: true, //点击遮罩关闭
                            content: '\<\div style="padding:20px;">该商品已加入购物车\<\/div>'
                        });
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
});
loadimg();
setTimeout(function() {
    if($("img[src='../images/loading.jpg']").length != 0) {
        loadimg();
    }
},3000);
function loadimg() {
        $.ajax({
            url: "../php/shop.php",
            type: "POST",
            success: function (data) {
                data = eval(data);
                var imgsrcarr = $("img[src='../images/loading.jpg']");
                for (var k = 0; k < imgsrcarr.length; k++) {
                    //imgsrcarr[k].src = data[k].shop;
                    (function(j){
                        setTimeout(function() {
                            imgsrcarr[j].src = data[j].shop;
                        },2000);
                    })(k)
                }

            },
            error : function() {
                window.open("shop.html");
            }
        });
}

shopnum();
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
