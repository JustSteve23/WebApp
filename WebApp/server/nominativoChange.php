<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    $con=_connection("4b_LuxuryCars");

    $email=$_SESSION["email"];
    $user=$_REQUEST["nominativo"];
    $sql="UPDATE clienti SET nominativo='$user' WHERE email='$email'";
    $data=_eseguiQuery($con,$sql);

    echo json_encode(array("ris"=>"changed"));

    $con->close();
?>