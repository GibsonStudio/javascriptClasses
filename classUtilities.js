

function jMath ( args ) {

  var args = args || {};
  this.origin = args.origin || { x:0, y:0 };

  this.toRadians = function (angle) { return (angle / 180) * Math.PI; }
  this.toDegrees = function (angle) { return (angle / Math.PI) * 180; }

  this.getAngle = function (x, y, xOrigin, yOrigin) {
    var xOrigin = xOrigin || this.origin.x;
    var yOrigin = yOrigin || this.origin.y;
    var dx = x - xOrigin;
    var dy = y - yOrigin;
    if (dy == 0) { dy = 0.00000001; }
    var my_angle = this.atan(dx/dy);
    if (dy < 0) { my_angle = 180 + my_angle; } else if (dx < 0 && dy > 0) { my_angle = 360 + my_angle; }
    return my_angle;
  }


  this.sin = function (myAngle) { return Math.sin(this.toRadians(myAngle)); }
  this.cos = function (myAngle) { return Math.cos(this.toRadians(myAngle)); }
  this.tan = function (myAngle) { return Math.tan(this.toRadians(myAngle)); }

  this.asin = function (myRatio) { return this.toDegrees(Math.asin(myRatio)); }
  this.acos = function (myRatio) { return this.toDegrees(Math.acos(myRatio)); }
  this.atan = function (myRatio) { return this.toDegrees(Math.atan(myRatio)); }

  this.random = function (min, max, step)
  {
    var min = min || 0;
    var max = max || 100;
  	var step = step || 1;
  	var range = max - min;
  	var num = min + (Math.random() * range);
  	num = this.round(num, step);
  	return num;
  }


  this.round = function (num, nearest)
  {
  	var factor = 1 / nearest;
  	var result = Math.round(num * factor) / factor;
  	return result;
  }

}




function Arrays () {

  this.randomize = function (myArray)  {
  	//takes an array, shuffles elements and returns randomized array
  	var random_loops = myArray.length * 5;
  	for (var i = 0; i < random_loops; i++) {
  		var index_1 = Math.floor(Math.random() * myArray.length);
  		var index_2 = Math.floor(Math.random() * myArray.length);
  		var el_1 = myArray[index_1];
  		var el_2 = myArray[index_2];
  		myArray[index_1] = el_2;
  		myArray[index_2] = el_1;
  	}
  	return myArray;
  }


  this.inArray = function (value, array) {
  	r = false;
  	for (var i = 0; i < array.length; i++) { if (value == array[i]) { r = true; } }
  	return r;
  }

}




function Browser () {

  this.getUrlParam = function (param, def)
  {
  	var return_val = def || '';
  	var params = window.location.search.substring(1);
  	params = params.split('&');
  	for (var i = 0; i < params.length; i++) {
  		var this_param = params[i].split('=');
  		if (this_param[0] == param) { return this_param[1]; }
  	}
  	return def;
  }


  this.setCookie = function (name, value)
  {
  	var days = 100;
  	var date = new Date();
  	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  	var expires = "; expires=" + date.toGMTString();
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/;";
  }


  this.getCookie = function (name)
  {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

}
