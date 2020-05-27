<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    $con=_connection("4b_LuxuryCars");

    $email=$con->real_escape_string($_SESSION["email"]);
    $user=$con->real_escape_string($_REQUEST["email"]);
    $sql="UPDATE clienti SET email='$user' WHERE email='$email'";
    $data=_eseguiQuery($con,$sql);

    session_unset();
    session_destroy();

    echo json_encode(array("ris"=>"changed"));

    $con->close();
?>