// Graph
// Jon Williams
// v1.0 3rd August 2017: Added drawPoint() and clear().


function Graph (args) {

  var args = args || {};

  // object / canvas size
  this.width = args.width || 500;
  this.height = args.height || 500;

  // x axis
  this.xMin = args.xMin || -10;
  this.xMax = args.xMax || 10;
  this.xStep = args.xStep || 0;
  this.xFixed = args.xFixed || 'default';
  this.xNumbers = args.xNumbers || false;

  // y axis
  this.yMin = args.yMin || -10;
  this.yMax = args.yMax || 10;
  this.yStep = args.yStep || 0;
  this.yFixed = args.yFixed || 'default';
  this.yNumbers = args.yNumbers || false;

  // the args are currently not working as intended
  this.xPixMin = args.xPixMin || 0;
  this.xPixMax = args.xPixMax || this.width;
  this.yPixMin = args.yPixMin || this.height;
  this.yPixMax = args.yPixMax || 0;

  // canvas
  this.canvasId = args.canvasId || 'my-canvas';
  this.axisColor = args.axisColor || '#000000';
  this.color = args.color || '#005EB8';
  this.autoDrawCanvas = (typeof args.autoDrawCanvas === 'undefined') ? true : args.autoDrawCanvas;
  this.css = args.css || false;
  this.canvas = new Canvas({ id:this.canvasId, width:this.width, height:this.height, autoDrawCanvas:this.autoDrawCanvas, css:this.css });

  // misc
  this.graduationLineLength = args.graduationLineLength || 10;
  this.graduationFontSize = args.graduationFontSize || 10;


  this.getX = function (x)
  {
    var px = ((this.xPixMax - this.xPixMin) / (this.xMax - this.xMin)) * x;
    var ox = this.getOx();
    var rx = ox + px;
    return rx;
  }


  this.getY = function (y)
  {
    var py = ((this.yPixMin - this.yPixMax) / (this.yMin - this.yMax)) * y;
    var oy = this.getOy();
    var ry = (oy + py);
    return ry;
  }


  this.getOx = function ()
  {
    var range = this.xMax - this.xMin;
    var pix_range = this.xPixMax - this.xPixMin;
    var pix_factor = pix_range / range;
    var ox = Math.abs(this.xMin * pix_factor);
    return ox;
  }


  this.getOy = function ()
  {
    var range = this.yMin - this.yMax;
    var pix_range = this.yPixMax - this.yPixMin;
    var pix_factor = pix_range / range;
    var oy = Math.abs(this.yMax * pix_factor);
    return oy;
  }


  this.xToPixels = function (x)
  {
    var range = this.xMax - this.xMin;
    var pix_range = this.xPixMax - this.xPixMin;
    var pix_factor = pix_range / range;
    var pix = x * pix_factor;
    return pix;
  }


  this.yToPixels = function (y)
  {
    var range = this.yMin - this.yMax;
    var pix_range = this.yPixMax - this.yPixMin;
    var pix_factor = pix_range / range;
    var pix = y * pix_factor;
    return pix;
  }


  this.pixelsToX = function (pix)
  {
    var range = this.xMax - this.xMin;
    var pix_range = this.xPixMax - this.xPixMin;
    var pix_factor = pix_range / range;
    var x = pix / pix_factor;
    return x;
  }


  this.pixelsToY = function (pix)
  {
    var range = this.yMin - this.yMax;
    var pix_range = this.yPixMax - this.yPixMin;
    var pix_factor = pix_range / range;
    var y = pix / pix_factor;
    return y;
  }


  this.drawAxis = function ()
  {

    this.canvas.line(this.xPixMin, this.getOy(), this.xPixMax, this.getOy(), { lineWidth:1, strokeStyle:this.axisColor });
    this.canvas.line(this.getOx(), this.yPixMin, this.getOx(), this.yPixMax, { lineWidth:1, strokeStyle:this.axisColor });

    var ox = this.getOx();
    var oy = this.getOy();

    // lines on x axis
    if (this.xStep != 0) {
      var x_line_length = this.pixelsToY(this.graduationLineLength);
      for (var i = this.xStep; i <= this.xMax; i += this.xStep) {
        var x_text = i;
        if (this.xFixed != 'default') { x_text = x_text.toFixed(this.xFixed); }
        this.drawLine(i, 0, i, -x_line_length, { canvasId:this.canvasId, strokeStyle:this.axisColor });
        if (this.xNumbers) {
          this.canvas.text(this.getX(i) - (this.graduationFontSize / 2), this.getY(-x_line_length)+this.graduationFontSize, x_text, { fontSize: this.graduationFontSize, fillStyle:this.axisColor });
        }
      }
      for (var i = -this.xStep; i >= this.xMin; i -= this.xStep) {
        var x_text = i;
        if (this.xFixed != 'default') { x_text = x_text.toFixed(this.xFixed); }
        this.drawLine(i, 0, i, -x_line_length, { canvasId:this.canvasId, strokeStyle:this.axisColor });
        if (this.xNumbers) {
          this.canvas.text(this.getX(i) - (this.graduationFontSize / 1.6), this.getY(-x_line_length)+this.graduationFontSize, x_text, { fontSize: this.graduationFontSize, fillStyle:this.axisColor });
        }
      }
    }

    // lines on y axis
    if (this.yStep != 0) {
      var y_line_length = this.pixelsToX(this.graduationLineLength);
      for (var i = this.yStep; i <= this.yMax; i += this.yStep) {
        var y_text = i;
        if (this.yFixed != 'default') { y_text = y_text.toFixed(this.yFixed); }
        this.drawLine(0, i, -y_line_length, i, { canvasId:this.canvasId, strokeStyle:this.axisColor });
        if (this.yNumbers) {
          this.canvas.text(ox - this.graduationLineLength - (this.graduationFontSize * 2), this.getY(i) + (this.graduationFontSize / 3), y_text, { fontSize: this.graduationFontSize, fillStyle:this.axisColor });
        }
      }
      for (var i = -this.yStep; i >= this.yMin; i -= this.yStep) {
        var y_text = i;
        if (this.yFixed != 'default') { y_text = y_text.toFixed(this.yFixed); }
        this.drawLine(0, i, -y_line_length, i, { canvasId:this.canvasId, strokeStyle:this.axisColor });
        if (this.yNumbers) {
          this.canvas.text(ox - this.graduationLineLength - (this.graduationFontSize * 2), this.getY(i) + (this.graduationFontSize / 3), y_text, { fontSize: this.graduationFontSize, fillStyle:this.axisColor });
        }
      }
    }

  }


  this.drawLine = function (x1, y1, x2, y2, args) {
    var args = args || {};
    args.strokeStyle = args.strokeStyle || this.color;
    args.lineWidth = args.lineWidth || 1;
    this.canvas.line(this.getX(x1), this.getY(y1), this.getX(x2), this.getY(y2), { lineWidth:args.lineWidth, strokeStyle:args.strokeStyle } );
  }


  this.drawPoint = function (x, y, args) {
    var args = args || {};
    var size = args.size || 4;
    var x = this.getX(x);
    var y = this.getY(y);
    this.canvas.line(x - size, y - size, x + size, y + size, args);
    this.canvas.line(x + size, y - size, x - size, y + size, args);
  }



  this.clear = function () {
    this.canvas.clear();
    this.drawAxis();
  }


  this.drawGraph = function (args) {

    var args = args || {};
    var equation = args.equation || 'y = Math.sin((x / 180) * Math.PI)';
    var step = args.step || 0.1;
    var strokeStyle = args.strokeStyle || '#000000';
    var lineWidth = args.lineWidth || 1;

    var xPrev = 0;
    var yPrev = 0;
    var drawLine = false;

    for (var i = this.xMin; i <= this.xMax; i += step) {

      var x = i;
      eval('var ' + equation);

      if (drawLine) {
        this.canvas.line(this.getX(xPrev), this.getY(yPrev), this.getX(x), this.getY(y), { strokeStyle:strokeStyle, lineWidth:lineWidth });
      }
      xPrev = x;
      yPrev = y;
      drawLine = true;
    }

  }



  this.drawSin = function (args) {

    //demo function that draws a sine wave

    var args = args || {};
    var strokeStyle = args.strokeStyle || this.color;
    var lineWidth = args.lineWidth || 1;

    var prev_x = 0;
    var prev_y = 0;

    for (var i = this.xMin; i <= this.xMax; i += 2) {

      //get angle as radians and calculate y
      var x = (i / 180) * Math.PI;
      var y = Math.sin(x);

      if (i > this.xMin) { this.canvas.line(this.getX(prev_x), this.getY(prev_y), this.getX(i), this.getY(y), { lineWidth:lineWidth, strokeStyle:strokeStyle }); }

      prev_x = i;
      prev_y = y;

    }

  }





}
