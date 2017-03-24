// array unique

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

// const values

const const_textColor = "#000000";
const const_selected = " selected";
const const_line_selected = " line-selected";
const const_cycle = " cycle";

const const_initialPosNodeX = 0;
const const_initialPosNodeY = 0;
const const_initialSizeNodeH = 50;
const const_initialSizeNodew = 200;
const const_initialPosTitleNodeX = 100;
const const_initialPosTitleNodeY = 10;

const const_initialSizeConnectH = 20;
const const_initialSizeConnectW = 20;
const const_initialRadiusConnect = 5;


const const_connectSpaces = 30;

const const_connectInX = 0;
const const_connectOutX = 200;

const const_connectInTextX = 15;
const const_connectOutTextX = 185;

const const_initialConnectY = 0;

const const_initialSizeConnectTextH = 0;
const const_initialSizeConnectTextW = 90;

const const_initDepartment = "BACKOFFICE";
const const_initAssignTo = "AUTOMATICO";
const const_initAssignToAdmin = "#ADMIN";
const const_initDaysToProcess = 1;

// elements

var draged=false;
var totalNodes=0;
var totalConnectors=0;
var totalLinks=0;

var multipleSelectionFlag=false;

var graphJSON = {
					"nodes" : [],
					"links" : []
				};
// generic functions

function existId(element){
	var e = document.getElementById(element);
	if (e!=null) {return e;}
	return false;
}

function isSelectedId(element){
	return (e = existId(element)) && e.getAttribute('class').indexOf(const_selected)>-1 ;
}

function selectId(element){
	if ((e = existId(element)) && !isSelectedId(element)) {
		e.setAttribute('class', e.getAttribute('class') + const_selected);
		return e;
	}
	return false;
}

function deselectId(element){
	if ((e = existId(element)) && isSelectedId(element)) {
		e.setAttribute('class', 
			e.getAttribute('class').substring( 0, e.getAttribute('class').indexOf(const_selected)) + 
			e.getAttribute('class').substring(e.getAttribute('class').indexOf(const_selected) + const_selected.length));
		return e;
	}
	return false;
}

function multipleSelection() {
	return multipleSelectionFlag;
}

// nodes functions

function createNodeId(tag,append,type,id,propClass,inText){
	
	var group = document.createElementNS("http://www.w3.org/2000/svg",'g');
    var element = document.createElementNS("http://www.w3.org/2000/svg",tag);
    
	element.setAttributeNS(null,"id", id);
	element.setAttributeNS(null,"type", type);
	element.setAttributeNS(null,"class", propClass);
	element.onclick = function () { toggleSelect(id)};

	text = document.createElementNS("http://www.w3.org/2000/svg",'text');
    text.appendChild(document.createTextNode(inText));
    text.setAttributeNS(null,'id',id+'-title');
	text.setAttributeNS(null,'type','title');
	text.setAttributeNS(null,'text-anchor','middle');
	text.setAttributeNS(null,'alignment-baseline','middle');
    
	group.setAttributeNS(null,"id", "group-"+id);
	group.setAttributeNS(null,"class", "draggable");
	group.appendChild(element);
	group.appendChild(text);
	existId(append).appendChild(group);
  	return element;
}

function setPosNodeXY(element,x,y){
	if (e = existId(element)) {
		e.setAttributeNS(null,"x", x);
		e.setAttributeNS(null,"y", y);
		return e;
	}
	return false;
}

function getPosNodeXY (element){
	if (e = existId(element)) {
		return {x : e.getAttribute("x") , y : e.getAttribute("y")};
	}
	return false;
}

function setSizeNodeHW(element,h,w){
	if (e = existId(element)) {
		e.setAttributeNS(null,"width", w);
		e.setAttributeNS(null,"height", h);
		return e;
	}
	return false;
}

function getSizeNodeHW(element){
	if (e = existId(element)) {
		return {h : e.getAttribute("height") , w : e.getAttribute("width")};
	}
	return false;
}

function newNodeBegin(panel){
	if (!beginNodeExist()) {return newNode(panel,'node-element task-begin','INICIO');}
	else {return false;}
}

function newNodeEnd(panel){
  	return newNode(panel,'node-element task-end','FIN '+(totalNodes+1));
}

function newNodeUser(panel){
  	return newNode(panel,'node-element task-user','Tarea Usuario '+(totalNodes+1));
}

function newNodeAuto(panel){
  	return newNode(panel,'node-element task-auto','Tarea Automatica '+(totalNodes+1));
}

function newNode(panel,classNode,name){
  	totalNodes++;
  	createNodeId('rect',panel,'node','node'+totalNodes,classNode,name);  
  	
  	setPosNodeXY('node'+totalNodes, 
  				const_initialPosNodeX, 
  				const_initialPosNodeY);

	setPosNodeXY('node'+totalNodes+'-title', 
  				const_initialPosTitleNodeX, 
  				const_initialPosTitleNodeY);

  	setSizeNodeHW('node'+totalNodes, 
  				const_initialSizeNodeH, 
  				const_initialSizeNodew);
  	
  	addNodeJSON('node'+totalNodes);
  	return existId('node'+totalNodes);
}

