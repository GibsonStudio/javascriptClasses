// BarGraph
// Jon Williams
// v1.0 14th December 2017


function BarGraph (args) {

  var args = args || {};

  // object / canvas size
  this.width = args.width || 500;
  this.height = args.height || 500;
  this.margin = (typeof args.margin === 'undefined') ? 60 : args.margin;
  this.items = args.items || [];
  this.fontSize = args.fontSize || 12;
  this.title = args.title || '';
  this.titleFontSize = args.titleFontSize || 20;

  //colors
  this.barColor = args.barColor || '#9BCBEB';
  this.barOutlineColor = args.barOutlineColor || '#666666';
  this.axisColor = args.axisColor || '#111111';
  this.labelColor = args.labelColor || '#333333';
  this.lightShadowColor = args.lightShadowColor || '#F2F2F2';
  this.darkShadowColor = args.darkShadowColor || '#CCCCCC';
  this.backgroundColor = args.backgroundColor || false;
  this.titleColor = args.titleColor || '#333333';

  // canvas
  this.canvasId = args.canvasId || 'BarGraph-' + Math.random().toString().substring(2);
  this.autoDrawCanvas = (typeof args.autoDrawCanvas === 'undefined') ? true : args.autoDrawCanvas;
  this.css = args.css || '';
  this.canvas = new Canvas({ id:this.canvasId, width:this.width, height:this.height, autoDrawCanvas:this.autoDrawCanvas, css:this.css });




  this.addItem = function (args) {
    var args = args || {};
    if (typeof args.position !== 'undefined') {
      this.items.splice(args.position, 0, new Item(args));
    } else {
      this.items.push(new Item(args));
    }
  }


  this.draw = function ()
  {

    this.canvas.clear();
    if (this.backgroundColor) { this.canvas.clear(this.backgroundColor); }

    var oX = this.margin;
    var max_X = this.width - this.margin;
    var oY = this.height - this.margin;
    var max_Y = this.height - (this.margin * 2);
    var max_Y_value = 0;

    if (this.title) {
      this.canvas.text( (this.width/2), (this.titleFontSize), this.title, { fontSize:this.titleFontSize, fillStyle:this.titleColor });
    }

    var bar_width = (this.width - (this.margin * 2)) / this.items.length;

    //calculate max_Y_value from largest value in $values array
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].value > max_Y_value) {
        max_Y_value = this.items[i].value;
      }
    }

    //draw bars
    var bar_number = 1;

    for (var i = 0; i < this.items.length; i++) {

      var barColor = this.items[i].color || this.barColor;
      bar_height = (this.items[i].value / max_Y_value) * max_Y;
      bar_X_origin = (bar_number - 1) * bar_width;

      this.canvas.rect(oX + bar_X_origin, oY, oX + bar_X_origin + bar_width, oY - bar_height, {fillStyle:barColor, strokeStyle:this.barOutlineColor });

      //add 3D bits
      var bar_left = oX + bar_X_origin;
      var bar_right = bar_left + bar_width;
      var bar_bottom = oY;
      var bar_top = oY - bar_height;

      var os = 20;

      this.canvas.polyline([
            [bar_left,bar_top],
            [bar_left + os, bar_top - os],
            [bar_right + os, bar_top - os],
            [bar_right, bar_top] ],
            { fillStyle:this.lightShadowColor, strokeStyle:this.barOutlineColor });

      this.canvas.polyline([
            [bar_right, bar_top],
            [bar_right + os, bar_top - os],
            [bar_right + os, bar_bottom - os],
            [bar_right, bar_bottom] ],
            { fillStyle:this.darkShadowColor, strokeStyle:this.barOutlineColor });

      //draw label
      var font_size = 10;
      this.canvas.text( oX + bar_X_origin + (bar_width / 2) - this.fontSize, oY + 4, this.items[i].label, {rotate:90, fontSize:this.fontSize, align:'left', fillStyle:this.labelColor });

      //finished - increment $bar_number so next bar draws in correct place
      bar_number++;

    }


    //draw axis - do this last so it overwrites the bars
    this.canvas.line( oX, oY, this.width - this.margin, oY, { strokeStyle:this.axisColor }); //x axis
    this.canvas.line( oX, oY, oX, this.margin, { strokeStyle:this.axisColor }); //y axis

    //draw x axis graduations
    for (var i = oX; i <= max_X; i += bar_width) {
      this.canvas.line( i, oY, i, oY + 10, { strokeStyle:this.axisColor });
    }


    var font_size = 10;

    //y-max
    this.canvas.line( oX, oY - max_Y, oX - 10, oY - max_Y, { strokeStyle:this.axisColor });
    this.canvas.text( oX - 40, oY - max_Y + (this.fontSize / 2), max_Y_value, { fontSize:this.fontSize, fillStyle:this.labelColor });

    //half y-max
    this.canvas.line( oX, oY - (max_Y / 2), oX - 10, oY - (max_Y / 2), { strokeStyle:this.axisColor });
    this.canvas.text( oX - 40, oY - (max_Y / 2) + (this.fontSize / 2), (max_Y_value / 2), { fontSize:this.fontSize, fillStyle:this.labelColor });

    //y origin
    this.canvas.line( oX, oY, oX - 10, oY, { strokeStyle:this.axisColor });
    this.canvas.text( oX - 40, oY + (this.fontSize / 2), '0', { fontSize:this.fontSize, fillStyle:this.labelColor });


  } // this.draw end

}



function Item (args) {

  var args = args || {};
  this.value = args.value || 1;
  this.label = args.label || '';
  this.color = args.color || false;

}
