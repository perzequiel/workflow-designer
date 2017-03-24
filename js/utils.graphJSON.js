// JSON graph functions

function getGraphJSON(){ return graphJSON;}

function generateJSONsteps(){

	WFsteps = [];

	graphJSON.links.forEach(function(link){

		connectors = link.class.split('-');

		step = {
			"ACT_INICIO_NOMBRE" : getNameNode(selectNodeIdJSON(existId(connectors[0]).parentNode.id).details.id),
			"ACT_INICIO_ESTADO" : getNameConnect(existId(connectors[0]).id),
			"ACT_INICIO_RESULTADO" : getNameConnect(existId(connectors[1]).id),
			"ACT_FIN_NOMBRE" : getNameNode(selectNodeIdJSON(existId(connectors[1]).parentNode.id).details.id),
			"ACT_PUESTO_TRABAJO" : link.department,
			"ACT_LOGIN_DEFAULT" : link.assignTo,
			"ACT_DIAS_TIEMPO_LIMITE" : link.daysToProcess
		};

		WFsteps.push(step);
	});
	return WFsteps;
}

function addNodeJSON(id){

	nodeJSON = {
		"groupId" : "group-"+id,
		"class" : "draggable",
		"datax" : parseFloat(existId("group-"+id).getAttribute('data-x')) || 0,
		"datay" : parseFloat(existId("group-"+id).getAttribute('data-y')) || 0,
		"style" : existId("group-"+id).getAttribute('style'),
		"connectors" : [],
		"details" : {
			"id" : id,
			"class" : existId(id).getAttribute('class'),
			"type" : existId(id).getAttribute('type'),
			"x" : existId(id).getAttribute('x'),
			"y" : existId(id).getAttribute('y'),
			"width" : existId(id).getAttribute('width'),
			"height" : existId(id).getAttribute('height'),
			"title" : {
				"id" : id+'-title',
				"type" : existId(id+'-title').getAttribute('type'),
				"textAnchor" : existId(id+'-title').getAttribute('text-anchor'),
				"alignmentBaseline" : existId(id+'-title').getAttribute('alignment-baseline'),
				"textAnchor" : existId(id+'-title').getAttribute('text-anchor'),
				"x" : existId(id+'-title').getAttribute('x'),
				"y" : existId(id+'-title').getAttribute('y'),
				"value" : existId(id+'-title').innerHTML
			}
		}
	};

	return graphJSON.nodes.push(nodeJSON);	
}

function selectNodeIdJSON(id){
	ret = [];
	graphJSON.nodes.forEach(function(gnode){
		if (gnode.groupId==id) {ret = gnode;}
	});
	return ret
}

function updateNodeJSON(id){
	graphJSON.nodes.forEach(function(node){
		if (node.groupId==id){
			node.datax = parseFloat(existId(node.groupId).getAttribute('data-x')) || 0;
			node.datay = parseFloat(existId(node.groupId).getAttribute('data-y')) || 0;
			node.style = existId(node.groupId).getAttribute('style');
			node.details.width = existId(node.details.id).getAttribute('width');
			node.details.height = existId(node.details.id).getAttribute('height');
			node.details.class = existId(node.details.id).getAttribute('class');
			node.details.title.value = existId(node.details.id+'-title').innerHTML;
		}
	})
}

function deleteNodeJSON(id){	
	for (i = 0; i < graphJSON.nodes.length; i++) {
		if (graphJSON.nodes[i].groupId==id){
			graphJSON.nodes.splice(i,1);
		}
	} 
}

function addConnectorJSON(groupId,id){

	connectorJSON = {
		"id" : id,
		"class" : existId(id).getAttribute('class'),
		"type" : existId(id).getAttribute('type'),
		"cx" : parseFloat(existId(id).getAttribute('cx')),
		"cy" : parseFloat(existId(id).getAttribute('cy')),
		"text" : {
			"id" : id+'-text',
			"type" : existId(id+'-text').getAttribute('type'),
			"textAnchor" : existId(id+'-text').getAttribute('text-anchor'),
			"alignmentBaseline" : existId(id+'-text').getAttribute('alignment-baseline'),
			"x" : existId(id+'-text').getAttribute('x'),
			"y" : existId(id+'-text').getAttribute('y'),
			"value" : existId(id+'-text').innerHTML
		}
	};

	for (i = 0; i < graphJSON.nodes.length; i++) {
		if (graphJSON.nodes[i].groupId==groupId){
			graphJSON.nodes[i].connectors.push(connectorJSON);
		}
	} 
}

function updateConnectorJSON(groupId,id){
	selectNodeIdJSON(groupId).connectors.forEach(function(connector){
		if (connector.id==id){
			connector.cx = parseFloat(existId(id).getAttribute('cx'));
			connector.cy = parseFloat(existId(id).getAttribute('cy'));
			connector.class = existId(id).getAttribute('class');
			connector.text.x = existId(id+'-text').getAttribute('x');
			connector.text.y = existId(id+'-text').getAttribute('y');
			connector.text.value = existId(id+'-text').innerHTML;
		}
	});
}

function deleteConnectorJSON(groupId,id){
	for (i = 0; i < graphJSON.nodes.length; i++) {
		if (graphJSON.nodes[i].groupId==groupId){
			for (c = 0; c < graphJSON.nodes[i].connectors.length; c++) {
				if (graphJSON.nodes[i].connectors[c].id==id){
					graphJSON.nodes[i].connectors.splice(c,1);
				}
			}
		}
	} 
}

function addLinkJSON(id){

	var draw='';
	if (existId(id).getAttribute("type")=='cycle'){draw=existId(id).getAttribute("d");}

	linkJSON = {
		"id" : id,
		"x1" : existId(id).getAttribute("x1"),
		"y1" : existId(id).getAttribute("y1"),
		"x2" : existId(id).getAttribute("x2"),
		"y2" : existId(id).getAttribute("y2"),
		"stroke" : existId(id).getAttribute("stroke"),
		"strokeWidth" : existId(id).getAttribute("stroke-width"),
		"strokeLinecap" : existId(id).getAttribute("stroke-linecap"),
		"type" : existId(id).getAttribute("type"),
		"class" : existId(id).getAttribute("class"),
		"department" : existId(id).getAttribute("department"),
		"assignTo" : existId(id).getAttribute("assignTo"),
		"daysToProcess" : existId(id).getAttribute("daysToProcess"),
		"d" : draw,
	}

	return graphJSON.links.push(linkJSON);	
}

function selectLinkIdJSON(id){
	ret = [];
	graphJSON.links.forEach(function(link){
		if (link.id==id) {ret = link;}
	});
	return ret
}

function selectLinkClassJSON(likeClass){
	ret = [];
	graphJSON.links.forEach(function(link){
		if (link.class.indexOf(likeClass)>-1) {ret.push(link);}
	});
	return ret
}

function updateLinkJSON(id){
	graphJSON.links.forEach(function(link){
		if (link.id==id){
			link.x1 = existId(id).getAttribute("x1"),
			link.y1 = existId(id).getAttribute("y1"),
			link.x2 = existId(id).getAttribute("x2"),
			link.y2 = existId(id).getAttribute("y2"),
			link.department = existId(id).getAttribute("department"),
			link.assignTo = existId(id).getAttribute("assignTo"),
			link.daysToProcess = existId(id).getAttribute("daysToProcess")
		}
	})
}

function deleteLinkJSON(id){	
	for (i = 0; i < graphJSON.links.length; i++) {
		if (graphJSON.links[i].id==id){
			graphJSON.links.splice(i,1);
		}
	} 
}
