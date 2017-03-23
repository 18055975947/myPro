<?php
    $con = mysqli_connect("10.31.158.186","root","mysql","huarun");
    mysqli_query($con, "set names 'utf8'");
    $name = $_POST["name"];
    $password = $_POST["password"];
    $sql = "select * from user where name = '$name' and password = '$password'";
    $rest = $con->query($sql);
    $arr = array();
    if($rest->num_rows > 0){
        echo "successfully";
    } else {
        echo "failed";
    }
    $con->close();
?>