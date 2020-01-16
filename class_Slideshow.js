//JW Slideshow Class
//v1.0 27/3/2017

function Slideshow (args)
{

  var args = args || {};

  this.id             = args.id || 'slideshow-' + Math.ceil(Math.random() * 1000000);
  this.width          = args.width || 400;
  this.height         = args.height || 225;
  this.images         = args.images || [];
  this.index          = args.index || 0;
  this.imageFolder    = args.imageFolder ? args.imageFolder + '/' : '';
  this.containerCSS   = args.containerCSS || 'border: 1px solid #CCCCCC; margin: auto; margin-top: 30px; margin-bottom: 30px;';
  this.intervalTime   = args.intervalTime || 0;

  this.timer          = false;


  this.html = function ()
  {

    var html = '<div id="' + this.id + '-container" style="width:' + this.width + 'px; height:' + this.height + 'px; position: relative; overflow: hidden; ' + this.containerCSS + '">';
    html += '<div id="' + this.id + '-image-1" style="position: absolute; left: 0px; top: 0px; width:' + this.width + 'px; height:' + this.height + 'px;"></div>';
    html += '<div id="' + this.id + '-image-2" style="position: absolute; left:' + this.width + 'px; top: 0px; width:' + this.width + 'px; height:' + this.height + 'px;"></div>';
    html += '</div>';

    return html;

  }


  this.init = function ()
  {

    var scope = this;
    document.write(this.html());
    $('#' + this.id + '-image-1').css({ 'background-image': 'url(' + this.imageFolder + this.images[0] + ')' });
    $('#' + this.id + '-image-2').css({ 'background-image': 'url(' + this.imageFolder + this.images[1] + ')' });

    document.getElementById(this.id + '-container').addEventListener('mousedown', function (e) { scope.click(e); } );

    if (this.intervalTime) {
      this.timer = setInterval(function () { scope.shift_right(); }, this.intervalTime);
    }

  }


  this.init();


  this.click = function (e)
  {

    e.preventDefault();

    var x = e.pageX - $('#' + this.id + '-container').offset().left;

    clearInterval(this.timer);

    if (x < ($('#' + this.id + '-container').width() / 4)) {
      this.shift_left();
    } else {
      this.shift_right();
    }

  }


  this.shift_left = function ()
  {

    var new_index = this.index - 1;
    if (new_index < 0) { new_index = this.images.length - 1; }

    $('#' + this.id + '-image-1').clearQueue();
    $('#' + this.id + '-image-1').stop();
    $('#' + this.id + '-image-2').clearQueue();
    $('#' + this.id + '-image-2').stop();

    $('#' + this.id + '-image-1').css({ 'background-image':'url(' + this.imageFolder + this.images[this.index] + ')', 'left':'0px' });
    $('#' + this.id + '-image-2').css({ 'background-image':'url(' + this.imageFolder + this.images[new_index] + ')', 'left':this.width + 'px' });

    $('#' + this.id + '-image-1').animate({ left: '-' + this.width + 'px'});
    $('#' + this.id + '-image-2').animate({ left: '0px'});

    this.index = new_index;

  }


  this.shift_right = function ()
  {

    var new_index = this.index + 1;
    if (new_index >= this.images.length) { new_index = 0; }

    $('#' + this.id + '-image-1').clearQueue();
    $('#' + this.id + '-image-1').stop();
    $('#' + this.id + '-image-2').clearQueue();
    $('#' + this.id + '-image-2').stop();

    $('#' + this.id + '-image-1').css({ 'background-image':'url(' + this.imageFolder + this.images[this.index] + ')', 'left':'0px' });
    $('#' + this.id + '-image-2').css({ 'background-image':'url(' + this.imageFolder + this.images[new_index] + ')', 'left':'-' + this.width + 'px' });

    $('#' + this.id + '-image-1').animate({ left: this.width + 'px'});
    $('#' + this.id + '-image-2').animate({ left: '0px'});

    this.index = new_index;

  }

}
