<?php

    $con = mysqli_connect("localhost","root","mysql","huarun");
    mysqli_query($con, "set names 'utf8'");
    $shop = $_POST["shop"];
    $shuxing = $_POST["shuxing"];
    $danjia = $_POST["danjia"];
    $zhonglinag = $_POST["zhonglinag"];
    $money = $_POST["money"];
    $shuliang = $_POST["shuliang"];
    $sql = "INSERT INTO shopmess (shop,shuxing, danjia,zhongliang,money,shuliang)
    VALUES ('$shop', '$shuxing','$danjia' ,'$zhonglinag','$money','$shuliang')";
    if ($con->query($sql) == TRUE) {
        echo "shopmess entry saved successfully.";
    } else {
        echo "INSERT attempt failed" ;
    }
    $con->close();
?>