function validateMenu() {

	countNodes=0;
	countNodesAuto=0;
	countCycle=0;
	countConnectors=0;	

	graphJSON.nodes.forEach(function(node){
		node.connectors.forEach(function(connector){
			if (isSelectedId(connector.id)) {countConnectors++;}
		});
		if (isSelectedId(node.details.id)) {countNodes++;}
		if (node.details.class.indexOf('task-auto')>-1) {countNodesAuto++;}
		if (node.details.class.indexOf('cycle')>-1) {countCycle++;}
	});
	console.log(countConnectors)
	existId('menuRenombrarNodo').className = 'disabled';
	existId('menuEliminarNodo').className = 'disabled';
	existId('menuConfigurarTareaAutomatica').className = 'disabled';
	existId('menuCiclar').className = 'disabled';
	existId('menuEliminarCiclo').className = 'disabled';
	existId('menuAgregarSalida').className = 'disabled';
	existId('menuAgregarEntrara').className = 'disabled';
	existId('menuRenombrarConector').className = 'disabled';
	existId('menuEliminarConector').className = 'disabled';
	existId('menuNuevoLink').className = 'disabled';
	existId('menuEliminarLink').className = 'disabled';

	if (countNodes>0) {
		existId('menuRenombrarNodo').className = '';
		existId('menuEliminarNodo').className = '';
		existId('menuAgregarSalida').className = '';
		existId('menuAgregarEntrara').className = '';

		if (countNodes==1 && countNodesAuto==1) {
			existId('menuConfigurarTareaAutomatica').className = '';
		}

		if (countNodes==1 && countCycle==1) {
			existId('menuEliminarCiclo').className = '';
		}

		if (countNodes==1 && countCycle==0) {
			existId('menuCiclar').className = '';
		}
	}
	
	if (countConnectors>0) {
		existId('menuRenombrarConector').className = '';
		existId('menuEliminarConector').className = '';
		existId('menuEliminarLink').className = '';
		if (countConnectors==2) {
			existId('menuNuevoLink').className = '';
		}
	}

	
}

function toggleSelect(element){
	initAssignProperties();
	if (!draged){
		draged=false;
		if (isSelectedId(element))
			{deselectId(element);}
		else
		{
			if (!multipleSelection()) {deselectAll();}
			selectId(element);
		}
	}
	draged=false;

	validateMenu();
}

function renameNodes(nodes){
	nodes.forEach(function(node) {
		nodeName=document.getElementById('rename-'+node.details.id).value;

		setNameNode(node.details.id,nodeName);
		updateNodeJSON(node.groupId);
	});
}

function setNameNode(id,name) {
	existId(id+'-title').innerHTML = name;
}

function getNameNode(id) {
	return existId(id+'-title').innerHTML;
}

function deleteNode(){
	
	if (!deleteCycle()){return false;}

	var toRemove = [];

	graphJSON.nodes.forEach(function(gnode) {
		if (isSelectedId(gnode.details.id)) {toRemove.push(existId(gnode.groupId));}
			gnode.connectors.forEach(function(connector){
			if (isSelectedId(gnode.details.id)) {selectId(connector.id);} 
			else {deselectId(connector.id);}
		});
    		
	});	

	deleteLinkConnect();

	toRemove.forEach(function(remove) {deleteNodeJSON(remove.id);});	
	toRemove.forEach(function(remove) {remove.parentNode.removeChild(remove);});	
}

function countNodeSelected(){
	var count = 0;
	graphJSON.nodes.forEach(function(node) {
		if (isSelectedId(node.details.id)) {count++;}
	});
	return count;
}

function getNodesSelected(){
	var selected = [];
	graphJSON.nodes.forEach(function(node){
		if (isSelectedId(node.details.id)) {selected.push(node);}
	});
	return selected;
}

function beginNodeExist(){
	var beginExist=false;
	graphJSON.nodes.forEach(function(gnode){
		if (gnode.details.class.indexOf('task-begin')>-1) {beginExist=true;}
	});
	return beginExist;
}


// connectors functions

function createConnectId(tag,append,type,id,propClass,inText,anchor){
	
    var element = document.createElementNS("http://www.w3.org/2000/svg",tag);
    
	element.setAttributeNS(null,"id", id);
	element.setAttributeNS(null,"type", type);
	element.setAttributeNS(null,"class", propClass);
	element.onclick = function () { toggleSelect(id)};

	text = document.createElementNS("http://www.w3.org/2000/svg",'text');
    text.appendChild(document.createTextNode(inText));
    text.setAttributeNS(null,'id',id+'-text');
	text.setAttributeNS(null,'type','text');
	text.setAttributeNS(null,'text-anchor',anchor);
	text.setAttributeNS(null,'alignment-baseline','middle');
	
	existId(append).appendChild(element);	
	existId(append).appendChild(text);	
  	return element;
}


function setPosConnectXY(element,x,y){
	if (e = existId(element)) {
		e.setAttributeNS(null,"cx", x);
		e.setAttributeNS(null,"cy", y);
		return e;
	}
	return false;
}

