<?php
    session_start();
    if(isset($_SESSION['Logueado'])){
        header("Location: main/index.php");
    }

    require_once "includes/header.php";
    if(isset($_POST['btnLogin'])){
        # Envio solicitud
        $NoEmpleado = $_POST['NoEmpleado'];
        $PasswordEmpleado = $_POST['PasswordEmpleado'];
        $SqlLogin = "SELECT NoEmpleado, NombreEmpleado, ApellidosEmpleado FROM empleados
        WHERE NoEmpleado = '$NoEmpleado' and PasswordEmpleado = '$PasswordEmpleado'";
        require_once "bd/conexion.php";
        $ResultSet = $cn->query($SqlLogin);
        if($ResultSet->num_rows>0){
            $row = $ResultSet->fetch_assoc();
            $_SESSION['Logueado'] = true;
            $_SESSION['NoEmpleado'] = $row['NoEmpleado'];
            $_SESSION['NombreUsuario'] = $row['NombreEmpleado']. " ". $row['ApellidosEmpleado'];
            header("Location: main/index.php");
        } else {
            $ErrorMensaje = "CREDENCIALES NO VALIDAS!!!";
        }  
    }
    require_once "indexforma.php";
    require_once "includes/footer.php";
?>