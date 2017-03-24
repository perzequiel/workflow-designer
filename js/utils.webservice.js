//////////////////////
// call webservices
//////////////////////

function listWF(panel){	
	r = callWSList(panel);
	return r;
}

function loadWF(panel,inputId){
	var id = document.getElementById(inputId).value;
	document.getElementById(inputId).value = '';

	r = callWSLoad(id,panel);
	return r;
}

function saveWF(inputName){	
	var id = '';
	var type = '';
	var name = document.getElementById(inputName).value;
	document.getElementById(inputName).value = '';

	r = callWSSave(id,name,type,graphJSON,generateJSONsteps())
	return r;
}

function setList(msg){
	var tableList;

	tableList = '<table class="table table-bordered table-hover">';
	tableList+= '<tr><th>ID</th><th>Nombre</th></tr>';
	msg.rows.forEach(function(row){
		tableList+= '<tr>';
		tableList+= '<td>'+row.id+'</td><td>'+row.name+'</td>';
		tableList+= '</tr>';
	});
	tableList+= '</table>';

	document.getElementById('tableListLoad').innerHTML = tableList;
}

function deleteWF(idreg){
	var id = document.getElementById(idreg).value;
	document.getElementById(idreg).value = '';

	r = callWSDelete(id);
	return r;
}

function setListTableWF(msg,idElement){
	var tableList='';
	msg.rows.forEach(function(row){
		tableList+= '<tr onclick="clickOnRow(this)">';
		tableList+= '<td>'+row.id+'</td><td>'+row.name+'</td><td>'+row.tipo+'</td><td>'+row.fecha_creacion+'</td>';
		tableList+= '</tr>';
	});
	document.getElementById(idElement).innerHTML = tableList;
}

function setListPaginasWF(msg,idElement){
	var paginationList='';
	paginationList+= '<li><a href="#" onclick="paginacionOpcionPagina(1)">&laquo;</a></li>';
	console.log(msg.paginas)
	for (i=1;i<=msg.paginas;i++){
		paginationList+= '<li><a href="#" onclick="paginacionOpcionPagina('+i+')">'+i+'</a></li>';
	}
	paginationList+= '<li><a href="#" onclick="paginacionOpcionPagina('+msg.paginas+')">&raquo;</a></li>';
	document.getElementById(idElement).innerHTML = paginationList;
}

function setListPaginasDisparador(msg,idElement){
	var paginationList='';
	paginationList+= '<li><a href="#" onclick="paginacionOpcionPaginaDisparador(1)">&laquo;</a></li>';
	for (i=1;i<=msg.paginas;i++){
		paginationList+= '<li><a href="#" onclick="paginacionOpcionPaginaDisparador('+i+')">'+i+'</a></li>';
	}
	paginationList+= '<li><a href="#" onclick="paginacionOpcionPaginaDisparador('+msg.paginas+')">&raquo;</a></li>';
	document.getElementById(idElement).innerHTML = paginationList;
}

function cargarComboSelectEventoDisparador(msg,idElement) {
	console.log(msg)
	console.log(idElement)
	combo="<select style='height: 29.33px;''>"
	val=msg.rows;
	for (var i = 0; i < val.length; i++) {
		combo+="<option>"+val[i].name+"</option>";
	}		

	combo+="</select>"
	document.getElementById(idElement).innerHTML = combo;
	return
}

function cargarTablaDisparador(msg,idElement) {
	
	document.getElementById('tablaDisparadorListado').children[1].innerHTML="";
	var r = '';

	msg.rows.forEach(function(row){
		registro="<tr>"
		registro+="<td>"+row.id+"</td>"
		registro+="<td>"+row.evento+"</td>"
		registro+="<td>"+row.workflow+"</td>"
		registro+="<td><a onclick='eliminarRegDisparadorPendiente("+totalRegTablaDisparadorPendiente+")'>Eliminar</a></td>"
		registro+="</tr>"
		totalRegTablaDisparadorPendiente++;

		r+=registro;
	})
	
	document.getElementById('tablaDisparadorListado').children[1].innerHTML= r; 
}