function getPosConnectXY (element){
	if (e = existId(element)) {
		return {x : e.getAttribute("cx") , y : e.getAttribute("cy")};
	}
	return false;
}

function setRadiusConnect(element,r){
	if (e = existId(element)) {
		e.setAttributeNS(null,"r", r);
		return e;
	}
	return false;
}

function getRadiusConnect(element){
	if (e = existId(element)) {
		return e.getAttribute("r");
	}
	return false;
}

function newConnectorIn(){
	return newConnector('CIn',const_connectInX,const_connectInTextX,'start','Resuelta ');
}

function newConnectorOut(){
	return newConnector('COut',const_connectOutX,const_connectOutTextX,'end','Cerrada ');
}

function newConnector(typeConnector,initConnectorX,initTextX,anchor,text){

	var toAdd = [];
	var selectedNodes = [];
	var newConnectors = [];

	graphJSON.nodes.forEach(function(gnode) {
		gnode.connectors.forEach(function(connector) {deselectId(connector.id);});
		if ((isSelectedId(gnode.details.id) && (typeConnector=='CIn' ) && (gnode.details.class.indexOf('task-begin')==-1)) ||
		    (isSelectedId(gnode.details.id) && (typeConnector=='COut') && (gnode.details.class.indexOf('task-end')==-1)))
			{selectedNodes.push(gnode);}
	});	
	
	selectedNodes.forEach(function(gnode) {

		var counter = 0;
		totalConnectors++;

		gnode.connectors.forEach(function(connector) {
			if (connector.type==typeConnector) {counter++;}
		});

  		createConnectId('circle',
  						gnode.groupId,
  						typeConnector,
  						typeConnector+totalConnectors,
  						'connector-element '+gnode.details.id,
  						text+totalConnectors,
  						anchor);   		
  		
  		setPosConnectXY(typeConnector+totalConnectors, initConnectorX, const_connectSpaces+counter*const_connectSpaces);
  		setRadiusConnect(typeConnector+totalConnectors, const_initialRadiusConnect);
  		setPosNodeXY(typeConnector+totalConnectors+'-text', initTextX, const_connectSpaces+counter*const_connectSpaces);
  		
  		newConnectors.push(existId(typeConnector+totalConnectors));
  		toAdd.push({ "groupId" : gnode.groupId , "id" : typeConnector+totalConnectors });

  		nodeHeight = parseInt(getSizeNodeHW(gnode.details.id).h);
  		
  		if (nodeHeight < (const_initialSizeNodeH + (counter*const_connectSpaces)))
  			{setSizeNodeHW(gnode.details.id,const_initialSizeNodeH + (counter*const_connectSpaces) ,parseInt(getSizeNodeHW(gnode.details.id).w));}

  		updateNodeJSON(gnode.groupId);
	});	
	
	toAdd.forEach(function(add){addConnectorJSON(add.groupId,add.id);});

	return newConnectors;
}

function renameConnectors(connectors){
	connectors.forEach(function(connector){
		connectName=document.getElementById('rename-'+connector.id).value;

		setNameConnect(connector.id,connectName);
		updateConnectorJSON(existId(connector.id).parentNode.id,connector.id);
	});
}

function setNameConnect(id,name) {
	existId(id+'-text').innerHTML = name;
}

function getNameConnect(id) {
	return existId(id+'-text').innerHTML;
}

