<!DOCTYPE html>
<html>
  <head>
    <title>Workflow Designer</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="css/styles.grid.css">
  </head>
  <body>
    <div class="jumbotron" align="center">
      <h4 class="container head-grid-wf">diseñador de workflows</h4>    
    </div>
    <div class="container responsive">
      <div>
        <input type="button" class="btn btn-default btn-letter-violet" onclick="location.href='editor.php';" value="Nuevo">
        <input type="button" class="btn btn-default btn-letter-violet" onclick="principalMenuOpcionModificar();" value="Modificar">
        <input type="button" class="btn btn-default btn-letter-violet" onclick="principalMenuOpcionEditor();" value="Editor">
        <input type="button" class="btn btn-default btn-letter-violet" onclick="principalMenuOpcionDisparador();" value="Disparador">
        <input type="button" class="btn btn-default btn-letter-violet" onclick="principalMenuOpcionEliminar();" value="Eliminar">
      </div>
      <br>
      
      <div class="grid-container-wf">
        <table class="table table-hover table-bordered">
          <thead class="thead-inverse">
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha de Creacion</th>
            </tr>
          </thead>
          <tbody id="tableContentWfList"></tbody>
        </table>
      </div>

      <div align="center">
        <ul class="pagination" id="paginationContentWfList"></ul>
      </div>

    </div>
    <div class="jumbotron" align="center">
      <a onclick="window.location.reload(true);">Powered by ÜLTU ®.</a>    
    </div>
    
    <?php include 'modal.php' ?>

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js" ></script>
    <script src="js/utils.webservice.js"></script>
    <script src="js/utils.modal.grid.js"></script>
    <script src="js/utils.grid.js"></script>
  </body>
</html>