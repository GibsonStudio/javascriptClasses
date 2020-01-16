// Drag and Drop Class
// v1.2 13th December 2017: Moved CSS into class.js
// v1.1 6ty July 2017
// Jon Williams

var DragDrop;


function DragDrop (args) {

  var args = args || {};
  this.objectsContainerID = args.objectsContainerID || 'dragdrop-objects-container';
  this.targetsContainerID = args.targetsContainerID || 'dragdrop-targets-container';
  this.showSubmit = (typeof args.showSubmit === 'undefined') ? true : args.showSubmit;
  this.alignment = args.alignment || false;
  this.width = args.width || 100;
  this.height = args.height || 50;
  this.fontSize = args.fontSize || 12;
  this.UI = (typeof args.UI === 'undefined') ? true : args.UI;
  this.textOutput = (typeof args.textOutput === 'undefined') ? true : args.textOutput;

  this.objects = [];
  this.selected = false;

  DragDrop = this;


  this.addObject = function (args) {

    var args = args || {};
    args.targetsContainerID = args.targetsContainerID || this.targetsContainerID;
    args.width = this.width;
    args.height = this.height;
    args.fontSize = this.fontSize;
    args.alignment = this.alignment;
    var o = new DragObject(args);
    this.objects.push(o);

  }


  this.render = function () {

    // style
    if ($('#DragDrop-style').length == 0) {
      var html = '<style id="DragDrop-style">';
      html += '#dragdrop-objects-container { text-align: center; }';
      html += '#dragdrop-targets-container { position: relative; }';
      html += '.dragdrop-object { text-align: center; padding-top: 16px; margin: 10px; box-sizing: border-box; cursor: pointer; vertical-align: top; position:relative; overflow:hidden; }';
      html += '.dragdrop-source { display: inline-block; background: #fafafa; }';
      html += '.dragdrop-target { position: absolute; border: 1px solid #333333; background: #ffffff; box-sizing: border-box; overflow:hidden; }';
      html += '.dragdrop-over { border: 1px dotted #3e4899; background: #bdc6e6; }';
      html += '.dragdrop-being-dragged { border: 1px dotted #fecb11; background: #ffec96; }';
      html += '.dragdrop-correct { border: 1px solid #116d31; background: #e3efda; }';
      html += '.dragdrop-wrong { border: 1px solid #e40f18; background: #f5dcec; }';
      html += '#dragdrop-output { font-size: 18px; }';
      html += '</style>';
      document.write(html);
    }

    // objects

    var objectsHtml = '';

    for (var i = 0; i < this.objects.length; i++) {
      objectsHtml += this.objects[i].getHtml();
    }

    $('#' + this.objectsContainerID).html(objectsHtml);


    // targets

    var targetsHtml = '';

    for (var i = 0; i < this.objects.length; i++) {
      targetsHtml += this.objects[i].getTargetHtml();
    }

    $('#' + this.targetsContainerID).html(targetsHtml);


    // UI
    if (this.UI) { this.renderUI(); }


  }



  this.renderUI = function () {

    if (this.showSubmit) {
      var html = '<div style="text-align:center;"><button class="button" onclick="DragDrop.submit()">Submit</div>';
      document.write(html);
    }

    if (this.textOutput) {
      var html = '<div style="text-align:center;"><div id="dragdrop-output"></div></div>';
      document.write(html);
    }

  }



  this.onDragStart = function (e) {
    e.dataTransfer.setData('Text', e.target.id);
  	$('#' + e.target.id).addClass('dragdrop-being-dragged');
    $('#' + e.target.id).removeClass('dragdrop-correct');
    $('#' + e.target.id).removeClass('dragdrop-wrong');

    if (DragDrop.selected) {
      $('#' + DragDrop.selected).removeClass('dragdrop-being-dragged');
      DragDrop.selected = false;
    }

  }

  this.onDragEnd = function (e) {
    e.preventDefault();
  	$('#' + e.target.id).removeClass('dragdrop-being-dragged');
  }

  this.onDragLeave = function (e) {
    e.preventDefault();
  	$('#' + e.target.id).removeClass('dragdrop-over');
  }


  this.onDrop = function (e) {

    e.preventDefault();

  	var grabbedid = e.dataTransfer.getData('Text');
  	var droppedid = e.target.id;

  	$('#' + droppedid).removeClass('dragdrop-over');
  	$('#' + grabbedid).removeClass('dragdrop-being-dragged');
  	$('#' + grabbedid).removeClass('dragdrop-correct');
  	$('#' + droppedid).removeClass('dragdrop-correct');
    $('#' + grabbedid).removeClass('dragdrop-wrong');
  	$('#' + droppedid).removeClass('dragdrop-wrong');

  	var grabbed = document.getElementById(grabbedid);
  	var dropped = document.getElementById(droppedid);

  	var grabbed_html = grabbed.innerHTML;

  	grabbed.innerHTML = dropped.innerHTML;
  	dropped.innerHTML = grabbed_html;

  }




  this.onDragOver = function (e) {
    e.preventDefault();
  	$('#' + e.target.id).addClass('dragdrop-over');
  }


  this.getObjectById = function (objectId) {

    for (var i = 0; i < this.objects.length; i++) {
      if (this.objects[i].id == objectId) {
        return this.objects[i];
      }
    }

    return false;

  }


  this.getObjectByPosition = function (position) {

    for (var i = 0; i < this.objects.length; i++) {
      if (this.objects[i].correctPosition == position) {
        return this.objects[i];
      }
    }

    return false;

  }


  this.onClick = function (e) {

    $('#' + e.target.id).removeClass('dragdrop-correct');
    $('#' + e.target.id).removeClass('dragdrop-wrong');

    if (!DragDrop.selected) {

      // select object
      DragDrop.selected = e.target.id;
      $('#' + e.target.id).addClass('dragdrop-being-dragged');

    } else if (e.target.id != DragDrop.selected) {

      // swap objects
    	$('#' + DragDrop.selected).removeClass('dragdrop-being-dragged');

    	var clickedHtml = $('#' + e.target.id).html();

      $('#' + e.target.id).html($('#' + DragDrop.selected).html());
      $('#' + DragDrop.selected).html(clickedHtml);
      DragDrop.selected = false;

    } else {

      // de-select object
      $('#' + DragDrop.selected).removeClass('dragdrop-being-dragged');
      DragDrop.selected = false;

    }

  }



  this.submit = function () {

    var score = 0;

    for (var i = 0; i < this.objects.length; i++) {

      if (this.objects[i].correctPosition >= 0) {

        // check in correct position
        var o = this.getObjectByPosition(i);

        if (o.text == $('#' + this.objects[i].id).html()) {
          score++;
          $('#' + this.objects[i].id).addClass('dragdrop-correct');
        }

      } else {

        // check in correct target
        $('#' + this.objects[i].targetId).removeClass('dragdrop-correct');
        $('#' + this.objects[i].targetId).removeClass('dragdrop-wrong');
        if ($('#' + this.objects[i].targetId).html() == this.objects[i].text) {
          score++;
          $('#' + this.objects[i].targetId).addClass('dragdrop-correct');
        } else if ($('#' + this.objects[i].targetId).html()) {
          $('#' + this.objects[i].targetId).addClass('dragdrop-wrong');
        }

      }


    }


    if (this.textOutput) {
      if (score == this.objects.length) {
        $('#dragdrop-output').html('You got them all right, well done.');
      } else {
        $('#dragdrop-output').html('You scored ' + score + ' / ' + this.objects.length);
      }
    }


  }






}