function deleteConnect(){
	
	deleteLinkConnect();

	var toRemove = [];
	graphJSON.nodes.forEach(function(gnode) {
		
		var CInToRemove = 0;
		var COutToRemove = 0;
		var countCInRemains = 0;
		var countCOutRemains = 0;
			
		gnode.connectors.forEach(function(connector) {
			if ((connector.type=='CIn' || connector.type=='COut') && connector.class.indexOf('cycle')>-1){
				if (connector.type=='COut'){countCOutRemains++;}
				if (connector.type=='CIn'){countCInRemains++;}
			}
			else {
				if (connector.type=='CIn'){ //qweqwe
					if (isSelectedId(connector.id)) {
						CInToRemove++;
						toRemove.push({ "connector" : existId(connector.id) , "text" : existId(connector.id+'-text') });
					}
					else {
						countCInRemains++;

						if (CInToRemove>0) {

							setPosConnectXY(connector.id,
											parseFloat(getPosConnectXY(connector.id).x),
											parseFloat(getPosConnectXY(connector.id).y) - (CInToRemove * const_connectSpaces));

							setPosNodeXY(	connector.id+'-text',
											parseFloat(getPosNodeXY(connector.id+'-text').x),
											parseFloat(getPosNodeXY(connector.id+'-text').y) - (CInToRemove * const_connectSpaces));

							selectLinkClassJSON(connector.id+'-').forEach(function(link){
								if (link.type=='line') {
									setPosLinkXYpoint2( link.id, 
														parseFloat(getPosLinkXYpoint2(link.id).x), 
														parseFloat(getPosLinkXYpoint2(link.id).y) - (CInToRemove * const_connectSpaces));

									updateLinkJSON(link.id);
								}
							});
						}
						updateConnectorJSON(gnode.groupId,connector.id);
					}
				}

				if (connector.type=='COut'){
					
					if (isSelectedId(connector.id)) {
						COutToRemove++;
						toRemove.push({ "connector" : existId(connector.id) , "text" : existId(connector.id+'-text') });
					}
					else {
						countCOutRemains++;

						if (COutToRemove>0) {

							setPosConnectXY(connector.id,
											parseFloat(getPosConnectXY(connector.id).x),
											parseFloat(getPosConnectXY(connector.id).y) - (COutToRemove * const_connectSpaces));
							
							setPosNodeXY(	connector.id+'-text',
											parseFloat(getPosNodeXY(connector.id+'-text').x),
											parseFloat(getPosNodeXY(connector.id+'-text').y) - (COutToRemove * const_connectSpaces));

							selectLinkClassJSON(connector.id+'-').forEach(function(link){
								if (link.type=='line') {
									setPosLinkXYpoint1( link.id, 
														parseFloat(getPosLinkXYpoint1(link.id).x), 
														parseFloat(getPosLinkXYpoint1(link.id).y) - (COutToRemove * const_connectSpaces));

									updateLinkJSON(link.id);
								}
							});
						}
						updateConnectorJSON(gnode.groupId,connector.id);
					}
				}
			}		
		});

		nodeHeight = parseInt(getSizeNodeHW(gnode.details.id).h);
		
		if 	((nodeHeight > (const_initialSizeNodeH + (countCOutRemains-1)*const_connectSpaces)) && 
			(nodeHeight > (const_initialSizeNodeH + (countCInRemains-1)*const_connectSpaces))) {

			var nodeSizeAddX = 0;
			if ((const_initialSizeNodeH < (const_initialSizeNodeH + (countCOutRemains-1)*const_connectSpaces)) || 
				(const_initialSizeNodeH < (const_initialSizeNodeH + (countCInRemains-1)*const_connectSpaces))){
				if (countCOutRemains > countCInRemains){nodeSizeAddX = (countCOutRemains-1)*const_connectSpaces;}
				else {nodeSizeAddX = (countCInRemains-1)*const_connectSpaces;}
			}

			setSizeNodeHW(gnode.details.id,const_initialSizeNodeH + nodeSizeAddX,parseInt(getSizeNodeHW(gnode.details.id).w));
		}
		updateNodeJSON(gnode.groupId);
	});	
	
	toRemove.forEach(function(remove) {deleteConnectorJSON(remove.connector.parentNode.id,remove.connector.id);});	
	
	toRemove.forEach(function(remove) {
		remove.connector.parentNode.removeChild(remove.connector);
		remove.text.parentNode.removeChild(remove.text);
	});	
}


function countConnectorSelected(){
	var count = 0;
	graphJSON.nodes.forEach(function(node) {
		node.connectors.forEach(function(connector) {
			if (isSelectedId(connector.id)) {count++;}
		});	
	});
	return count;
}

function getConnectorsSelected(){
	var selected=[];
	graphJSON.nodes.forEach(function(node){
		node.connectors.forEach(function(connector) {
			if (isSelectedId(connector.id)) {selected.push(connector);}
		});
	});
	return selected;
}

// Links functions

function isSelectedLineId(element){
	return (e = existId(element)) && e.getAttribute('class').indexOf(const_line_selected)>-1 ;
}

function selectLineId(element){
	if ((e = existId(element)) && !isSelectedLineId(element)) {
		e.setAttribute('class', e.getAttribute('class') + const_line_selected);
		return e;
	}
	return false;
}

function deselectLineId(element){
	if ((e = existId(element)) && isSelectedLineId(element)) {
		e.setAttribute('class', 
			e.getAttribute('class').substring( 0, e.getAttribute('class').indexOf(const_line_selected)) + 
			e.getAttribute('class').substring(e.getAttribute('class').indexOf(const_line_selected) + const_line_selected.length));
		return e;
	}
	return false;
}

function toggleSelectLine(element){
	
	getAssignProperties(element);

	if (isSelectedLineId(element))
		{deselectLineId(element);}
	else
	{
		if (!multipleSelection()) {deselectAll();}
		selectLineId(element);
	}
}

function createLinkId(append,id,propClass,pointA,pointB,department,assignTo,daysToProcess){

	var line = document.createElementNS("http://www.w3.org/2000/svg",'line');

	line.setAttributeNS(null,"id", id);
	line.setAttributeNS(null,"x1", pointA.x);
	line.setAttributeNS(null,"y1", pointA.y);
	line.setAttributeNS(null,"x2", pointB.x);
	line.setAttributeNS(null,"y2", pointB.y);
	line.setAttributeNS(null,"stroke", "#555");
	line.setAttributeNS(null,"stroke-width", "5");
	line.setAttributeNS(null,"stroke-linecap", "round");
	line.setAttributeNS(null,"type", "line");

	line.setAttributeNS(null,"department", department);
	line.setAttributeNS(null,"assignTo", assignTo);
	line.setAttributeNS(null,"daysToProcess", daysToProcess);
	line.onclick = function () { toggleSelectLine(id)};

	line.setAttributeNS(null,"class", pointA.id+'-'+pointB.id+'-');
	
	existId(append).appendChild(line);
  	return line;
}

