
var jLib = new jLib({ keysEnabled:false });


Number.prototype.d2r = function () { return (this / 180) * Math.PI; }
Number.prototype.r2d = function () { return (this / Math.PI) * 180; }


Number.prototype.round = function (nearest = 1)
{
  var factor = 1 / nearest;
  var result = Math.round(this * factor) / factor;
  if (nearest >= 1) { result = Math.round(result); }
  return result;
}



Array.prototype.contains = function (val) {
  for (var i = 0; i < this.length; i++) { if (val == this[i]) { return true; } }
  return false;
}



Array.prototype.randomize = function ()  {

  //takes an array, shuffles elements and returns randomized array
  var random_loops = this.length * 5;
  for (var i = 0; i < random_loops; i++) {
  	var index_1 = Math.floor(Math.random() * this.length);
  	var index_2 = Math.floor(Math.random() * this.length);
  	var el_1 = this[index_1];
  	var el_2 = this[index_2];
  	this[index_1] = el_2;
  	this[index_2] = el_1;
  }
  return this;
}



function jLib (args) {

  var args = args || {};
  this.keysEnabled = args.keysEnabled || false;


  // keys
  this.keys = {};
  if (this.keysEnabled) {
    var myThis = this;
    document.addEventListener("keydown", function (event) { myThis.keyDown(event); });
    document.addEventListener("keyup", function (event) { myThis.keyUp(event); });
  }
  this.keyDown = function (e) { this.keys[e.code] = true; }
  this.keyUp = function (e) { this.keys[e.code] = false; }


  // trig
  this.sin = function (myAngle) { return Math.sin(myAngle.d2r()); }
  this.cos = function (myAngle) { return Math.cos(myAngle.d2r()); }
  this.tan = function (myAngle) { return Math.tan(myAngle.d2r()); }

  this.asin = function (myRatio) { return Math.asin(myRatio).r2d(); }
  this.acos = function (myRatio) { return Math.acos(myRatio).r2d(); }
  this.atan = function (myRatio) { return Math.atan(myRatio).r2d(); }


  this.getAngle = function (x, y, xOrigin, yOrigin) {
    var xOrigin = xOrigin || 0;
    var yOrigin = yOrigin || 0;
    var dx = x - xOrigin;
    var dy = y - yOrigin;
    if (dy == 0) { dy = 0.00000001; }
    var my_angle = this.atan(dx/dy);
    if (dy < 0) { my_angle = 180 + my_angle; } else if (dx < 0 && dy > 0) { my_angle = 360 + my_angle; }
    return my_angle;
  }


  this.random = function (min, max, step) {
    var min = min || 0;
    var max = max || 100;
  	var step = step || 1;
  	var range = max - min;
  	var num = min + (Math.random() * range);
    num = num.round(step);
  	return num;
  }




}








//
