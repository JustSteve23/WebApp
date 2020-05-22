<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("cCorrentista");

    $con=_connection("4b_banche");
    $id=$_SESSION["cCorrentista"];
    $sql="SELECT nome FROM correntisti WHERE cCorrentista=$id";
    $user=_eseguiQuery($con,$sql);

    $sql="SELECT filiali.cFiliale as codFiliale,filiali.nome FROM conti,filiali WHERE filiali.cFiliale=conti.cFiliale AND conti.cCorrentista=$id";
    $data=_eseguiQuery($con,$sql);

    $nomeUtente=$user[0]["nome"];
    $data=array("name"=>$nomeUtente,"data"=>$data);
    echo json_encode($data);

    $con->close();
?>