function setPosLinkXYpoint1(id,x1,y1){
	e = existId(id);
	e.setAttributeNS(null,"x1", x1);
	e.setAttributeNS(null,"y1", y1);
}

function setPosLinkXYpoint2(id,x2,y2){
	e = existId(id);
	e.setAttributeNS(null,"x2", x2);
	e.setAttributeNS(null,"y2", y2);
}

function getPosLinkXYpoint1(id){
	e = existId(id);
	return {x : e.getAttribute("x1"), y : e.getAttribute("y1")}; 
}

function getPosLinkXYpoint2(id){
	e = existId(id);
	return {x : e.getAttribute("x2"), y : e.getAttribute("y2")}; 
}

function newLinkConnect(panel){
	var assign;
	totalLinks++;

	if (l = getLinkedConnectInOut()){
		graphJSON.nodes.forEach(function(node){node.connectors.forEach(function(connector){deselectId(connector.id);});});
		
		if (selectNodeIdJSON(existId(l.in.id).parentNode.id).details.class.indexOf('task-auto')>-1) {assign = const_initAssignToAdmin;} 
		else {assign = const_initAssignTo;}

		link = createLinkId(panel,'link'+totalLinks,'line point-handle',l.out,l.in,const_initDepartment,assign,const_initDaysToProcess);

		addLinkJSON('link'+totalLinks);
		return link;
	}
	else {
  		return false;
  	}
}

function getLinkedConnectInOut(){
	
	var idCIn;
	var idCOut;
	var toLinkOutX;
	var toLinkInY;
	var countLinkOut=0;
	var countLinkIn=0;
	var response;

	graphJSON.nodes.forEach(function(node) {
		node.connectors.forEach(function(connector) {
			if (isSelectedId(connector.id) && connector.type=='COut') {
				countLinkOut++
				toLinkOutX = parseFloat(node.details.x)+node.datax+connector.cx;
				toLinkOutY = parseFloat(node.details.y)+node.datay+connector.cy;
				idCOut = connector.id;
			}
			if (isSelectedId(connector.id) && connector.type=='CIn') 
			{
				countLinkIn++
				toLinkInX = parseFloat(node.details.x)+node.datax+connector.cx;
				toLinkInY = parseFloat(node.details.y)+node.datay+connector.cy;
				idCIn = connector.id;
			} 
		});
	});
	
	if (countLinkIn==1 && countLinkOut==1){
		
		response = {
						out : { x : toLinkOutX, y : toLinkOutY, id : idCOut} , 
						in  : { x : toLinkInX , y : toLinkInY, id : idCIn }
					};

		graphJSON.links.forEach(function(link) {
			if ((link.class.indexOf(idCIn)>-1) || (link.class.indexOf(idCOut)>-1)){response = false;}
		});

		return response;
	}
	return false;
}

function deleteLinkConnect(){
	var toRemove = [];

	graphJSON.nodes.forEach(function(node) {		
		node.connectors.forEach(function(connector) {
			if (isSelectedId(connector.id)) {
				selectLinkClassJSON(connector.id+'-').forEach(function(link){
					if (link.type=='line') {toRemove.push(existId(link.id));}
				});
			}
		});
	});	

	toRemove.unique().forEach(function(remove) {deleteLinkJSON(remove.id);});
	toRemove.unique().forEach(function(remove) {remove.parentNode.removeChild(remove);});
}

function initAssignProperties(){
	initAssignButtons();
	existId('inputIdLink').value = "";
	existId('inputTarea').innerHTML = "Asignar a";
	existId('inputDepartment').value = "";
	existId('inputAssignTo').value = "";
	existId('inputDaysToProcess').value = "";
}

function getAssignProperties(id){
	initAssignButtons();
	var idGroupEnd = existId(existId(id).getAttribute('class').split('-')[1]).parentNode.id;
	gnode = selectNodeIdJSON(idGroupEnd);
	existId('inputIdLink').value = id;
	existId('inputTarea').innerHTML = '<b>TAREA : </b>'+gnode.details.title.value+' se asignara a ';
	existId('inputDepartment').value = existId(id).getAttribute('department');
	existId('inputAssignTo').value = existId(id).getAttribute('assignTo');
	existId('inputDaysToProcess').value = existId(id).getAttribute('daysToProcess');
}


function updateAssignProperties(id,department,assignTo,daysToProcess){
	existId(id).setAttributeNS(null,"department", department);
	existId(id).setAttributeNS(null,"assignTo", assignTo);
	existId(id).setAttributeNS(null,"daysToProcess", daysToProcess);
	updateLinkJSON(id);
	initAssignProperties();
}

// generate cyclic node

