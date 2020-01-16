//JW ImageSlider Class
//v1.1 27/11/2017 - added touch events

function ImageSlider (args) {

  var args = args || {};

  this.id             = args.id || 'image-slider-' + Math.ceil(Math.random() * 1000000);
  this.width          = args.width || 500;
  this.height         = args.height || 500;
  this.imageLeft      = args.imageLeft || '';
  this.imageRight     = args.imageRight || '';

  this.buttonSize     = args.buttonSize || 40;
  this.buttonColor    = args.buttonColor || '#CCCCCC';
  this.lineWidth      = args.lineWidth || 2;
  this.lineColor      = args.lineColor || '#888888'; //this.buttonColor;

  this.containerCss   = args.containerCss || 'margin:auto; margin-bottom:' + (this.buttonSize) + 'px; border:1px solid ' + this.buttonColor + ';';

  this.linePosition = args.linePosition === undefined ? 0.5 : args.linePosition;
  this.linePosition = this.width * this.linePosition;

  this.active = false;


  this.html = function ()
  {

    //container
    var html = '<div id="' + this.id + '-container" style="width:' + this.width + 'px; height:' + this.height + 'px; position: relative;' + this.containerCss + '">';

    //image right
    html += '<div id="' + this.id + '-image-right" style="position: absolute; width:' + this.width + 'px; height:' + this.height + 'px; left: 0px; top: 0px; background-image: url(' + this.imageRight + ');"></div>';

    //image left
    html += '<div id="' + this.id + '-image-left" style="position: absolute; width:' + this.linePosition + 'px; height:' + this.height + 'px; left: 0px; top: 0px; background-image: url(' + this.imageLeft + ');"></div>';

    //line
    html += '<div id="' + this.id + '-line" style="width:' + this.lineWidth + 'px; height:' + this.height + 'px; position: absolute; left:' + (this.linePosition - (this.lineWidth / 2)) + 'px; top: 0px; background-color:' + this.lineColor + ';"></div>';

    //button
    html += '<div id="' + this.id + '-button" style="width:' + this.buttonSize + 'px; height:' + this.buttonSize + 'px; position:absolute; left:' + (this.linePosition - (this.buttonSize / 2)) + 'px; bottom:-' + (this.buttonSize / 2) + 'px; background-color:' + this.buttonColor + '; cursor: pointer; border:1px solid ' + this.lineColor + '; border-radius:' + this.buttonSize + 'px;"></div>';

    html += '</div>';

    return html;

  };


  this.init = function ()
  {

    var scope = this;
    document.write(this.html());
    document.getElementById(this.id + '-button').addEventListener('mousedown', function (e) { scope.start(e); } );
    document.getElementById(this.id + '-line').addEventListener('mousedown', function (e) { scope.start(e); } );
    document.addEventListener('mouseup', function (e) { scope.stop(e) } );
    document.addEventListener('mousemove', function (e) { scope.move(e); } );

  	//touch events
  	document.getElementById(this.id + '-button').addEventListener('touchstart', function (e) { scope.start(e); } );
  	document.getElementById(this.id + '-button').addEventListener('touchend', function (e) { scope.stop(e); } );
  	document.getElementById(this.id + '-button').addEventListener('touchmove', function (e) {
  		e.preventDefault();
  		if (e.targetTouches.length == 1) {
  			var touch = e.targetTouches[0];
  			scope.move(touch);
  		}
  	});

  };


  this.init();


  this.start = function (e) { e.preventDefault(); this.active = true; };
  this.stop = function (e) { e.preventDefault(); this.active = false; };


  this.move = function (e)
  {

    //e.preventDefault();

    if (this.active) {

      var x = e.pageX - $('#' + this.id + '-container').offset().left;
      x = Math.max(0, Math.min(x, $('#' + this.id + '-container').width()));

      var button_x = x - ($('#' + this.id + '-button').width() / 2);
      $('#' + this.id + '-button').css({ left: button_x + 'px' });

      var line_x = x - ($('#' + this.id + '-line').width() / 2);
      $('#' + this.id + '-line').css({ left: line_x + 'px' });

      $('#' + this.id + '-image-left').width(line_x);

    }

  };

}










