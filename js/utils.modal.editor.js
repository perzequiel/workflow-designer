
initAssignButtons();

function modalMsjAlert(msj){
	$("#modalAlertaMensaje").text(msj);
	$("#modalAlerta").modal();
}

function modalMsjOk(msj){
	$("#modalAceptarMensaje").text(msj);
	$("#modalAceptar").modal();
}

function opcionMenuWorkflowRecuperar(panel){
	listWF(panel);
    $("#modalRecuperar").modal();
}


function opcionMenuWorkflowGuardar(id){
	if (id==''){
    	$("#modalGuardar").modal();
	}
	else {
		$("#modalGuardarId").modal();	
	}
}

function opcionMenuWorkflowGuardarComo(){	
    $("#modalGuardar").modal();
}

function opcionMenuWorkflowSalir(){
	$("#modalAceptarSalir").modal();
}

function validarMenuNodoInicio(){
	if (beginNodeExist()){
    	modalMsjAlert('No es posible generar mas de un Nodo Inicio.');
	}
}

function opcionMenuNodoConfigurarTareaAuto(){
	var msg ='';
	var count=0; 

	if (countNodeSelected()!=1){
    	modalMsjAlert('Debe seleccionar un Nodo Automatico para configurar las tareas.');
	}
	else {
		node = getNodesSelected()[0];

		if (node.details.class.indexOf('task-auto')>-1){
			
			count++;
			//msg+= '<label for="renameNode">Nodo '+count+' :&nbsp;</label>';
			//msg+= '<input size="30" type="text" name="renameNode" id="rename-'+node.details.id+'" value="'+node.details.title.value+'"><br>'
		
			msg='<h4>'+node.details.title.value+'</h4>';

			document.getElementById('modalConfigurarAutomaticaNodoMensaje').innerHTML = msg;
	    	$("#modalConfigurarAutomaticaNodo").modal();
		}
		else {
    		modalMsjAlert('Debe seleccionar un Nodo Automatico para configurar las tareas.');
		}
	}
}

function configurarTareaAutoOpcionCombo(opcion){
	var form = '';
	
	if (opcion!='[Seleccionar]'){
		switch(opcion) {
			case 'MAIL':
				form = '';
				break;
			case 'SMS':
				form = '';
				break;
			case 'VALIDACION':
				form = '';
				break;
			default:
				form = '';
		}
	}
	
	document.getElementById('modalConfigurarAutomaticaOpcionComboMensaje').innerHTML = form;
}

function opcionMenuNodoRenombrar(){
	var msg ='';
	var count=0; 

	if (countNodeSelected()==0){
    	modalMsjAlert('Debe seleccionar algun Nodo para renombrar.');
	}
	else {
		getNodesSelected().forEach(function(node){
			count++;
			msg+= '<label for="renameNode">Nodo '+count+' :&nbsp;</label>';
			msg+= '<input size="30" type="text" name="renameNode" id="rename-'+node.details.id+'" value="'+node.details.title.value+'"><br>'
		});
		document.getElementById('modalRenombrarNodoMensaje').innerHTML = msg;
    	$("#modalRenombrarNodo").modal();
	}
}

function validarMenuNodoEliminar(){
	if (countNodeSelected()==0){
    	modalMsjAlert('Debe seleccionar algun Nodo para Eliminar.');
	}
}

function validarMenuNodoCiclar(){
	if ((countNodeSelected()==1) && (getNodesSelected()[0].details.class.indexOf('cycle')>-1)){
    	modalMsjAlert('El Nodo ya es ciclico');
	}
	if (countNodeSelected()!=1){
    	modalMsjAlert('Debe seleccionar de a un nodo para ciclar.');
	}
}

function validarMenuNodoEliminarCiclo(){
	if ((countNodeSelected()==1) && (getNodesSelected()[0].details.class.indexOf('cycle')==-1)){
    	modalMsjAlert('El nodo no es ciclico.');
	}
	if (countNodeSelected()!=1){
    	modalMsjAlert('Debe seleccionar de a un nodo para eliminar ciclo.');
	}
}

function validarMenuConectorAgregarSalida(){
	if (countNodeSelected()==0){
    	modalMsjAlert('Debe seleccionar algun Nodo para Agregar conectores de Salida.');
	}
}

function validarMenuConectorAgregarEntrada(){
	if (countNodeSelected()==0){
    	modalMsjAlert('Debe seleccionar algun Nodo para Agregar conectores de Entrada.');
	}
}

function opcionMenuConectorRenombrar(){
	var msg ='';
	var count=0; 

	if (countConnectorSelected()==0){
		modalMsjAlert('Debe seleccionar algun Conector para Renombrar.');
	}
	else {
		getConnectorsSelected().forEach(function(connector){
			count++;
			msg+= '<label for="renameNode">Conector '+count+' :&nbsp;</label>';
			msg+= '<input size="30" type="text" name="renameConn" id="rename-'+connector.id+'" value="'+connector.text.value+'"><br>'
		});
		document.getElementById('modalRenombrarConectorMensaje').innerHTML = msg;
    	$("#modalRenombrarConector").modal();
	}
}

function validarMenuConectorEliminar(){
	if (countConnectorSelected()==0){
    	modalMsjAlert('Debe seleccionar algun Conector para Eliminar.');
	}
}

function validarMenuEnlaceNuevo(){
	if (!getLinkedConnectInOut()){
    	modalMsjAlert('Debe seleccionar 2 Conectores a enlazar.');
	}
}

function validarMenuEnlaceEliminar(){
	if (countConnectorSelected()==0){
    	modalMsjAlert('Debe seleccionar algun Conector para eliminar Enlaces.');
	}
}

// botones de asignacion

function initAssignButtons(){
	document.getElementById("inputAssignTo").disabled = true;
	document.getElementById("inputDepartment").disabled = true;
	document.getElementById("inputDaysToProcess").disabled = true;
	document.getElementById("buttonGuardar").disabled = true;
	document.getElementById("buttonCancelar").disabled = true;
	document.getElementById("buttonModAsg").disabled = false;
}

function clickbuttonModAss(inputId){

	if (document.getElementById(inputId).value!=''){
		document.getElementById("inputAssignTo").disabled = false;
		document.getElementById("inputDepartment").disabled = false;
		document.getElementById("inputDaysToProcess").disabled = false;
		document.getElementById("buttonGuardar").disabled = false;
		document.getElementById("buttonCancelar").disabled = false;
		document.getElementById("buttonModAsg").disabled = true;
	}
	else {
		modalMsjAlert('Debe seleccionar un Enlace.');
	}
}
function clickbuttonGuardar(inputId,inputDepartment,inputAssignTo,inputDaysToProcess){

	id = document.getElementById(inputId).value;
	department = document.getElementById(inputDepartment).value;
	assignTo = document.getElementById(inputAssignTo).value;
	daysToProcess = document.getElementById(inputDaysToProcess).value;

	if (id!='' && department!='' && assignTo!='' && daysToProcess!=''){
		updateAssignProperties(id,department,assignTo,daysToProcess);
		modalMsjAlert('Se modifico la asignacion Con Exito.');
	}
	else {
		modalMsjAlert('Ninguno de los campos puede estar Vacios.');
	}
}

function clickbuttonCancelar(){
	initAssignProperties();
}