function newCycleNode(panel) {
	var selectedNodes = 0;
	var connectorsInNode = 0;
	var addSpaces = 0;
	var idNode = "";
	var newConnectors = [];

	graphJSON.nodes.forEach(function(gnode) {
		gnode.connectors.forEach(function(connector) {deselectId(connector.id);});
		if (isSelectedId(gnode.details.id)) {
			gnode.connectors.forEach(function(connector) {connectorsInNode++;});
			selectedNodes++;
			idNode = gnode.groupId;
		}
	});	
	
	if (selectedNodes!=1) {return false;}

	gnode = selectNodeIdJSON(idNode);
	if (gnode.details.class.indexOf('cycle')>-1) {return false;}

	// rePos connectors and links
	gnode.connectors.forEach(function(connector) {
		if (connector.type=='CIn' || connector.type=='COut') {
			
			setPosConnectXY(connector.id,
							parseFloat(getPosConnectXY(connector.id).x),
							parseFloat(getPosConnectXY(connector.id).y) + const_connectSpaces);

			setPosNodeXY(connector.id+'-text',
							parseFloat(getPosNodeXY(connector.id+'-text').x),
							parseFloat(getPosNodeXY(connector.id+'-text').y) + const_connectSpaces);

			updateConnectorJSON(gnode.groupId,connector.id);
		}

		selectLinkClassJSON(connector.id+'-').forEach(function(link){
			if (link.type=='line') {
				if (connector.type=='COut'){
					setPosLinkXYpoint1( link.id, 
										parseFloat(getPosLinkXYpoint1(link.id).x), 
										parseFloat(getPosLinkXYpoint1(link.id).y) + const_connectSpaces);
				}
				if (connector.type=='CIn'){
					setPosLinkXYpoint2( link.id, 
										parseFloat(getPosLinkXYpoint2(link.id).x), 
										parseFloat(getPosLinkXYpoint2(link.id).y) + const_connectSpaces);
				}
				updateLinkJSON(link.id);
			}
		});
	});

	if (connectorsInNode>0){addSpaces = const_connectSpaces;} else {addSpaces = 0;}
	setSizeNodeHW(gnode.details.id, parseInt(getSizeNodeHW(gnode.details.id).h) + addSpaces, parseInt(getSizeNodeHW(gnode.details.id).w));

	// new node CIn
	totalConnectors++;

	createConnectId('circle',
					gnode.groupId,
					'CIn',
					'CIn'+totalConnectors,
					'connector-element '+gnode.details.id+ ' cycle',
					'Error '+totalConnectors,
					'start');   

	setPosConnectXY('CIn'+totalConnectors, const_connectInX, const_connectSpaces);
	setRadiusConnect('CIn'+totalConnectors, const_initialRadiusConnect);
	setPosNodeXY('CIn'+totalConnectors+'-text', const_connectInTextX, const_connectSpaces);

	selectId('CIn'+totalConnectors);
	addConnectorJSON(gnode.groupId,'CIn'+totalConnectors);

	// new node COut 
	totalConnectors++;

	createConnectId('circle',
					gnode.groupId,
					'COut',
					'COut'+totalConnectors,
					'connector-element '+gnode.details.id+ ' cycle',
					'Cerrada '+totalConnectors,
					'end');   

	setPosConnectXY('COut'+totalConnectors, const_connectOutX, const_connectSpaces);
	setRadiusConnect('COut'+totalConnectors, const_initialRadiusConnect);
	setPosNodeXY('COut'+totalConnectors+'-text', const_connectOutTextX, const_connectSpaces);

	selectId('COut'+totalConnectors);
	addConnectorJSON(gnode.groupId,'COut'+totalConnectors);

	existId(gnode.details.id).setAttribute('class', gnode.details.class+' cycle');
	updateNodeJSON(gnode.groupId);

	initMenu();

	return newLinkConnectCycle(panel);
}

function createLinkCycleId(append,id,propClass,pointA,pointB,department,assignTo,daysToProcess){
	
	var cycle = document.createElementNS("http://www.w3.org/2000/svg",'path');
	var pos = "M "+pointA.x+" "+pointA.y+" A 120 30 0 1 0 "+pointB.x+" "+pointB.y

	cycle.setAttributeNS(null,"id", id);
	cycle.setAttributeNS(null,"x1", pointA.x);
	cycle.setAttributeNS(null,"y1", pointA.y);
	cycle.setAttributeNS(null,"x2", pointB.x);
	cycle.setAttributeNS(null,"y2", pointB.y);
	cycle.setAttributeNS(null,"stroke", "#555");
	cycle.setAttributeNS(null,"stroke-width", "5");
	cycle.setAttributeNS(null,"stroke-linecap", "round");
	cycle.setAttributeNS(null,"fill", "none");
	cycle.setAttributeNS(null,"type", "cycle");

	cycle.setAttributeNS(null,"department", department);
	cycle.setAttributeNS(null,"assignTo", assignTo);
	cycle.setAttributeNS(null,"daysToProcess", daysToProcess);
	cycle.onclick = function () { getAssignProperties(id)};

	cycle.setAttributeNS(null,"d", pos);
	cycle.setAttributeNS(null,"class", pointA.id+'-'+pointB.id+'-');
	
	existId(append).appendChild(cycle);
  	return cycle;
}

function setPosLinkCycleXYpoint1(id,x1,y1){
	var pos = "M "+x1+" "+y1+" A 120 30 0 1 0 "+getPosLinkCycleXYpoint2(id).x+" "+getPosLinkCycleXYpoint2(id).y;
	e = existId(id);
	e.setAttributeNS(null,"x1", x1);
	e.setAttributeNS(null,"y1", y1);
	e.setAttributeNS(null,"d", pos);
}

