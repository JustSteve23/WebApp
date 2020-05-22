<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    $con=_connection("4b_LuxuryCars");
    
    $sql="SELECT * FROM automobili";
    $data=_eseguiQuery($con,$sql);

    echo json_encode(array("nominativo"=>$_SESSION["nominativo"],"data"=>$data));

    $con->close();
?>