//===========global variables===========
//===========canvas init===========
angular.module('whiteboard', ['ui.router'])
.config(function($stateProvider){
  $stateProvider
    .state('eraser', {
      controller: 'toolbar'
    });
})
.controller('canvas', function($scope, tools){

  var canvas = $('#whiteboard');
// if (typeof G_vmlCanvasManager != 'undefined') {
//   canvas = G_vmlCanvasManager.initElement(canvas);
  context = canvas[0].getContext("2d");

  var mouse = {
    click: false,
    drag: false,
    x: 0, 
    y: 0  
  };

  //  pen = {
  //   fillStyle: 'solid',
  //   strokeStyle: "black",
  //   lineWidth: 5,
  //   lineCap: 'round'
  // };

  //=========== socket init functions here=====================


  //=========== init window/window resize functions here===========
  // var paint = false;



  //=========== mouse events============================
  var stroke = [];
  var draw = function(x, y) {
    context.lineTo(x, y);
    context.stroke();
  }
  // Mousedown
  canvas.on('mousedown', function(e) {
  //initialize mouse position
    mouse.click = true;
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    //initialize canvas render with current pen style
    for (key in tools.pen) {
      context[key] = tools.pen[key];
    }

    stroke.push([mouse.x, mouse.y]);
    //begin draw
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
  });



  //drag
  canvas.on('drag', function(e) {
      mouse.drag = true;
      var offset = $(this).offset();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      draw(x, y);
      stroke.push([x, y]);

  //emit data
      console.log([x, y]);
  });

  canvas.on('dragend', function(e) {
      mouse.drag = false;
      mouse.click = false;

   //sample of resulting data to be pushed to db
      console.log([stroke, tools.pen]);
      stroke = [];
   //socket end
  });

  //do we need this?
  canvas.onmouseout = function() {
    mouse.click = false;
    context.closePath();
  }
})

.controller('toolbar', function($scope, tools) {
  $scope.changePen = function(option) { 
    tools.changePen(option);
  };
})

.service('tools', function(){
  var pen = {
      fillStyle: 'solid',
      strokeStyle: "black",
      lineWidth: 5,
      lineCap: 'round'
    };

    var changePen = function(option) {
      if (option === 'eraser') {
        this.pen.lineWidth = 50;
        this.pen.strokeStyle = 'white'
      } else {
        this.pen.lineWidth = 5;
        this.pen.strokeStyle = option;
      }
  }
  return {changePen: changePen, pen: pen}


})