function setPosLinkCycleXYpoint2(id,x2,y2){
	var pos = "M "+getPosLinkCycleXYpoint1(id).x+" "+getPosLinkCycleXYpoint1(id).y+" A 120 30 0 1 0 "+x2+" "+y2;
	e = existId(id);
	e.setAttributeNS(null,"x2", x2);
	e.setAttributeNS(null,"y2", y2);
	e.setAttributeNS(null,"d", pos);
}

function getPosLinkCycleXYpoint1(id){
	e = existId(id);
	return {x : e.getAttribute("x1"), y : e.getAttribute("y1")}; 
}

function getPosLinkCycleXYpoint2(id){
	e = existId(id);
	return {x : e.getAttribute("x2"), y : e.getAttribute("y2")}; 
}

function newLinkConnectCycle(panel){
	var assign;
	totalLinks++;

	if (l = getLinkedConnectInOut()){
		graphJSON.nodes.forEach(function(gnode) {gnode.connectors.forEach(function(connector){deselectId(connector.id);});});

		if (selectNodeIdJSON(existId(l.in.id).parentNode.id).details.class.indexOf('task-auto')>-1) {assign = const_initAssignToAdmin;} 
		else {assign = const_initAssignTo;}

		link = createLinkCycleId(panel,'link'+totalLinks,'line point-handle',l.out,l.in,const_initDepartment,assign,const_initDaysToProcess);

		addLinkJSON('link'+totalLinks);
		return link;
	}
	alert('Debe Seleccionar 2 Conectores Linkeables')
  	return false;
}

function deleteCycle(){

	var toRemove = [];
	var selectedNodes = 0;
	var connectorsInNode = 0;
	var subSpaces = 0;

	graphJSON.nodes.forEach(function(gnode) {
		gnode.connectors.forEach(function(connector) {deselectId(connector.id);});
		if (isSelectedId(gnode.details.id) && gnode.details.class.indexOf('cycle')>-1) {
			gnode.connectors.forEach(function(connector) {connectorsInNode++;});
			selectedNodes++;
			idNode = gnode.groupId;
		}
	});	

	if (selectedNodes==0) {return true;}
	if (selectedNodes>1) {alert("Seleccione de a un nodo, para eliminar ciclo");return false;}

	// rePos connectors and links
	gnode = selectNodeIdJSON(idNode);
	
	gnode.connectors.forEach(function(connector) {

		if (connector.type=='CIn' || connector.type=='COut'){
			if (connector.class.indexOf('cycle')>-1) {
				toRemove.push(existId(connector.id));
				toRemove.push(existId(connector.id+'-text'));
			} 
			else {
				setPosConnectXY(connector.id,
								parseFloat(getPosConnectXY(connector.id).x),
								parseFloat(getPosConnectXY(connector.id).y) - const_connectSpaces);
							
				setPosNodeXY(	connector.id+'-text',
								parseFloat(getPosNodeXY(connector.id+'-text').x),
								parseFloat(getPosNodeXY(connector.id+'-text').y) - const_connectSpaces);

				updateConnectorJSON(gnode.groupId,connector.id);
			}


			selectLinkClassJSON(connector.id+'-').forEach(function(link){
				if (link.type=='line') {
					if (connector.type=='CIn'){
						setPosLinkXYpoint2( link.id, 
											parseFloat(getPosLinkXYpoint2(link.id).x), 
											parseFloat(getPosLinkXYpoint2(link.id).y) - const_connectSpaces);
					}
					if (connector.type=='COut'){
						setPosLinkXYpoint1( link.id, 
											parseFloat(getPosLinkXYpoint1(link.id).x), 
											parseFloat(getPosLinkXYpoint1(link.id).y) - const_connectSpaces);
					}
					updateLinkJSON(link.id);
				}
				if (link.type=='cycle') {
					toRemove.push(existId(link.id));
				}
			});
		}
	});
	if (connectorsInNode>2){subSpaces = const_connectSpaces;} else {subSpaces = 0;}
	
	setSizeNodeHW(gnode.details.id,parseInt(getSizeNodeHW(gnode.details.id).h) - subSpaces,parseInt(getSizeNodeHW(gnode.details.id).w));

	existId(gnode.details.id)
		.setAttribute(	'class',
			existId(gnode.details.id).getAttribute('class').substring(0,existId(gnode.details.id).getAttribute('class').indexOf(const_cycle)) + 
			existId(gnode.details.id).getAttribute('class').substring(existId(gnode.details.id).getAttribute('class').indexOf(const_cycle)+const_cycle.length)
	);
	
	updateNodeJSON(gnode.groupId);

	toRemove.unique().forEach(function(remove) {
		if (remove.getAttribute('type')=='cycle') {deleteLinkJSON(remove.id);}
		if (remove.getAttribute('type')=='CIn' || remove.getAttribute('type')=='COut') {deleteConnectorJSON(remove.parentNode.id,remove.id);}
	});	
	toRemove.unique().forEach(function(remove) {remove.parentNode.removeChild(remove);});	

	deselectAll();

	return true;
} 

