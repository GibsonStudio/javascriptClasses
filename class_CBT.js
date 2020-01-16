// CBT class
// v1.2, 3rd August 2017
// Jon Williams

var CBT;

function CBT (args) {

  var args = args || {};
  this.title = (typeof args.title === 'undefined') ? true : args.title;
  this.lo = args.lo || false;
  this.extras = args.extras || [];
  this.loadIni = (typeof args.loadIni === 'undefined') ? true : args.loadIni;
  this.loadAudioClass = (typeof args.loadAudioClass === 'undefined') ? true : args.loadAudioClass;

  // fixed vars
  this.name = '';
  this.scenes = [];
  this.sceneIndex = 0;
  this.audio = false;
  this.narrationTextVisible = true;

  // config
  this.locallibDir = args.locallibDir || '../lib/';
  this.libDir = args.libDir || '../../../lib/js/';
  this.libExternalDir = args.libExternalDir || '../../../lib/js_external/';
  this.imageDir = args.imageDir || '../img/';

  CBT = this;


  /* ******** init ******** */

  this.init = function () {

    this.sceneIndex = this.get_current_scene_index();
    var my_this = this;

    //add key listener
  	window.addEventListener('keydown', function (e) { my_this.keyboardShortcuts (e); });

    // add title from cbt.js?
    if (this.title !== false) {
      $('#header-title').html(this.scenes[this.sceneIndex][1]);
    }

    console.log('CBT init OK');

  }




  this.keyboardShortcuts = function (e)
  {

  	var key = e.keyCode;
    var my_this = this;

  	switch (key) {

  		case 37: // left arrow
  			my_this.previous();
  			break;
  		case 39: // right arrow
  			my_this.next();
  			break;
  		case 32: // ctrl + space
  			if (e.ctrlKey) { $('#debug').slideToggle(); }
  			break;
  		default:
  			//nothing

  	}

  }



  /* ******** html generation ******** */

  this.addHtmlHead = function () {

    var html = '<link href="' + this.locallibDir + 'style.css" type="text/css" rel="stylesheet">';
    html += '<script type="text/javascript" src="' + this.libExternalDir + 'jQuery-1.11.2.min.js"></script>';

    if (this.loadAudioClass && !this.inArray('Howler', this.extras)) { html += '<script type="text/javascript" src="' + this.libDir + 'class_Audio.js"></script>'; }

    if (this.loadIni) { html += '<script type="text/javascript" src="cbt.js"></script>'; }

    for (var i = 0; i < this.extras.length; i++) {

      var object = this.extras[i];

      if (object == 'Video') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Video.js"></script>';
      } else if (object == 'jQueryRotate') {
        html += '<script type="text/javascript" src="' + this.libExternalDir + 'jQueryRotate.2.2.js"></script>';
      } else if (object == 'Slider') {
        html += '<link href="' + this.libDir + 'class_Slider.css" type="text/css" rel="stylesheet">';
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Slider.js"></script>';
      } else if (object == 'ImageSlider') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_ImageSlider.js"></script>';
      } else if (object == 'Slideshow') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Slideshow.js"></script>';
      } else if (object == 'Toggle') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Toggle.js"></script>';
      } else if (object == 'Canvas') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Canvas.js"></script>';
      } else if (object == 'Graph') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Canvas.js"></script>';
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Graph.js"></script>';
      } else if (object == 'RT') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_RT.js"></script>';
        html += '<link href="' + this.libDir + 'class_RT.css" type="text/css" rel="stylesheet">';
      } else if (object == 'Quiz') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Quiz.js"></script>';
        html += '<link href="' + this.libDir + 'class_Quiz.css" type="text/css" rel="stylesheet">';
      } else if (object == 'Bullets') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_Bullets.js"></script>';
        html += '<link href="' + this.libDir + 'class_Bullets.css" type="text/css" rel="stylesheet">';
      } else if (object == 'Math') {
        html += '<script type="text/javascript" src="' + this.libExternalDir + 'MathJax/MathJax.js?config=MML_CHTML"></script>';
      } else if (object == 'DragDrop') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_DragDrop.js"></script>';
        html += '<link href="' + this.libDir + 'class_DragDrop.css" type="text/css" rel="stylesheet">';
      } else if (object == 'QuizEquation') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_QuizEquation.js"></script>';
        html += '<link href="' + this.libDir + 'class_QuizEquation.css" type="text/css" rel="stylesheet">';
      } else if (object == 'DropWords') {
        html += '<script type="text/javascript" src="' + this.libDir + 'class_DropWords.js"></script>';
        html += '<link href="' + this.libDir + 'class_DropWords.css" type="text/css" rel="stylesheet">';
      } else if (object == 'ThreeJS') {
        html += '<script type="text/javascript" src="' + this.libExternalDir + 'three.min.js"></script>';
        html += '<script type="text/javascript" src="' + this.libExternalDir + 'ColladaLoader.js"></script>';
      } else if (object == 'Howler') {
        html += '<script type="text/javascript" src="' + this.libExternalDir + 'howler.min.js"></script>';
      } else {

        // not a recognized object so add according to file extension
        var extension = object.substr(object.lastIndexOf('.') + 1);

        if (extension == 'js') {
          html += '<script type="text/javascript" src="' + this.libDir + object + '"></script>';
        } else if (extension == 'css' ) {
          html += '<link type="text/css" rel="stylesheet" href="' + this.libDir + object + '">';
        } else {
          console.log('ERROR: ' + object + ' is not a recognized object.');
        }

      }

    }

    document.write(html);

  }


  this.addHeader = function () {

    this.nav();
    this.debug();

    var html = '<div id="header">';

    // lo container
    if (this.lo) { html += '<div id="lo">' + this.lo + '</div>'; }

    // header title
    html += '<div id="header-title">';
    if (this.title) { html += this.title; }
    html += '</div>';

    // audio container
    html += '<div id="audio-container"></div>';

    // buttons
    html += '<div id="navigation-buttons-container">';
    html += '<div class="navigation-button" style="background-image:url(' + this.imageDir + 'previous.svg);" onclick="CBT.previous();"></div>';
    html += '<div class="navigation-button" style="background-image:url(' + this.imageDir + 'next.svg);" onclick="CBT.next();"></div>';
    html += '<div class="navigation-button" style="background-image:url(' + this.imageDir + 'nav.svg);" onclick="CBT.navToggle();"></div>';
    //html += '<div class="navigation-button" style="background-image:url(' + this.imageDir + 'settings.svg);" onclick="CBT.narrationHilite_toggle();"></div>';
    html += '</div>';

    html += '</div>'; <!-- #header -->

    document.write(html);

  }



  this.addKeypoint = function (args) {

    var args = args || {};
    var text = args.text || 'This is a keypoint';
    var position = args.position || 'right'; // left, right, center
    var css = args.css || '';
    var clearfix = args.clearfix || false;

    if (position == 'right') { css = 'float:right;margin:0px 10px 10px 10px;' + css; }
    else if (position == 'left') { css = 'float:left;margin:0px 10px 10px 10px;' + css; }
    else if (position == 'center') { css = 'margin: auto;' + css; }

    var html = '<div class="keypoint" style="background-image:url(' + this.imageDir + 'keypoint.png);' + css + '">' + text + '</div>';

    if (clearfix) { html += '<div style="clear:both;"></div>'; }

    document.write(html);

  }





  /* ******** nav ******** */

  this.nav = function () {

    var html = '<div id="nav">';

    html += '<div class="nav-title">' + this.name + '</div>';
  	html += '<ol>';

  	for (var i = 0; i < this.scenes.length; i++)
  	{
      if (this.scenes[i][0] == 'HEADING') {
        html += '<div class="nav-heading">' + this.scenes[i][1] + '</div>';
      } else {
        html += '<li><a href="' + this.scenes[i][0] + '">' + this.scenes[i][1] + '</a></li>';
      }
  	}

  	html += '</ol></div>';

    document.write(html);

  }


  this.navToggle = function () {
    $('#nav').slideToggle();
  }






  /* ******** audio ******** */

  this.addAudio = function (args) {

    var args = args || {};
    var a = new Audio(args);
    if (!this.audio) { this.audio = a; }
    return a;

  }






  /* ******** video ******** */

  this.addVideo = function (args) {
    var args = args || {};
    return new Video(args);
  }







  /* ******** narration ******** */

  this.addNarrationToggle = function () {
    var html = '<div class="navigation-button" style="background-image:url(' + this.imageDir + 'narration.svg);" onclick="CBT.narrationTextToggle();"></div>';
    $('#navigation-buttons-container').append(html);
  }


  this.narrationTextToggle = function () {

    this.narrationTextVisible = !this.narrationTextVisible;

    if (this.narrationTextVisible) {
      this.narrationTextShow();
    } else {
      this.narrationTextHide();
    }

  }


  this.narrationTextShow = function () {
    $('#narration-text').show();
    $('body').addClass('background-blue');
  }


  this.narrationTextHide = function () {
    $('#narration-text').hide();
    $('body').removeClass('background-blue');
  }




  /* ******** cbt scene logic ******** */

  this.next = function () {

    var newSceneIndex = this.sceneIndex;

    for (var i = newSceneIndex + 1; i < this.scenes.length; i++) {
      if (this.scenes[i][0] != 'HEADING') { newSceneIndex = i; break; }
    }

    window.location.href = this.scenes[newSceneIndex][0];

  }


  this.previous = function () {

    var newSceneIndex = this.sceneIndex;

    for (var i = newSceneIndex - 1; i >= 0; i--) {
      if (this.scenes[i][0] != 'HEADING') { newSceneIndex = i; break; }
    }

    window.location.href = this.scenes[newSceneIndex][0];

  }


  this.get_current_scene_index = function () {

    var current_url = window.location.toString();
  	var current_scene = current_url.substr(current_url.lastIndexOf("/") + 1);

  	for (var i = 0; i < this.scenes.length; i++) {
  		if (this.scenes[i][0] == current_scene) { return i; }
  	}

  	return -1;

  }







  /* ******** debug ******** */

  this.debug = function () {

    //TODO - needs a close button

  	var tester = this.getCookie('debug_tester') || '';

  	var html = '<div id="debug">';

  	html += '<div class="debug-heading">Amendment:</div>';

  	html += '<table style="width:100%;">';

  	html += '<tr><td class="debug-field-title">Tester:</td><td><input id="amendment_tester" style="width:99%;" value="' + tester + '" /></td></tr>';

  	html += '<tr><td class="debug-field-title">Type:</td><td><select id="amendment_type">';
  	html += '<option value="0">Default</option>';
  	html += '<option value="1">Audio</option>';
  	html += '<option value="2">Graphic</option>';
  	html += '<option value="3">Text</option>';
  	html += '</select></td></tr>';

  	html += '<tr><td class="debug-field-title">God Mode:</td><td><input id="amendment_password" type="password" value="" /></td></tr>';

  	html += '<tr><td colspan="2" class="debug-field-title">Comment:</td></tr>';
  	html += '<tr><td colspan="2"><textarea id="amendment_comment" style="width:98%; height: 140px;" onkeydown="event.stopPropagation();"></textarea></td></tr>';

  	html += '<tr><td colspan="2"><button class="button" style="width:100%;" onclick="CBT.saveDebug()">Save</button></td></tr>';

  	html += '</table>';

  	html += '</div>';

  	document.write(html);

  }



  this.saveDebug = function () {

  	//check fields are not blank
  	if ($('#amendment_tester').val() == '') { alert('Tester cannot be blank.'); return; }
  	if ($('#amendment_comment').val() == '') { alert('Comment cannot be blank.'); return; }

  	//save info in cookies
  	this.setCookie('amendment_tester', $('#amendment_tester').val());

  	var amendment_url = 'http://amendments.oxfordinteractive.com/index.php/amendment/add';

  	var approved = 0;
  	if ($('#amendment_password').val() == 'gibson') { approved = 1; }

  	var my_data = [
  		['author', $('#amendment_tester').val()],
  		['comment', $('#amendment_comment').val()],
  		['url', window.location.toString()],
  		['filename', window.location.toString() + ' (' + this.name + ')'],
  		['frame', this.sceneIndex + 1],
  		['approved', approved],
  		['type', $('#amendment_type').val()]
  	];

  	var form = document.createElement('form');
  	form.setAttribute('method', 'POST');
  	form.setAttribute('action', amendment_url);
  	form.setAttribute('target', 'amendment_form');

  	for (i in my_data) {
  		var input = document.createElement('input');
  		input.type = 'hidden';
  		input.name = my_data[i][0];
  		input.value = my_data[i][1];
  		form.appendChild(input);
  	}

  	document.body.appendChild(form);

  	window.open('', 'amendment_form', 'width=730,height=345,resizable=yes,scrollbars=yes');
    form.submit();
    document.body.removeChild(form);

  }








  /* ******** utilities ******** */

  this.random = function (min, max, step) {
    var min = min || 0;
    var max = max || 100;
  	var step = step || 1;
  	var range = max - min;
  	var num = min + (Math.random() * range);
  	num = this.round(num, step);
  	return num;
  }


  this.round = function (num, nearest) {
  	var factor = 1 / nearest;
  	var result = Math.round(num * factor) / factor;
  	return result;
  }


  this.toRadians = function (angle) { return (angle / 180) * Math.PI; }
  this.toDegrees = function (angle) { return (angle / Math.PI) * 180; }


  this.randomizeArray = function (my_array)
  {
  	//takes an array, shuffles elements and returns randomized array
  	var random_loops = my_array.length * 5;
  	for (var i = 0; i < random_loops; i++) {
  		var index_1 = Math.floor(Math.random() * my_array.length);
  		var index_2 = Math.floor(Math.random() * my_array.length);
  		var el_1 = my_array[index_1];
  		var el_2 = my_array[index_2];
  		my_array[index_1] = el_2;
  		my_array[index_2] = el_1;
  	}
  	return my_array;
  }


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


  this.inArray = function (value, array) {
  	r = false;
  	for (var i = 0; i < array.length; i++) { if (value == array[i]) { return true; } }
  	return r;
  }


  this.getAngle = function (x1, y1, x2, y2)
  {
    var x2 = x2 || 0;
    var y2 = y2 || 0;
    var dx = x1 - x2;
    var dy = y1 - y2;
    if (dy == 0) { dy = 0.00000001; }
    var my_angle = Math.atan(dx / dy);
    my_angle = this.toDegrees(my_angle);
    if (dy < 0) { my_angle = 180 + my_angle; } else if (dx < 0 && dy > 0) { my_angle = 360 + my_angle; }
    return my_angle;
  }



  /* ******** cookies ******** */

  this.setCookie = function (name, value) {

    var days = 100;
  	var date = new Date();
  	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  	var expires = "; expires=" + date.toGMTString();
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/;";

  }


  this.getCookie = function (name, def) {

    var def = def || '';
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }

    return def;

  }


/* end of class */
}
