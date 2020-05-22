<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    if (!isset($_REQUEST["nominativo"])){
        http_response_code(400);
        die("patrametro nominativo  mancante");
    }

    $con=_connection("4b_banche");
    $id=$_SESSION["cCorrentista"];
    $cFiliale=$con->real_escape_string($_REQUEST["cFiliale"]);

    $sql="SELECT cConto FROM conti WHERE cCorrentista=$id AND cFiliale=$cFiliale";
    $data=_eseguiQuery($con,$sql);
    $cConto=$data[0]["cConto"];

    $sql="SELECT * FROM conti WHERE cConto=$cConto";
    $data=_eseguiQuery($con,$sql);

    echo json_encode($data);

    $con->close();
?>