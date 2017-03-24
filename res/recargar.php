<?php 
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$query = "SELECT * FROM usuarios_wf where row_id = ".$_GET['id'] or die("Error in the consult.." . mysqli_error($conexion)); 
    
	$resultado = $conexion->query($query);
	
	if($row = mysqli_fetch_array($resultado)) { 
       echo '{ "response" : "ok", "flow" : '.$row["flowchart"].', "name" : "'.$row["name"].'"}'; 
     } else {
		 
		echo '{ "response" : "empty", "flow" : "" }';
	 }	 
	
?>