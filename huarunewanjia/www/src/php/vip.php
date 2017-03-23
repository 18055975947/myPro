<?php
    $con = mysqli_connect("10.31.158.186","root","mysql","huarun");
    mysqli_query($con, "set names 'utf8'");
    $name = $_POST["name"];
    $relname = $_POST["relname"];
    $bir = $_POST["bir"];
    $sex = $_POST["sex"];
    $sql = "INSERT INTO vip (name,relname,bir,sex) VALUES ('$name', '$relname','$bir' ,'$sex')";
    if ($con->query($sql) == TRUE) {
        echo "successfully";
    } else {
        echo "INSERT attempt failed" ;
    }
    $con->close();
?>