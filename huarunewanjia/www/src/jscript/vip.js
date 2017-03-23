/**
 * Created by my on 2017/2/7.
 */
cookie();
function cookie() {
    var str = $.cookie("name");
    if (str != undefined) {
        var arr = str.split("=");
        //console.log(arr);
        $("#user").html(arr[1] + " ");
    }
}
$("#vipdt dl dt").css({
    cursor : "pointer"
})
$("#vipdt dl dt").click(function(){
    $(this).siblings().slideToggle();
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

