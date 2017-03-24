<!-- modalPanelControlDisparador -->
<div class="modal fade" id="modalPanelControlDisparador" role="dialog">
  <div class="modal-dialog" style="width: 90%">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">PANEL DE CONTROL / Disparador</h4>
      </div>
      <div class="modal-body">        
      
        <span>Evento :&nbsp;</span>
        <span id="selectEventoDisparador"></span>&nbsp;&nbsp;&nbsp;
        <span>Workflow :&nbsp;</span>
        <span id="selectWorkflowDisparador"></span>&nbsp;

        <button type="button" class="btn btn-default btn-sm" onclick="agregarTablaDisparadorPendientes()">Agregar</button>
        <br>

        <h4>Pendientes a incorporar</h4>
        
        <table id="tablaDisparadorPendientes" class="table table-bordered">
          <thead class="thead-inverse">
            <tr>
              <th>#</th>
              <th>Evento</th>
              <th>WorkFlow</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody id="tablaDisparadorPendientesBody">
          </tbody>
        </table>

        <h4>Listado eventos</h4>
        
        <table id="tablaDisparadorListado" class="table table-bordered">
          <thead class="thead-inverse">
            <tr>
              <th>#</th>
              <th>Evento</th>
              <th>WorkFlow</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody id="tablaDisparadorListadoBody">
          </tbody>
        </table>
        
        <div align="center">
            <ul class="pagination" id="paginationContentDisparador"></ul>
        </div>

      </div>
      <div class="modal-footer">
        <button onclick="guardarTablaDisparadorPendiente();location.reload();" type="button" class="btn btn-default" data-dismiss="modal">Guardar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalRecuperar -->
<div class="modal fade" id="modalRecuperar" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Recuperar</h4>
      </div>
      <div class="modal-body">
        <label for="recuperarId">Id de Workflow :&nbsp;</label><input type="text" name="recuperarId" id="recuperarId">
        <hr>
        <div id="tableListLoad"></div>
      </div>
      <div class="modal-footer">
        <button onclick="loadWF('svg-flow','recuperarId');" type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalGuardar -->
<div class="modal fade" id="modalGuardar" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Guardar</h4>
      </div>
      <div class="modal-body">
      	<label for="guardarNombre">&nbsp;&nbsp;&nbsp;Nombre :&nbsp;</label><input type="text" name="guardarNombre" id="guardarNombre">
      </div>
      <div class="modal-footer">
        <button onclick="saveWF('guardarNombre');modalMsjOk('Se han guardado los cambios Con Exito.');" type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalGuardarId -->
<div class="modal fade" id="modalGuardarId" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Guardar</h4>
      </div>
      <div class="modal-body">
        <label for="guardarNombre">Desea guardar los cambios realizados?</label>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="callWSSave(actualID,'','',graphJSON,generateJSONsteps());modalMsjOk('Se han guardado los cambios Con Exito.');" >Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="$('#modalGuardar').modal();">Guardar Como</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalConfigurarAutomaticaNodo -->
<div class="modal fade" id="modalConfigurarAutomaticaNodo" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Configurar Tarea Automatica</h4>
      </div>
      <div class="modal-body">
        <div id="modalConfigurarAutomaticaNodoMensaje"></div>
        <label>Tipo</label>
        <select onchange="configurarTareaAutoOpcionCombo(document.getElementById('tipoAuto').options[document.getElementById('tipoAuto').selectedIndex].text)" id="tipoAuto" >
          <option>[Seleccionar]</option>
          <option>MAIL</option>
          <option>SMS</option>
          <option>VALIDACION</option>
        </select>
        <select id="tiposAuto" name="tiposAuto" multiple="multiple" size=3>
          <option value="cliente">Cliente</option>
          <option value="poliza">Poliza</option>
          <option value="fijo">Fijo</option>
        </select>
        <div id="modalConfigurarAutomaticaOpcionComboMensaje"></div>
      </div>
      <div class="modal-footer">
        <button onclick="renameNodes(getNodesSelected());" type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalRenombrarNodo -->
<div class="modal fade" id="modalRenombrarNodo" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Renombrar Nodo</h4>
      </div>
      <div class="modal-body">
      	<div id="modalRenombrarNodoMensaje"></div>
      </div>
      <div class="modal-footer">
        <button onclick="renameNodes(getNodesSelected());" type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalRenombrarConector -->
<div class="modal fade" id="modalRenombrarConector" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Renombrar Conectores</h4>
      </div>
      <div class="modal-body">
        <div id="modalRenombrarConectorMensaje"></div>
      </div>
      <div class="modal-footer">
        <button onclick="renameConnectors(getConnectorsSelected());" type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalModificarRegistro -->
<div class="modal fade" id="modalModificarRegistro" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modificar registro</h4>
      </div>
      <div class="modal-body">
        <input type="hidden" name="idGridMod" id="idGridMod">
        <label for="nombreGridMod" style="width:100px">Nombre :</label><input type="text" name="nombreGridMod" id="nombreGridMod"><br>
        <label for="tipoGridMod" style="width:100px">Tipo :</label><input type="text" name="tipoGridMod" id="tipoGridMod"><hr>
        <h4>Configurar Disparador</h4>
        <label for="selectAccionDisparador" style="width:100px;vertical-align : top;">Evento :</label>
        <select multiple size="3" id="selectAccionDisparador">
          <option>Emitir Orden Poliza</option>
          <option>Crear Cliente</option>
          <option>Crear Campaña</option>
        </select>
        <a onclick="for(i=0;i<document.getElementById('selectAccionDisparador').length;i++){document.getElementById('selectAccionDisparador')[i].selected=true;}">&nbsp;Seleccionar todo</a>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" 
          onclick="opcionAceptarModificarGridWf('idGridMod','nombreGridMod','tipoGridMod')">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalAceptarEliminar -->
<div class="modal fade" id="modalAceptarEliminar" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><img src="img/alerta.png">  Aviso</h4>
      </div>
      <div class="modal-body">
        <input type="hidden" name="idGridDelete" id="idGridDelete">
        <div>¿Esta seguro de eliminar el registro?.</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="deleteWF('idGridDelete');location.reload();">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalAceptarSalir -->
<div class="modal fade" id="modalAceptarSalir" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><img src="img/alerta.png">  Aviso</h4>
      </div>
      <div class="modal-body">
        <div>Recuerde guardar los cambios antes de salir del Editor.</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="location.href='index.php';">Aceptar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalAlerta -->
<div class="modal fade" id="modalAlerta" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><img src="img/alerta.png">  Aviso</h4>
      </div>
      <div class="modal-body">
        <div id="modalAlertaMensaje"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>

<!-- modalAceptar -->
<div class="modal fade" id="modalAceptar" role="dialog">
  <div class="modal-dialog">
    
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><img src="img/aceptar.png">  Ok</h4>
      </div>
      <div class="modal-body">
        <div id="modalAceptarMensaje"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>