<?php

//VIENE INVIATA UNA MAIL CONTENENTE UN LINK PER LA PAGINA DOVE REIMPOSTARELA PASSWORD

use PHPMailer\PHPMailer\PHPMailer;

header("Content-type:application/json;charset=utf-8");
require("_libreria.php");
require("PHPMailer-master/src/Exception.php");
require("PHPMailer-master/src/PHPMailer.php");
require("PHPMailer-master/src/SMTP.php");

_checkSession("email");

$con = _connection("4b_LuxuryCars");
$email = $_SESSION["email"];

$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';
$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = 'tls';
$mail->Port = 587;
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->SMTPAuth = true;
$mail->Username = "luxurycars.noreolay@gmail.com";
$mail->Password = "LuxuryCars123##LC#_23";
$mail->setFrom("luxurycars.noreolay@gmail.com");
$mail->addAddress($email);

$data=$_REQUEST["dataCar"];
$copriPastiglie=$_REQUEST["copriPastiglie"];
$fari=$_REQUEST["Fari"];
$colore=$_REQUEST["colore"];
$cerchi=$_REQUEST["cerchi"];
$prezzo=$_REQUEST["prezzo"];
$id=$_REQUEST["id"];

$auto=$data["data"][$id]["marca"]." ".$data["data"][$id]["modello"];
$potenza=$data["data"][$id]["potenza"];
$cilindrata=$data["data"][$id]["cilindrata"];
$motore=$data["data"][$id]["tipoMotore"];
$lunghezza=$data["data"][$id]["lunghezza"];
$larghezza=$data["data"][$id]["larghezza"];
$aPr=$data["data"][$id]["annoProduzione"];
$peso=$data["data"][$id]["peso"];

$mail->Subject = 'Preventivo '.$data["data"][$id]["marca"];
$mail->Body = "
    <h1 style='font-size: 28pt'><strong>$auto</strong></h1>
    <p>
    -Potenza: $potenza CV<br>
    -Cilindrata: $cilindrata cm3<br>
    -Motore: $motore<br>
    -Lunghezza: $lunghezza mm<br>
    -Larghezza: $larghezza mm<br>
    -Peso: $peso Kg<br>
    -Anno di produzione: $aPr<br>
    -Colore: $colore<br>
    -Fari: $fari<br>
    -CopriPastiglie: $copriPastiglie<br>
    -Cerchi: $cerchi<br>
    <strong style='font-size: 17pt'> Prezzo: $prezzo €</strong></p>
";
$mail->isHTML(true);
if (!$mail->send()) //INVIO MAIL
    echo "Mailer Error -> " . $mail->ErrorInfo;
else
    echo json_encode(array("ris" => "ok"));
$con->close();
