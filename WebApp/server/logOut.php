<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("email");

    session_unset();
    session_destroy();
?>