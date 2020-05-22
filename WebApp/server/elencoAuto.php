<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    if (!isset($_REQUEST["id"])){
        http_response_code(400);
        die("patrametro nominativo mancante");
    }

    $con=_connection("4b_LuxuryCars");
    $id=$_REQUEST["id"];

    $sql="SELECT * FROM automobili WHERE id=$id";
    $data=_eseguiQuery($con,$sql);

    echo json_encode(array("nominativo"=>$_SESSION["nominativo"],"data"=>$data));

    $con->close();
?>