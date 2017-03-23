/**
 * Created by my on 2017/2/3.
 */


$.ajax({
    type : "POST",
    url : "../php/shopcar.php",
    success : function(data) {
        //console.log(data);
        var data = eval(data);
        //console.log(data);
        for (var i = 0; i < data.length ; i++) {
            $tr = $("<tr>");
            $tr.addClass("class","tr shoptr");
            $tr.css({
                background: "#fff",
                width: "100%"
            });
            //var td = document.createElement("td");
            var imgsrc = data[i].shop;
            var shuxing = data[i].shuxing;
            $img = $("<img class='img'>");
            $img.attr("src","../images/loading.jpg");
            //setTimeout($img.attr("src",data[i].shop),2000);

            //$img = $("<img src='../images/shop1.jpg'>");
            $img.css({
                //src : data[i].shop,
                width : "100px",
                height : "100px"

            });
            shuxing = shuxing.split("*");
            var input1 = $("<input type='button' value='-' class='jian button' >");
            var input2 = $("<input type='text' class='text' value='1' style='text-align: center'>");
            var input3 = $("<input type='button' value='+' class='jia button' >");
            $tr.append($("<td>").append($("<input type='checkbox' class='check'>")))
                .append($("<td class='' style='position: relative'>").append($("<div class='imgtd'>").append($img)))
                .append($("<td>").html(shuxing[0]).append($("<span class='trsp'>").html(shuxing[1])))
                .append($("<td class='danjia'>").html(data[i].danjia))
                .append($("<td>").append($("<span class='trspw'>").html(data[i].zhongliang)))
                .append($("<td>").append(input1).append(input2).append(input3))
                .append($("<td>").append($("<span class='allmoney'>").html("￥" + data[i].money)))
                .append($("<td>").append($("<input type='button' value='删除' class='del'>")))
            $("#table").append($tr);


        }
        $(".del").click(function() {
            $(this).parent().parent().remove();
            console.log($(this).parent().siblings()[1].children[0].children[0].src);
            var src = $(this).parent().siblings()[1].children[0].children[0].src;
            $.ajax({
                url : "../php/delcar.php",
                type : "POST",
                data : "src=" + src,
                success : function (data) {
                    layer.open({
                        title : "购物车",
                        skin: 'demo-class',
                        type: 0,
                        area: ['300px', '200px'],
                        shadeClose: true, //点击遮罩关闭
                        content: '\<\div style="padding:20px;">该商品已购物车移除\<\/div>'
                    });
                    console.log(data);
                }
            });
        });
        $(".imgtd").css({
            width : "100px",
            height : "100px",
            textAlign : "center",
            marginLeft : "35px"
        })
        $(".jian").click(function(event) {
            var tds = $(this).parent().siblings();
            var sps = tds.children("span");
            var inps = $(this).siblings();
            var value = inps[0].value;
            value = parseInt(value);
            inps[0].value = --value;
            if(inps[0].value < 0) {
                inps[0].value = 0;
            }
            var str = tds[3].innerHTML;
            arr = str.split("￥");
            var num = arr[1] * 10;

            sps[0].innerHTML = (inps[0].value);
            sps[1].innerHTML = inps[0].value * 5 / 10 + "kg";
            sps[2].innerHTML = "￥" + inps[0].value * num / 10;

        });

        $(".jia").click(function() {
            var tds = $(this).parent().siblings();
            var sps = tds.children("span");
            var inps = $(this).siblings();
            var value = inps[1].value;
            value = parseInt(value);
            inps[1].value = ++value;
            var str = tds[3].innerHTML;
            arr = str.split("￥");
            var num = arr[1] * 10;
            sps[0].innerHTML = (inps[1].value);
            sps[1].innerHTML = inps[1].value * 5 / 10 + "kg";
            sps[2].innerHTML = "￥" + inps[1].value * num / 10;

        });
        var flag1 = true;
        $(".check").click(function() {
            var tdarr2 = $(this).parent().nextAll("td");
            var num2 = parseFloat(tdarr2[5].innerText.split("￥")[1]);
            var num3 = parseFloat(tdarr2[3].innerText);
            if(!flag1) {
                $(this).prop("checked",false);
                $(".wight").html("0.00" +  "kg");
                $(".money").html("总计 ：￥" + "0.00")
                $("#allmoney").children("span").html( "￥" + "0.00");
                //(parseFloat($("#allmoney").children("span").html().split("￥")[1]) + num2)
                flag1 = true;
                return;
            }
            //console.log(tdarr2[3].innerText);
            $(".wight").html(num3 +  "kg");
            $(".money").html("总计 ：￥" + num2)
            $("#allmoney").children("span").html( "￥" + (num2 + parseFloat($("#allmoney").children("span").html().split("￥")[1])));
            flag1 = false;
        });

        var flag = true;
        $(".all").click(function() {
            if(!flag) {
                $("input[type=checkbox]").prop("checked",false);
                $(".wight").html("0.00" +  "kg");
                $("#allmoney").children("span").html( "￥" + "0.00");
                $(".money").html("总计 ：￥" + "0.00");
                flag = true;
                return;
            }
            $("input[type=checkbox]").prop("checked",true);
            var moneyarr = $("table tr td span[class=allmoney]");
            var sum = 0;
            for (var i = 0; i < moneyarr.length; i++) {
                var arr5 = moneyarr[i].innerHTML.split("￥");
                var num = parseFloat(arr5[1]);
                sum += num;
            }
            var wightarr = $("table tr td span[class=trspw]");
            var sum1 = 0;
            for (var j = 0; j < wightarr.length; j++) {
                sum1 += parseFloat(wightarr[j].innerHTML);
            }
            console.log(sum1);
            $(".wight").html(sum1 +  "kg");
            $(".money").html("总计 ：￥" + sum)
            $("#allmoney").children("span").html( "￥" + sum);
            flag = false;
        });

        $(".imgtd").mouseenter(function() {
            $(this).append($("<div id='tuo' style='width: 50px; height: 50px;background: #000;position: absolute;opacity: .4;' ></div>"));
            $(this).parent().append($("<div id='glass' style='position: absolute;width: 200px;height: 200px;background:rgba(255,255,255,0.8);overflow: hidden'>").append($("<img class='glasses' style='width: 400px;height: 400px;position: absolute;top: 0;left: 0;'>")));
          /* $("#tuo").css("display","block");
           $("#glass").css("display","block");*/
        });
        $(".imgtd").mousemove(function() {
            $(this).mousemove(function(event) {
                var left = event.clientX - $("#tuo")[0].offsetWidth / 2 ;
                var top =  event.clientY - $("#tuo")[0].offsetHeight / 2;
                //console.log(-$("#tuo")[0].offsetWidth + $(this)[0].offsetWidth + $(this).offset().left);
                left = Math.min(Math.max(left,$(this).offset().left),-$("#tuo")[0].offsetWidth + $(this)[0].offsetWidth + $(this).offset().left);
                top = Math.min(Math.max(top,$(this).offset().top),-$("#tuo")[0].offsetHeight + $(this)[0].offsetHeight + $(this).offset().top);
                var leftTuo = event.clientX - $(this).parent()[0].offsetLeft - $("#tuo")[0].offsetWidth /2;
                var topTuo = event.clientY - $(this).parent()[0].offsetTop - $("#tuo")[0].offsetHeight /2;
                leftTuo = Math.min(Math.max(leftTuo,this.offsetLeft),85);
                topTuo = Math.min(Math.max(topTuo,this.offsetTop),50);
                $("#tuo").css({
                    left : leftTuo,
                    top : topTuo
                });

                var src = $(this).children("img")[0].src;
                $("#glass").css({
                    left : "140px",
                    top : "-50px"
                })
                $(".glasses").attr("src",src);
                $(".glasses").css({
                    left : -(left - $(this).offset().left) * 4,
                    top : -(top - $(this).offset().top) * 4
                });
            });


        });
        $(".imgtd").mouseleave(function() {
            $("#tuo").remove();
            $("#glass").children().remove();
            $("#glass").remove();
        });

        $("#pay").on("click",function() {
            if ($("#allmoney").children("span").html() == "￥0.00") {
                layer.open({
                    title : ['结算'],
                    skin: 'demo-class',
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">您还没有选中任何商品\<\/div>'
                });
            } else {
                layer.open({
                    title : '结算',
                    skin: 'demo-class',
                    type: 0,
                    area: ['300px', '200px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">您的总价为 ：' + $("#allmoney").children("span").html() + '\<\/div>'
                });
            }

        });

    }
});
loadimg();
function loadimg() {
    //setTimeout(function() {
    $.ajax({
        url: "../php/shopcar.php",
        type: "POST",
        success: function (data) {
            data = eval(data);
            //console.log(data);
            for (var j = 0; j < data.length; j++) {
                (function(j) {
                    setTimeout(function() {
                        var srcs = data[j].shop;
                        //console.log(j);
                        //console.log(srcs);
                        //console.log($(".img[src='../images/loading.jpg']")[j]);
                        $(".img")[j].src = srcs;
                    },2000);
                })(j)

            }
        }
    });
    //},2000);
}