function DragObject (args) {

  var args = args || {};
  this.index = args.index || DragDrop.objects.length;
  this.id = args.id || 'dragdrop-object-' + this.index;
  this.targetId = 'dragdrop-target-' + this.index;
  this.position = args.position || this.id;
  this.correctPosition = (typeof args.correctPosition === 'undefined') ? -1 : args.correctPosition;
  this.text = args.text || 'OBJECT';
  this.image = args.image || false;
  this.width = args.width || 100;
  this.height = args.height || 50;
  this.fontSize = args.fontSize || 12;
  this.alignment = args.alignment || false;
  this.targetsContainerID = args.targetsContainerID || 'dragdrop-targets-container';
  this.left = args.left || false;
  this.right = args.right || false;
  this.top = args.top || false;
  this.bottom = args.bottom || false;
  this.selected = false;

  this.getImageHtml = function () {
    var html = '<div style="width:' + this.width + 'px;height:' + this.height + 'px;background-image:url(' + this.image + ');position:absolute;left:0px;top:0px;pointer-events:none;"></div>';
    return html;
  }

  if (this.image) {
    this.text = this.getImageHtml();
  }


  this.getHtml = function () {
    var html = '<div id="' + this.id  + '" ';
    html += 'style="width:' + this.width + 'px;height:' + this.height + 'px;font-size:' + this.fontSize + 'px;';
    if (this.alignment == 'vertical') { html += 'display:block;margin:10px auto;'; }
    html += '" ';
    html += 'class="dragdrop-object dragdrop-source" draggable="true" ';
    html += 'ondragstart="DragDrop.onDragStart(event) " ';
    html += 'ondragend="DragDrop.onDragEnd(event)" ';
    html += 'ondragleave="DragDrop.onDragLeave(event)" ';
    html += 'ondrop="DragDrop.onDrop(event)" ';
    html += 'ondragover="DragDrop.onDragOver(event) " ';
    html += 'onclick="DragDrop.onClick(event) " ';
    html += '>';
    html += this.text;
    html += '</div>';
    return html;
  }





  this.getTargetHtml = function () {
    var html = '<div id="' + this.targetId + '" ';
    html += 'class="dragdrop-object dragdrop-target" ';
    html += 'style="width:' + this.width + 'px;height:' + this.height + 'px;font-size:' + this.fontSize + 'px; ';
    if (this.left) { html += 'left:' + this.left + 'px;';}
    if (this.right) { html += 'right:' + this.right + 'px;';}
    if (this.top) { html += 'top:' + this.top + 'px;';}
    if (this.bottom) { html += 'bottom:' + this.bottom + 'px;';}
    html += '" draggable="true" ';
    html += 'ondragstart="DragDrop.onDragStart(event) " ';
    html += 'ondragend="DragDrop.onDragEnd(event)" ';
    html += 'ondragleave="DragDrop.onDragLeave(event)" ';
    html += 'ondrop="DragDrop.onDrop(event)" ';
    html += 'ondragover="DragDrop.onDragOver(event) " ';
    html += 'onclick="DragDrop.onClick(event) " ';
    html += '></div>';
    return html;
  }


}
