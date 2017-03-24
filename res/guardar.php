<?php 
	$method = $_SERVER['REQUEST_METHOD'];
	$input = json_decode(file_get_contents('php://input'),true);
	//$id = $input['id'];
	$id = isset($_POST['id']) && is_numeric($_POST['id'])?$_POST['id']:-1;
	//$name = $input['name'];
	$name = isset($_POST['name'])?$_POST['name']:'';
	$type = isset($_POST['type'])?$_POST['type']:'';
	//$flowchart = json_encode($input['flowchart']);
	$flowchart = json_encode(isset($_POST['flowchart'])?$_POST['flowchart']:"");
	//$flowchart = json_encode($input['steps']);
	$steps = json_encode(isset($_POST['steps'])?$_POST['steps']:"");
	
	//var_dump($_POST);
	
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$query = "SELECT * FROM usuarios_wf where row_id = ".$id or die("Error in the consult.." . mysqli_error($conexion)); 
	$resultado = $conexion->query($query);
	if($row = mysqli_fetch_array($resultado)) { 
		
		if ($name=='') {$name=$row['name'];}
		if ($flowchart=='""') {$flowchart=$row['flowchart'];}
		if ($steps=='""') {$steps=$row['steps'];}
		if ($type=='') {$type=$row['tipo'];}
	
		$query = "update usuarios_wf set name = '".$name."' , tipo = '".$type."' , flowchart = '".$flowchart."' , steps = '".$steps."' where row_id = ".$id 
		or die("Error in the consult.." . mysqli_error($conexion)); 
		
    } else {
		 
		$query = "insert into usuarios_wf values (NULL,'".$name."','usuario',NOW(),'".$flowchart."','".$steps."') " 
		or die("Error in the consult.." . mysqli_error($conexion)); 
	}
	 
	$resultado = $conexion->query($query);
	echo '{"response" : "ok"}';
?>