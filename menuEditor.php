<div class="buttons-section">
  <div>
    <br>
    <input type="hidden" name="inputIdLink" id="inputIdLink"/>
    <span for="inputAssignTo" id="inputTarea">Asignar a</span>
    <input type="text" class="textboxButtonSection" size="15" name="inputAssignTo" id="inputAssignTo"/>
    <span> Puesto de Trabajo</span>
    <input type="text" class="textboxButtonSection" size="15" name="inputDepartment" id="inputDepartment"/>
    <span> Dias de resolucion</span>
    <input type="text" class="textboxButtonSection" size="5" name="inputDaysToProcess" id="inputDaysToProcess"/>
    <input type="button" class="btn btn-default btn-sm" onclick="clickbuttonModAss('inputIdLink')" id="buttonModAsg" value="Modificar Asignacion"/>
    <input type="button" class="btn btn-default btn-sm" onclick="clickbuttonGuardar('inputIdLink','inputDepartment','inputAssignTo','inputDaysToProcess')" id="buttonGuardar" value="Guardar"/>
    <input type="button" class="btn btn-default btn-sm" onclick="clickbuttonCancelar()" id="buttonCancelar" value="Cancelar"/>
  </div>
  <br>

  <div>
    <div class="btn-group">
      <button id="menuBtnWorkflow" type="button" class="btn btn-default dropdown-toggle btn-smbtn-letter-violet" data-toggle="dropdown">Workflow <span class="caret"></span></button>
      <ul class="dropdown-menu">
        <!--<li><a onclick="opcionMenuWorkflowRecuperar('svg-flow');">Recuperar</a></li>-->
        <li id="menuGuardar"><a onclick="opcionMenuWorkflowGuardar(actualID);">Guardar</a></li>
        <li id="menuGuardarComo"><a onclick="opcionMenuWorkflowGuardarComo();">Guardar Como</a></li>
        <li id="menuVaciar"><a onclick="initGraph('svg-flow');">Vaciar</a></li>
        <li class="divider"></li>
        <li id="menuSalir"><a onclick="opcionMenuWorkflowSalir();">Salir</a></li>
      </ul>
    </div>
    <div class="btn-group">
      <button id="menuBtnNodo" type="button" class="btn btn-default dropdown-toggle btn-letter-violet" data-toggle="dropdown">Nodo <span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li id="menuNuevaTareaUsuario"><a onclick="newNodeUser('svg-flow');">Nueva Tarea Usuario</a></li>
        <li id="menuNuevaTareaAutomatica"><a onclick="newNodeAuto('svg-flow');">Nueva Tarea Automatica</a></li>
        <li id="menuNuevoInicio"><a onclick="validarMenuNodoInicio();newNodeBegin('svg-flow');">Nuevo Inicio</a></li>
        <li id="menuNuevoFin"><a onclick="newNodeEnd('svg-flow');">Nuevo Fin</a></li>
        <li class="divider"></li>
        <li id="menuConfigurarTareaAutomatica"><a onclick="if(this.parentNode.className!='disabled'){opcionMenuNodoConfigurarTareaAuto()};">Configurar Tarea Automatica</a></li>
        <li id="menuRenombrarNodo"><a onclick="if(this.parentNode.className!='disabled'){opcionMenuNodoRenombrar()};">Renombrar</a></li>
        <li id="menuCiclar"><a onclick="if(this.parentNode.className!='disabled'){validarMenuNodoCiclar();newCycleNode('svg-flow');}">Ciclar</a></li>
        <li class="divider"></li>
        <li id="menuEliminarCiclo"><a onclick="if(this.parentNode.className!='disabled'){validarMenuNodoEliminarCiclo();deleteCycle();}">Eliminar Ciclo</a></li>
        <li id="menuEliminarNodo"><a onclick="if(this.parentNode.className!='disabled'){validarMenuNodoEliminar();deleteNode();}">Eliminar</a></li>
      </ul>
    </div>
    <div class="btn-group">
      <button id="menuBtnConector" type="button" class="btn btn-default dropdown-toggle btn-letter-violet" data-toggle="dropdown">Conector <span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li id="menuAgregarSalida"><a onclick="if(this.parentNode.className!='disabled'){validarMenuConectorAgregarSalida();newConnectorOut();}">Agregar Salida</a></li>
        <li id="menuAgregarEntrara"><a onclick="if(this.parentNode.className!='disabled'){validarMenuConectorAgregarEntrada();newConnectorIn();}">Agregar Entrada</a></li>
        <li class="divider"></li>
        <li id="menuRenombrarConector"><a onclick="if(this.parentNode.className!='disabled'){opcionMenuConectorRenombrar();}">Renombrar</a></li>
        <li id="menuEliminarConector"><a onclick="if(this.parentNode.className!='disabled'){validarMenuConectorEliminar();deleteConnect();}">Eliminar</a></li>
      </ul>
    </div>
    <div class="btn-group">
      <button id="menuBtnEnlace" type="button" class="btn btn-default dropdown-toggle btn-letter-violet" data-toggle="dropdown">Enlace <span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li id="menuNuevoLink"><a onclick="validarMenuEnlaceNuevo();newLinkConnect('svg-flow');">Nuevo</a></li>
        <li class="divider"></li>
        <li id="menuEliminarLink"><a onclick="validarMenuEnlaceEliminar();deleteLinkConnect();">Eliminar</a></li>
      </ul>
    </div>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><a onclick="modeSelection('modeSelLabel');"><span id="modeSelLabel">[ Seleccion Simple ]<span></a>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><a onclick="deselectAll();"> -- deseleccionar todo --</a>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><label id="labelEditingText">Editando : (Nuevo)</label>
  </div>
  <br>
</div>