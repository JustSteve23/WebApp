<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    if ($_SERVER["REQUEST_METHOD"]=="POST") {
        if (!isset($_REQUEST["email"])) {
            http_response_code(400);
            die("parametro mancante: E-Mail");
        }
        if (!isset($_REQUEST["password"])) {
            http_response_code(400);
            die("parametro mancante: password");
        }
        if (!isset($_REQUEST["nominativo"])) {
            http_response_code(400);
            die("parametro mancante: password");
        }
        if (!isset($_REQUEST["username"])) {
            http_response_code(400);
            die("parametro mancante: password");
        }

        $con=_connection("4b_LuxuryCars");
        $email=$con->real_escape_string($_REQUEST["email"]);
        $pw=$con->real_escape_string($_REQUEST["password"]);
        $nominativo=$con->real_escape_string($_REQUEST["nominativo"]);
        $username=$con->real_escape_string($_REQUEST["username"]);

        $sql="INSERT INTO clienti (username,nominativo,password,email) VALUES('$email','$nominativo','$pw','$email')";
        $data=_eseguiQuery($con,$sql);

        echo json_encode(array("ris"=>"ok"));
        $con->close();
    }
?>