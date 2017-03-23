<?php
    $con = mysqli_connect("localhost","root","mysql","huarun");
    mysqli_query($con,"set names utf8");
    $name = $_POST["name"];
    $password = $_POST["password"];
    $tel = $_POST["tel"];
     $sql = "INSERT INTO user (name,password, tel)"
        . " VALUES ('$name', '$password','$tel')";
     if ($con->query($sql) == TRUE) {
        echo "successfully";
     } else {
        echo "failed" ;
     }
     $con->close();
?>