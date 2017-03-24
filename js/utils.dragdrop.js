// target elements with the "draggable" class
interact('.draggable').draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    endOnly: false,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: false,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    var textEl = event.target.querySelector('p');

    textEl && (textEl.textContent =
      'moved a distance of '
      + (Math.sqrt(event.dx * event.dx +
                   event.dy * event.dy)|0) + 'px');
  }
});

function dragMoveListener (event) {
  draged=true;
  
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);

  // update JSON
  updateNodeJSON(target.id);

  // translate de links BEGIN
  targetNodeJSON = selectNodeIdJSON(event.target.id);
  targetNodeJSON.connectors.forEach(function(connector){

    if (connector.type=='COut' || connector.type=='CIn') {
      graphJSON.links.forEach(function(link){
          if (link.type=='line' && link.class.indexOf(connector.id+'-')>-1) {

            if (connector.type=='COut'){
              setPosLinkXYpoint1( link.id, 
                                  parseFloat(getPosLinkXYpoint1(link.id).x) + event.dx , 
                                  parseFloat(getPosLinkXYpoint1(link.id).y) + event.dy );
            }
            if (connector.type=='CIn'){
              setPosLinkXYpoint2( link.id, 
                                  parseFloat(getPosLinkXYpoint2(link.id).x) + event.dx , 
                                  parseFloat(getPosLinkXYpoint2(link.id).y) + event.dy );
            }
          }
          if (link.type=='cycle' && link.class.indexOf(connector.id+'-')>-1) {

            if (connector.type=='COut'){
              setPosLinkCycleXYpoint1( link.id, 
                                  parseFloat(getPosLinkCycleXYpoint1(link.id).x) + event.dx , 
                                  parseFloat(getPosLinkCycleXYpoint1(link.id).y) + event.dy );
            }
            if (connector.type=='CIn'){
              setPosLinkCycleXYpoint2( link.id, 
                                  parseFloat(getPosLinkCycleXYpoint2(link.id).x) + event.dx , 
                                  parseFloat(getPosLinkCycleXYpoint2(link.id).y) + event.dy );
            }
          }
          if (existId(link.id)) {updateLinkJSON(link.id);}
      });
    }
  });
  // translate de links END
}