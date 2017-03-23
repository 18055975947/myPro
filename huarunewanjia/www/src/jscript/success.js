/**
 * Created by my on 2017/2/7.
 */
$("#goindex").click(function() {
   open("../index.html","_parent");
});
$("#govip").click(function() {
    open("vip.html","_parent");
});
console.log($.cookie("name"));