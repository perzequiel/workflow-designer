<?php 
	$method = $_SERVER['REQUEST_METHOD'];
	$input = json_decode(file_get_contents('php://input'),true);
	
	$id = isset($_POST['id']) && is_numeric($_POST['id'])?$_POST['id']:-1;
	$evento = isset($_POST['evento'])?$_POST['evento']:"";
	$workflow = isset($_POST['workflow'])?$_POST['workflow']:"";
	
	var_dump($_POST);
	
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$query = "SELECT * FROM s_eventos_disparador_wf where row_id = ".$id or die("Error in the consult.." . mysqli_error($conexion)); 
	$resultado = $conexion->query($query);
	if($row = mysqli_fetch_array($resultado)) { 
		
		if ($evento=='') {$evento=$row['evento'];}
		if ($workflow=='') {$workflow=$row['workflow'];}
	
		$query = "update s_eventos_disparador_wf set eve_evento_nombre = '".$evento."' , eve_workflow_nombre = '".$workflow."' where row_id = ".$id 
		or die("Error in the consult.." . mysqli_error($conexion)); 
		
    } else {
		 
		$query = "insert into s_eventos_disparador_wf values (NULL,'".$evento."','".$workflow."') " 
		or die("Error in the consult.." . mysqli_error($conexion)); 
	}
	 
	$resultado = $conexion->query($query);
	echo '{"response" : "ok"}';
?>