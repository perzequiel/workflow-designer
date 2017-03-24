<?php 
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$tamanioPorPagina = $_GET['size'];
	$saltar = $_GET['size']*($_GET['pagina']-1);
 
	$query = "SELECT * FROM s_eventos_disparador_wf limit ".$saltar.",".$tamanioPorPagina." ;" or die("Error in the consult.." . mysqli_error($conexion)); 
    
	$resultado = $conexion->query($query);
	
	$ultimo=0;
	$row = mysqli_fetch_array($resultado);
	$respuesta = '{ "rows" : [ ';
	while($row) { 
		$respuesta.= '{ "id" : "'.$row["row_id"].'" , "evento" : "'.$row["eve_evento_nombre"].'" , "workflow" : "'.$row["eve_workflow_nombre"].'" }'; 
		$ultimo = $row["row_id"];
	   if ($row = mysqli_fetch_array($resultado)){
		   $ultimo = $row["row_id"];
			$respuesta.= ',';
	   }
     }  
	$respuesta.= '],';
	$respuesta.= ' "ultimo" : "'.$ultimo.'"}';
	echo $respuesta;
?>