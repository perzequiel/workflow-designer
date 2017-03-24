<?php 
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$tamanioPorPagina = $_GET['size'];
	$saltar = $_GET['size']*($_GET['pagina']-1);
 
	$query = "SELECT * FROM usuarios_wf limit ".$saltar.",".$tamanioPorPagina." ;" or die("Error in the consult.." . mysqli_error($conexion)); 
    
	$resultado = $conexion->query($query);
	
	$row = mysqli_fetch_array($resultado);
	$respuesta = '{ "rows" : [ ';
	while($row) { 
		$respuesta.= '{ "id" : "'.$row["row_id"].'" , "name" : "'.$row["name"].'" , "tipo" : "'.$row["tipo"].'" , "fecha_creacion" : "'.$row["fecha_creacion"].'" }'; 
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