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

        $con=_connection("4b_LuxuryCars");
        $user=$con->real_escape_string($_REQUEST["email"]);
        $pw=$con->real_escape_string($_REQUEST["password"]);

        $sql="SELECT * FROM clienti WHERE email='$user'";
        $data=_eseguiQuery($con,$sql);
        if (count($data)==0){
            http_response_code(401);
            die("username non valido");
        }
        else if ($data[0]["password"]!=$pw){
            http_response_code(401);
            die("password non valida");
        }
        else{
            session_start();
            $_SESSION["email"]=$data[0]["email"];
            $_SESSION["nominativo"]=$data[0]["nominativo"];
            $_SESSION["scadenza"]=time()+SCADENZA;
            setcookie(session_name(),session_id(),time()+SCADENZA,"/");
            echo json_encode(array("ris"=>"ok"));
        }
        $con->close();
    }
?>