<!DOCTYPE html>
<html>
  <head>
    <title>Workflow Designer</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="css/styles.editor.css">
  </head>

  <body>
    <nav class="banner-top">
      <div class="container">
        <label class="banner-top-text">DISEÑADOR DE WORKFLOWS / EDITOR</label>
      </div>
    </nav>
    <div class="container">
      <?php include 'menuEditor.php' ?>

      <div class="flow-back">
        <svg id="svg-flow" width="2000" height="600"></svg>
      </div>

      <?php include 'modal.php' ?>

      <script src="js/jquery.min.js"></script>
      <script src="js/bootstrap.min.js" ></script>
      <script src="js/interact.min.js"></script>
      <script src="js/utils.graphJSON.js"></script>
      <script src="js/utils.dragdrop.js"></script>
      <script src="js/utils.webservice.js"></script>
      <script src="js/utils.modal.editor.js"></script>
      <script src="js/utils.editor.js"></script>
      
      <script type="text/javascript">
        var actualID = <?php echo isset($_GET['id'])==true?$_GET['id']:'0';?>;
        if (actualID!=0) {callWSLoad(actualID,'svg-flow');}
        deselectAll();
      </script>
    </div>
  
  </body>
</html>