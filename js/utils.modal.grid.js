var totalRegTablaDisparadorPendiente = -1

function modalMsjAlert(msj){
	$("#modalAlertaMensaje").text(msj);
	$("#modalAlerta").modal();
}

function modalModificarRegistro(id){
	document.getElementById('idGridMod').value = id;
	$("#modalModificarRegistro").modal();
}

function agregarTablaDisparadorPendientes() {
	registro="<tr>"
	registro+="<td>"+(totalRegTablaDisparadorPendiente+2)+"</td>"
	registro+="<td>"+document.getElementById('selectEventoDisparador').children[0].value+"</td>"
	registro+="<td>"+document.getElementById('selectWorkflowDisparador').children[0].value+"</td>"
	registro+="<td><a onclick='eliminarRegDisparadorPendiente("+totalRegTablaDisparadorPendiente+")'>Eliminar</a></td>"
	registro+="</tr>"
	totalRegTablaDisparadorPendiente++;

	document.getElementById('tablaDisparadorPendientesBody').innerHTML+= registro; 
}

function eliminarRegDisparadorPendiente(id) {
	document.getElementById('tablaDisparadorPendientesBody').deleteRow(id);
	totalRegTablaDisparadorPendiente--;
}


function recuperarIdTablaWF(grid) { 
	var list = document.getElementById(grid).children;
	var id = "";

	for (var i = 0; i < list.length; i++) {
    	if (list[i].className.indexOf('active')>-1){
    		id = list[i].children[0].innerHTML;
    	}
	}
	return id
}

function opcionAceptarModificarGridWf(idReg,idNombre,idTipo){
	
	id = document.getElementById(idReg).value;
	nombre = document.getElementById(idNombre).value;
	tipo = document.getElementById(idTipo).value;

	document.getElementById(idNombre).value = '';
	document.getElementById(idTipo).value = '';

	callWSSave(id,nombre,tipo,'','');

	document.getElementById(idReg).value = '';
	location.reload();
}