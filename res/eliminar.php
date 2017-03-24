<?php 
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$query = "delete FROM usuarios_wf where row_id = ".$_GET['id'] or die("Error in the consult.." . mysqli_error($conexion)); 
    
	$resultado = $conexion->query($query);
	
?>