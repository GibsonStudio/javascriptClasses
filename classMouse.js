
function Mouse (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.debugElement = args.debugElement || false;
  this.ini = args.ini || false;
  this.callback = args.callback || false;
  //this.offsetX = args.originElement ? document.getElementById(args.originElement).offsetLeft : 0;
  //this.offsetY = args.originElement ? document.getElementById(args.originElement).offsetTop : 0;
  this.offsetX = args.originElement ? document.getElementById(args.originElement).getBoundingClientRect().x : 0;
  this.offsetY = args.originElement ? document.getElementById(args.originElement).getBoundingClientRect().y : 0;

  this.handleEvent = function (e) {

    if (e.targetTouches) {
      if (e.targetTouches.length == 1) { e = e.targetTouches[0]; }
    }

    this.x = e.pageX - this.offsetX;
    this.y = e.pageY - this.offsetY;
    if (this.callback) { window[this.callback](this); }

    if (this.debugElement) {
      var h = this.x + ', ' + this.y;
      document.getElementById(this.debugElement).innerHTML = h;
    }

  }

  document.body.addEventListener('mousemove', this, false);
  document.body.addEventListener('touchmove', this, false);

  if (this.ini) { window[this.ini](this); }

  return this;

}
