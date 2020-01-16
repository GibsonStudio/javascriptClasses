// Click to reveal bullet points
// v1.1 14th December 2017: Moved CSS into class.js
// v1.0 14th June 2017
// Jon Williams

var Bullets;

function Bullets (args) {

  var args = args || {};
  this.bullets = args.bullets || [];
  this.showInstructions = (typeof args.showInstructions === 'undefined') ? true : args.showInstructions;
  this.callbackComplete = args.callbackComplete || false;
  Bullets = this;



  this.addBullet = function (args) {

    var args = args || {};
    this.bullets.push(new Bullet(args));

  }


  this.render = function () {

    var html = '';

    if ($('#Bullets-style').length == 0) {
      html += '<style id="Bullets-style">';
      html += '.bullet-instructions { font-size: 14px; color: #999999; text-align: center; margin-bottom: 10px; }';
      html += '.bullet-container { position: relative; min-height: 70px; }';
      html += '.bullet-number { position: absolute; left: 10px; top: 10px; font-weight: bold; font-size: 20px; text-align: center; background-color: #fdbc5f; padding: 14px 0px 14px 0px; width: 50px; height: 50px; box-sizing: border-box; cursor: pointer; }';
      html += '.bullet-text { padding-left: 70px; padding-top: 26px; font-size: 18px; }';
      html += '.bullet-revealled { background: #f2f2f2; color: #c2c2c2; cursor: inherit; }';
      html += '</style>';
    }

    // add instructions?
    if (this.showInstructions) { html += '<div class="bullet-instructions">(Click each bullet point to reveal)</div>'; }

    // add bullets
    for (var i = 0; i < this.bullets.length; i++) {
      var b = this.bullets[i];
      html += '<div class="bullet-container">'
      html += '<div class="bullet-number no-select" id="bullet-button-' + i + '" onclick="Bullets.show(' + i + ');">' + (i + 1) + '</div>';
		  html += '<div class="bullet-text" style="display:none;" id="bullet-' + i + '">' + b.text + '</div>';
      html += '</div>';
    }

    document.write(html);

  }


  this.show = function (index) {

    $('#bullet-' + index).show();
    $('#bullet-button-' + index).addClass('bullet-revealled');
    if (this.bullets[index].callback && (this.bullets[index].callbackMultiple || !this.bullets[index].clicked) ) { eval(this.bullets[index].callback); }
    this.bullets[index].clicked = true;

    // have all been revealled?
    if (this.callbackComplete) { this.checkComplete(); }

  }


  this.checkComplete = function () {

    for (var i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].clicked) { return false; }
    }

    eval(this.callbackComplete);
    this.callbackComplete = false;

  }


}



function Bullet (args) {

  var args = args || {};
  this.clicked = false;
  this.text = args.text || 'This is a bullet';
  this.callback = args.callback || false;
  this.callbackMultiple = args.callbackMultiple || false;

}
