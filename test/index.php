<!DOCTYPE html>
<html>
  <head>
    <title>Mocha Tests</title>
    <link rel="stylesheet" href="node_modules/mocha/mocha.css">
    <!-- estilos de la solucion a testear-->
    <link rel="stylesheet" type="text/css" href="../css/styles.editor.css"> 
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bootstrap-theme.min.css">
    <!-- estilos de la solucion a testear-->
  </head>
  <body>
    <!-- body de la solucion a testear-->
    <div class="buttons-section" style='display:none;'>
      <?php include '../menuEditor.php' ?>
    </div>

    <div id="group" style='display:none;'>
      <svg id="svg-flow" width="1200" height="500" class=""></svg>
    </div>

    <div id="flow2" style='display:none;'>
      <svg id="svg-flow2" width="1200" height="500" class=""></svg>
    </div>

    <?php include '../modal.php' ?>
    
    <!-- body de la solucion a testear-->
    <div id="mocha"></div>
    <script src="node_modules/mocha/mocha.js"></script>
    <script src="node_modules/chai/chai.js"></script>
    <script>mocha.setup('tdd')</script>

    <!-- js a testear -->
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js" ></script>
    <script src="../js/interact.min.js"></script>
    <script src="../js/utils.graphJSON.js"></script>
    <script src="../js/utils.dragdrop.js"></script>
    <script src="../js/utils.editor.js"></script>
    <script src="../js/utils.modal.editor.js"></script>
    <script src="../js/utils.webservice.js"></script>
    <script src="js/tests.js"></script>
    <!-- js a testear -->
    <script>
      mocha.run();
    </script>
  </body>
</html>