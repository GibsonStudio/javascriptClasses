// Slider
// v1.5 13th December 2017: Moved CSS to class.js
// v1.4 24th July 2017
// Jon Williams
// REQUIRES: jQuery

function Slider (args) {

  var args = args || {};
  this.id = args.id || 'slider-' + Math.random().toString().substring(2);
  this.width = args.width || 400;
  this.callback = args.callback || false;
  this.label = args.label || false;
  this.min = args.min || 0;
  this.max = args.max || 100;
  this.val = args.value || 0;
  this.step = args.step || 0.1;
  this.css = args.css || '';
  this.labelCSS = args.labelCSS || '';
  this.autoAdd = (typeof args.autoAdd === 'undefined') ? true : args.autoAdd;
  this.slider = false;
  this.showValue = args.showValue || false;
  this.valueUnits = args.valueUnits || '';
  this.roundDisplayValue = args.roundDisplayValue || false;


  this.add = function () {

    document.write(this.html());
    this.slider = document.getElementById(this.id);

    if ($('#Slider-style').length == 0) {
      var html = '<style id="Slider-style">';
      html += '.widget-slider { -webkit-appearance: none; margin: 0px; width: 100%; }';
      html += '.widget-slider:focus { outline: none; }';
      html += '.widget-slider::-webkit-slider-thumb { -webkit-appearance:none;width:18px;height:18px;background:#666666;border:none;cursor:pointer; }';
      html += '.widget-slider::-webkit-slider-runnable-track { width: 100%; height: 18px; cursor: pointer; background: #e2e2e2; }';
      html += '.widget-slider::-ms-track { width: 100%; cursor: pointer; background: transparent; border: none; border-color: transparent; color: transparent; }';
      html += '.widget-slider::-ms-thumb { height: 18px; width: 18px; background: #3e4899; border: none; cursor: pointer; }';
      html += '.widget-slider::-ms-track { width: 100%; height: 18px; cursor: pointer; background: #e2e2e2; }';
      html += '.widget-slider::-ms-fill-lower { background: transparent; }';
      html += '.widget-slider::-moz-range-thumb { height: 18px; width: 18px; background: #3e4899; cursor: pointer; border-radius: 0px; border: none; }';
      html += '.widget-slider::-moz-range-track { width: 100%; height: 18px; cursor: pointer; background: #e2e2e2; }';
      html += '</style>';
      document.write(html);
    }

    //add events
    var myThis = this;
    this.slider.addEventListener('input', function () { myThis.update(this.value); });
    this.slider.addEventListener('change', function () { myThis.update(this.value); });

  }


  this.update = function (v) {
    if (this.callback) { eval(this.callback + '(' + v + ')'); }
    if (this.showValue) { this.displayValue(v); }
  }


  this.displayValue = function (v) {
    if (this.roundDisplayValue) { v = this.round(v, this.roundDisplayValue); }
    var h = v;
    if (this.valueUnits) { h += this.valueUnits; }
    $('#' + this.id + '-value').html(h);
  }


  this.html = function () {

    var h = '';

    h += '<div style="margin: 4px auto; width:' + this.width + 'px; ';
    if (this.label || this.showValue) { h += 'background: #fcfcfc; border: 1px solid #e2e2e2;'; }
    h += this.css + '">';

    h += '<input type="range" id="' + this.id + '" class="widget-slider" ';
    h += 'style="width:' + this.width + 'px;" ';
    h += 'min="' + this.min + '" ';
    h += 'max="' + this.max + '" ';
    h += 'value="' + this.val + '" ';
    h += 'step="' + this.step + '" ';
    h += ' />';

    if (this.label || this.showValue) {
      h += '<div style="font-family:\'Arial\';font-size:12px; font-weight:bold; text-align:left; color:#999999; padding-left:4px;' + this.labelCSS + '">';
      if (this.label) { h += this.label; }
      if (this.label && this.showValue) { h += ' : '; }
      if (this.showValue) { h += '<span id="' + this.id + '-value">' + this.val + this.valueUnits + '</span>'; }
      h += '</div>';
    }

    h += '</div>';

    return h;

  }


  this.round = function (num, nearest) {
  	var factor = 1 / nearest;
  	var result = Math.round(num * factor) / factor;
  	return result;
  }


  this.set = function (v) {
    $('#' + this.id).val(v);
    if (this.showValue) { this.displayValue(v); }
    eval(this.callback + '(' + v + ');');
  }


  if (this.autoAdd) { this.add(); }


}
