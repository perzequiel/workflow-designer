<?php 
	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
 
	$query = "SELECT count(*) 'total' FROM usuarios_wf " or die("Error in the consult.." . mysqli_error($conexion)); 
    $tamanioPorPagina = $_GET['size'];
	
	$resultado = $conexion->query($query);
	
	$row = mysqli_fetch_array($resultado);
	if($row) {

		$resto = $row["total"] % $tamanioPorPagina;
		$paginas = (int)($row["total"] / $tamanioPorPagina);
		
		if ($resto>0){
			$paginas++;
		}
    }  
	 
	$respuesta = '{ "paginas" : '.$paginas.' }'; 
	echo $respuesta;
?>