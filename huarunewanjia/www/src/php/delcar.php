<?php
    $con = mysqli_connect("localhost","root","mysql","huarun");
    mysqli_query($con, "set names 'utf8'");
    $src = $_POST["src"];
    $sql = "DELETE FROM shopmess where shop='$src';";
    if ($con->query($sql) == TRUE) {
        echo "delete successfully.";
    } else {
        echo "delete  failed" ;
    }
    $con->close();
?>