function initGraph(panel){
	deleteGraph(panel);
	graphJSON.nodes = [];
	graphJSON.links = [];
}

function initMenu() {
	existId('menuConfigurarTareaAutomatica').className = 'disabled';
	existId('menuRenombrarNodo').className = 'disabled';
	existId('menuEliminarNodo').className = 'disabled';
	existId('menuCiclar').className = 'disabled';
	existId('menuEliminarCiclo').className = 'disabled';
	
	//existId('menuBtnConector').className+= ' disabled';
	existId('menuAgregarSalida').className = 'disabled';
	existId('menuAgregarEntrara').className = 'disabled';


	//existId('menuBtnEnlace').className+= ' disabled';
	existId('menuRenombrarConector').className = 'disabled';
	existId('menuEliminarConector').className = 'disabled';
	existId('menuNuevoLink').className = 'disabled';
	existId('menuEliminarLink').className = 'disabled';
}

function deselectAll(){

	graphJSON.nodes.forEach(function(node){
		node.connectors.forEach(function(connector){
			deselectId(connector.id);
		});
		deselectId(node.details.id);
	});

	graphJSON.links.forEach(function(link){
		deselectLineId(link.id);
	});

	initMenu();
}

function modeSelection(id){

	if (multipleSelectionFlag) {
		multipleSelectionFlag=false;
		deselectAll();
		existId(id).innerHTML = '[ Seleccion Simple ]';
	}
	else {
		deselectAll();
		multipleSelectionFlag=true;
		existId(id).innerHTML = '[ Seleccion Multiple ]';
	}
}

function loadGraphJSON(msg){

	if(msg.nodes!=undefined) {
		graphJSON.nodes = msg.nodes;
		graphJSON.nodes.forEach(function(node){
			if (node.connectors==undefined) {node.connectors = [];}
		});
	}
	else {graphJSON.nodes = [];}

	if(msg.links!=undefined) {graphJSON.links = msg.links;}
	else {graphJSON.links = [];}
}

function deleteGraph(panel){
	toRemove = [];

	existId(panel).childNodes.forEach(function(node){
		toRemove.push(node);
	})

	toRemove.forEach(function(remove){
		remove.parentNode.removeChild(remove);
	});
}

function setNameGraph(name){
	document.getElementById('labelEditingText').innerHTML = 'Editando : '+name;
}

function drawGraph(panel){
	totalNodes=totalConnectors=totalConnectorstotalLinks=0;

	graphJSON.nodes.forEach(function(node){
		
		createNodeId('rect',panel,'node',node.details.id,node.details.class,node.details.title.value);  
  		
  		setPosNodeXY(	node.details.id, 
		  				node.details.x, 
		  				node.details.y);

		setPosNodeXY(	node.details.title.id, 
		  				node.details.title.x, 
		  				node.details.title.y);

 	 	setSizeNodeHW(	node.details.id, 
  						node.details.height, 
  						node.details.width);

        x = node.datax || 0;
        y = node.datay || 0;

        if (node.datax!=0 || node.datay!=0) {
			existId(node.groupId).style = node.style;
        }

		existId(node.groupId).setAttribute('data-x', x);
		existId(node.groupId).setAttribute('data-y', y);

		n = parseInt(node.details.id.substring(4,node.details.id.length)); 
		if (n>totalNodes){totalNodes=n;}

		node.connectors.forEach(function(connector){

			createConnectId('circle',
					node.groupId,
					connector.type,
					connector.id,
					connector.class,
					connector.text.value,
					connector.text.textAnchor);   

			setPosConnectXY(connector.id,connector.cx, connector.cy);
			setRadiusConnect(connector.id, const_initialRadiusConnect);
			setPosNodeXY(connector.text.id, connector.text.x, connector.text.y);

			if (connector.type=='CIn')  {c = parseInt(connector.id.substring(3,connector.id.length)); }
			if (connector.type=='COut') {c = parseInt(connector.id.substring(4,connector.id.length)); }
			if (c>totalConnectors){totalConnectors=c;}
		})
	});
	
	graphJSON.links.forEach(function(link){

		if (link.type=='line'){
			pointOut = { x : link.x1 , y : link.y1 , id : "1"};
			pointIn  = { x : link.x2 , y : link.y2 , id : "2"};

			createLinkId(panel,link.id,link.class,pointOut,pointIn,link.department,link.assignTo,link.daysToProcess);
			existId(link.id).setAttributeNS(null,"class",link.class);
		}
		if (link.type=='cycle'){
			pointOut = { x : link.x1 , y : link.y1 , id : "1"};
			pointIn  = { x : link.x2 , y : link.y2 , id : "2"};

			createLinkCycleId(panel,link.id,l.class,pointOut,pointIn,link.department,link.assignTo,link.daysToProcess);
			existId(link.id).setAttributeNS(null,"class",link.class);
		}
		l = parseInt(link.id.substring(4,link.id.length)); 
		if (l>totalLinks){totalLinks=l;}
	});
	deselectAll()
}
