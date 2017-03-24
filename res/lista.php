<?php 
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$query = "SELECT * FROM usuarios_wf " or die("Error in the consult.." . mysqli_error($conexion)); 
    
	$resultado = $conexion->query($query);
	
	$row = mysqli_fetch_array($resultado);
	$respuesta = '{ "rows" : [ ';
	while($row) { 
		$respuesta.= '{ "id" : "'.$row["row_id"].'" , "name" : "'.$row["name"].'" }'; 
	   if ($row = mysqli_fetch_array($resultado)){
		   $ultimo = $row["row_id"];
			$respuesta.= ',';
	   }
     }  
	$respuesta.= '],';
	$respuesta.= ' "ultimo" : "'.$ultimo.'"}';
	echo $respuesta;
?>