<?php 
	$tipo=$_GET['tipo'];

	$conexion = mysqli_connect("localhost","root","","ejemplo") or die("Error " . mysqli_error($conexion));
	
	switch ($tipo) {
		case 'workflow':
			
			$query = "SELECT * FROM usuarios_wf " or die("Error in the consult.." . mysqli_error($conexion)); 
			$resultado = $conexion->query($query);
			$row = mysqli_fetch_array($resultado);
			$respuesta = '{ "rows" : [ ';			
			while($row) {
				$respuesta.= '{ "name" : "'.$row["name"].'"  }'; 
				if ($row = mysqli_fetch_array($resultado)) {$respuesta.= ',';}
		    }  

			$respuesta.="]}";

			break;
		case 'evento':
			
			$query = "SELECT * FROM s_tabla_valor WHERE tde_concepto = 'EVENTOWFGENERICO' "  or die("Error in the consult.." . mysqli_error($conexion)); 
			$resultado = $conexion->query($query);

			$row = mysqli_fetch_array($resultado);
			$respuesta = '{ "rows" : [ ';			
			while($row) {
				$respuesta.= '{ "name" : "'.$row["tde_valor"].'"  }'; 
				if ($row = mysqli_fetch_array($resultado)) {$respuesta.= ',';}
		    }  
		    
		    $respuesta.="]}";

			break;
		
		default:
			$respuesta = '{ "rows" : []} ';	
			break;
	}

	echo $respuesta;
?>