function guardarTablaDisparadorPendiente() {

	tabla = document.getElementById('tablaDisparadorPendientes').children[1].children;
	
	for (var i = 0; i < tabla.length; i++) {
		guardarTablaDisparador(0,tabla[i].children[1].innerHTML,tabla[i].children[2].innerHTML);
	}
}

function callWSList(panel){

	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/lista.php",
			data: "",
			dataType: "json",        
			success: function(msg) { setList(msg); },
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);  }
		});
	} 
	catch (err) {
		alert(err);
	}	
}

function callWSLoad(id,panel){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/recargar.php?id="+id,
			data: "",
			dataType: "json",        
			success: function(msg) { 
				if(msg.response=='ok'){

					loadGraphJSON(msg.flow);
					deleteGraph(panel); 
					drawGraph(panel);
					setNameGraph(msg.name);
				}
				if(msg.response=='empty'){
					modalMsjAlert('No se encontro el registro.');
				}  
			},
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { 
				console.log(jqXmlHttpRequest);  
				console.log(textStatus);  
				console.log(errorThrown);  
			}
		});
	} 
	catch (err) {
		alert(err);
	}
	
}

function callWSSave(idsrv,namesrv,typesrv,graph,steps){
	try	{ 
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/paginas/wfsDesigner/res/guardar.php",
			data:
			{
				id: idsrv,
				name: namesrv,
				type: typesrv,
				flowchart: graph,
				steps: steps
			},
			//async: true,
			//contentType: "text/json; charset=utf-8",
			dataType: "json",        
			success: function(msg) { console.log(msg); },
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);console.log(textStatus);console.log(errorThrown); }
		});
	} 
	catch (err) {
		alert(err);
	}
	return false;
}

function callWSDelete(idsrv){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/eliminar.php?id="+idsrv,
			data: "",
			dataType: "json",        
			success: function(msg) { console.log(msg); },
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);console.log(textStatus);console.log(errorThrown); }
		});
	}
	catch (err) {
		alert(err);
	}
	return false;
}

function recuperarPaginasMenuPrincipalWF(idElement,tamanioPagina){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/paginas.php?size="+tamanioPagina,
			data: "",
			dataType: "json",        
			success: function(msg) { setListPaginasWF(msg,idElement)},
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);  }
		});
	} 
	catch (err) {
		alert(err);
	}	
}

function recuperarRegistrosMenuPrincipalWF(idElement,tamanioPagina,pagina){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/listado.php?size="+tamanioPagina+"&pagina="+pagina,
			data: "",
			dataType: "json",        
			success: function(msg) { setListTableWF(msg,idElement)},
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);  }
		});
	} 
	catch (err) {
		alert(err);
	}	
}

function recuperarComboDisparador(idElement,tipo){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/recuperarCombo.php?tipo="+tipo,
			data: "",
			dataType: "json",        
			success: function(msg) { cargarComboSelectEventoDisparador(msg,idElement)},
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);  }
		});
	} 
	catch (err) {
		alert(err);
	}	
}

function recuperarTablaDisparador(idElement,tamanioPagina,pagina){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/recuperarTablaDisparador.php?size="+tamanioPagina+"&pagina="+pagina,
			data: "",
			dataType: "json",        
			success: function(msg) { cargarTablaDisparador(msg,idElement)},
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);  }
		});
	} 
	catch (err) {
		alert(err);
	}	
}

function guardarTablaDisparador(id,evento,workflow){
	try	{ 
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/paginas/wfsDesigner/res/guardarTablaDisparador.php",
			data:
			{
				id: id,
				evento: evento,
				workflow: workflow,
			},
			//async: true,
			//contentType: "text/json; charset=utf-8",
			dataType: "json",        
			success: function(msg) { console.log(msg); },
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);console.log(textStatus);console.log(errorThrown); }
		});
	} 
	catch (err) {
		alert(err);
	}
	return false;
}

function recuperarPaginasDisparador(idElement,tamanioPagina){
	try	{ 
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/paginas/wfsDesigner/res/paginasDisparador.php?size="+tamanioPagina,
			data: "",
			dataType: "json",        
			success: function(msg) { setListPaginasDisparador(msg,idElement)},
			error: function(jqXmlHttpRequest, textStatus, errorThrown) { console.log(jqXmlHttpRequest);  }
		});
	} 
	catch (err) {
		alert(err);
	}	
}