function ImageSliderV (args) {

  var args = args || {};

  this.id             = args.id || 'image-slider-' + Math.ceil(Math.random() * 1000000);
  this.width          = args.width || 500;
  this.height         = args.height || 500;
  this.imageTop       = args.imageTop || '';
  this.imageBottom    = args.imageBottom || '';

  this.buttonSize     = args.buttonSize || 40;
  this.buttonColor    = args.buttonColor || '#CCCCCC';
  this.lineWidth      = args.lineWidth || 2;
  this.lineColor      = args.lineColor || '#888888'; //this.buttonColor;

  this.containerCss   = args.containerCss || 'margin:auto; margin-bottom:' + (this.buttonSize) + 'px; border:1px solid ' + this.buttonColor + ';';

  this.linePosition = args.linePosition === undefined ? 0.5 : args.linePosition;
  this.linePosition = this.height * this.linePosition;

  this.active = false;


  this.html = function ()
  {

    //container
    var html = '<div id="' + this.id + '-container" style="width:' + this.width + 'px; height:' + this.height + 'px; position: relative;' + this.containerCss + '">';

    //image bottom
    html += '<div id="' + this.id + '-image-bottom" style="position: absolute; width:' + this.width + 'px; height:' + this.height + 'px; left: 0px; top: 0px; background-image: url(' + this.imageBottom + ');"></div>';

    //image top
    html += '<div id="' + this.id + '-image-top" style="position: absolute; width:' + this.width + 'px; height:' + this.linePosition + 'px; left: 0px; top: 0px; background-image: url(' + this.imageTop + ');"></div>';

    //line
    html += '<div id="' + this.id + '-line" style="width:' + this.width + 'px; height:' + this.lineWidth + 'px; position:absolute; left: 0px; top:' + (this.linePosition - (this.lineWidth / 2)) + 'px; background-color:' + this.lineColor + '; "></div>';

    //button
    html += '<div id="' + this.id + '-button" style="width:' + this.buttonSize + 'px; height:' + this.buttonSize + 'px; position:absolute; right:-' + (this.buttonSize / 2) +'px; top:' + (this.linePosition - (this.buttonSize / 2)) + 'px; background-color:' + this.buttonColor + '; cursor:pointer; border:1px solid ' + this.lineColor + '; border-radius:' + this.buttonSize + 'px;"></div>';

    html += '</div>';

    return html;

  };


  this.init = function ()
  {

    var scope = this;
    document.write(this.html());
    document.getElementById(this.id + '-button').addEventListener('mousedown', function (e) { scope.start(e); } );
    document.getElementById(this.id + '-line').addEventListener('mousedown', function (e) { scope.start(e); } );
    document.addEventListener('mouseup', function (e) { scope.stop(e) } );
    document.addEventListener('mousemove', function (e) { scope.move(e); } );

  };


  this.init();


  this.start = function (e) { e.preventDefault(); this.active = true; };
  this.stop = function (e) { e.preventDefault(); this.active = false; };


  this.move = function (e)
  {

    e.preventDefault();

    if (this.active) {

      var y = e.pageY - $('#' + this.id + '-container').offset().top;
      y = Math.max(0, Math.min(y, $('#' + this.id + '-container').height()));

      var button_y = y - ($('#' + this.id + '-button').height() / 2);
      $('#' + this.id + '-button').css({ top: button_y + 'px' });

      var line_y = y - ($('#' + this.id + '-line').height() / 2);
      $('#' + this.id + '-line').css({ top: line_y + 'px' });

      $('#' + this.id + '-image-top').height(line_y);

    }

  };

}
