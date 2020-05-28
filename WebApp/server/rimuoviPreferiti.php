<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    $con=_connection("4b_LuxuryCars");

    if(!isset($_REQUEST["id"])){
        http_response_code(400);
        die("parametro mancante: id");
    }

    $email=$_SESSION["email"];
    $id=$_REQUEST["id"];
    $sql="DELETE FROM preferiti WHERE email='$email' AND idAuto=$id";
    $data=_eseguiQuery($con,$sql);

    echo json_encode(array("ris"=>"deleted"));

    $con->close();
?>