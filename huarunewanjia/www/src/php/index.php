<?php
    $con = mysqli_connect("10.31.158.186","root","mysql","huarun");
    mysqli_query($con, "set names 'utf8'");
    $sql = "select id,kind,yangshi,neirong from shop";
    $rest = $con->query($sql);
    $arr = array();
    if($rest->num_rows > 0){
        while($row = $rest->fetch_assoc()){
            $arr[] = $row;
        }
    }
    echo json_encode($arr);

?>