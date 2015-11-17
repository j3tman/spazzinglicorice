(function() {
  // 'use strict';
  var expect = chai.expect;

//fakeDraw simulates an event of clicking and dragging on the canvas.
  var fakeDraw = function() {
    var d = $.Event('mousedown');
    var e = $.Event('drag');

    d.offsetX = 0;
    d.offsetY = 0;
    
    e.offsetX = 5;
    e.offsetY = 5;
    $('canvas').trigger(d);
    $('canvas').trigger(e);
    $('canvas').trigger('dragend');
  };

  describe('whiteboard', function() {
    var spy;
    beforeEach(function() {
      App.context.ClearRect(0, 0, 20, 20);
    });
    // afterEach(function() {

    // });

    it('should draw a mark on the board', function() {
      var marked = false;
      fakeDraw();
      var imageData = App.context.getImageData(0, 0, 20, 20).data;
      for (var i = 0; i < imageData.length; i++) {
        marked = marked || imageData[i];
      }
      expect(marked).to.not.equal(0);
    });

    it('should get an empty board on new request', function() {
      // var $newButton = $('<button class="new"></button>');
      var $newButton = $('button.new');
      spy = sinon.spy($newButton, 'click');
      $newButton.trigger( "click" );
    });
  });

}());


//new board is empty

//drawing out of bounds doesnt add to board

//board persists on refresh

//board colors

//eraser works

//new board button works

