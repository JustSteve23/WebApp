<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    $con=_connection("4b_LuxuryCars");

    $email=$_SESSION["email"];
    $sql="SELECT password FROM clienti WHERE email='$email'";
    $data=_eseguiQuery($con,$sql);

    echo json_encode($data);

    $con->close();
?>