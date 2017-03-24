// carga inicial
const const_tamanioPorPagina = 7;

recuperarPaginasMenuPrincipalWF('paginationContentWfList',const_tamanioPorPagina)
recuperarRegistrosMenuPrincipalWF('tableContentWfList',const_tamanioPorPagina,1);

recuperarPaginasDisparador('paginationContentDisparador',const_tamanioPorPagina,1)

function clickOnRow(a){
	$(a).addClass('active').siblings().removeClass('active');
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
};

function principalMenuOpcionModificar(){
	id = recuperarIdTablaWF('tableContentWfList');
	if (id!=0) {modalModificarRegistro(id);}
	else {modalMsjAlert('No ha seleccionado ningun regitro de la grilla a Modificar.')}
}

function principalMenuOpcionEditor(){
	id = recuperarIdTablaWF('tableContentWfList');
	if (id!=0) {location.href = "editor.php?id="+id;}
	else {modalMsjAlert('No ha seleccionado ningun regitro de la grilla para acceder al Editor.')}
}

function principalMenuOpcionDisparador(){
	recuperarComboDisparador('selectWorkflowDisparador','workflow')
	recuperarComboDisparador('selectEventoDisparador','evento')
	recuperarTablaDisparador('',7,1);
	$("#modalPanelControlDisparador").modal();
}

function principalMenuOpcionEliminar(){
	id = recuperarIdTablaWF('tableContentWfList');
	
	if (id!=0) {
		document.getElementById('idGridDelete').value = id;
		$("#modalAceptarEliminar").modal();
	}
	else {modalMsjAlert('No ha seleccionado ningun regitro de la grilla a Eliminar.')}
}

function paginacionOpcionPagina(pagina){
	recuperarRegistrosMenuPrincipalWF('tableContentWfList',const_tamanioPorPagina,pagina);	
}

function paginacionOpcionPaginaDisparador(pagina){
	recuperarTablaDisparador('',const_tamanioPorPagina,pagina);
}