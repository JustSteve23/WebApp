<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    $con=_connection("4b_LuxuryCars");

    $email=$_SESSION["email"];
    $sql="SELECT a.id,a.marca,a.modello,a.potenza,a.cilindrata,a.prezzo FROM preferiti AS p,automobili AS a WHERE p.email='$email' AND p.idAuto=a.id";
    $data=_eseguiQuery($con,$sql);

    echo json_encode($data);

    $con->close();
?>