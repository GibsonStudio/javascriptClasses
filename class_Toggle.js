// Toggle Class
// v2.1 15th December 2017 - Updated toggle images
// v2.0 5th July 2017
// Jon Williams
// REQUIRES: jQuery



function Toggle (args) {

  var args = args || {};
  this.id = args.id || 'toggle-' + Math.random().toString().substring(2);
  this.value = (typeof args.value === 'undefined') ? true : args.value;
  this.cursor = args.cursor || 'pointer';
  this.css = args.css || '';
  this.callback = args.callback || '';
  this.label = args.label || '';
  this.containerCSS = args.containerCSS || '';
  this.labelCSS = args.labelCSS || '';
  this.autoAdd = (typeof args.autoAdd === 'undefined') ? true : args.autoAdd;


  // define image data for toggles

  this.toggleOnImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAcCAYAAAAjmez3AAAACXBIWXMAAAsSAAALEgHS3X78AAADCUlEQVRYw91Yz2saQRT+3AoKUnaTw0oOEXMwJwWhuQWJkpvQYo85dfMfVCh4tB5zaOx/sPaUYwMNuYUYgjdDQyM56CFiDiEG4i4ScOuqPWTd7q9ZTTsmId9p3Z154zdv3vveGw8moFqtcgAEAGsAkgA4UEB3pGJvcIWTYQcnww66I9U6RAJQBnAEoIRETnKz55lAoKiRoIbuSMV2v44fg6uHTi0ByJIIeQgkMgBEWrs/Rnlwg0L/3Gn3p4UEYBOJ3O5EItVq9TOAPCjjS7+OHfWSlrmvSOSyRCJPSUIIRvGBjwEAvrXPULquPYgMYzlO1EmUBzdTeSLsY5FkF5FkFxH2sdOY/ojjrYyJiBbYIm0S3ZGKQv+c/Of9LMTlNOIB3vYtHuAhLqcR9ruSEnG8xRk9UqQd2ACw3a8TA1sIRvEzLkDgo+C8ftt3zuuHwGtjglHSEuPMCsagE9S9QUqxQjAKMZIG5/VNtMN5fRAjaTcyAo63OGYWJABgj0Ai7GdRXFr/m09VBU1Fto1rKjIkVdF/F5fW3Y6ZwGiKTR0nw47j+3xoVfeEpCpIne2g2XMg0pOROtvRyXBeH/KhVdJya4xWdjwakcx8RH/OXhzg9K5NtHF610b24sBxrgVJZhZBPo4R22psyOSNKbQCpeuayStJNuQYSgyeCG6e+JexXjwTNBUZZflSf34onoyIVQRL1zXiUXMSTCsYraKkjtce+x6V5ZbpvLtog0lzjHFVlluOVTGjNS/U8YaZc3y/e9swaYPbbscDvElzjHOte8RoHdijESm0KiavHMY2HD0jBKM4jG2YvFFoVUjLHXm0EqUzi/Sb6h25liims6EqenaKB3hb+bLZ2HdL13PMysqKpLWR1GPk7asFojZsNvZNJci9RtyX8UYSkqpMIlFCIid5DGX8BW1x7I5UvFMqxAo47GeRD60iMx+xeUBSFezeNlBoVRxLGEPru6QTMTRW32fRWH36/WviOKtiE7KTFe/H/fuzaXX/t29/mZcPL+o66EVd0DkQEvDMr0z/APy8kKlrwzMSAAAAAElFTkSuQmCC';

  this.toggleOffImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAcCAYAAAAjmez3AAAACXBIWXMAAAsSAAALEgHS3X78AAAC+0lEQVRYw92YQWgTQRSG/50myOIiCXhowFPTnARDcCBQxYZeAoFK7cGLoFEEoRRqe+ilB+2hB3toKZSClzYUvHhQQSj0Iq2oUFgpFfQSIwhCUhCyyIZQknQ9ZJPs7M7utpiR0B8Cm+yb7H7z5s17byT46GhkKAQgC2AYQApAyHq/IcuoDMRQiQ6ifDWJhiyjS9IA7ADYBZCjlGpexpIPwLIJcWKVaRLF0fFuArWUAzDtBiS5QIwB2LDP/knVkGX8un0Hfy5f6TaMBuA+pfSNL8jRyNAygMfdeOrv6ykUb45DgOYppU9dQU4CQdIZ9KUzzZnf3sLx9lZPwBDbcvL1hNQfgRRPND/9Ed+nXfywgwtfv4gAeaKq6hgDYgb2htfLB2bnIEVjznvRWPOeB9Slly/QV62KgNlQVTVk9ciyW2CTdAbB5zmQdAaSojhBFIWx4amvWkXk7SsRIK2dFcSSJ7gQgdk5gAPgkKIgMDvnChNW90R5Jauqaoi4QUj9EQQmpjo/6DqMw5LDzjgsAbre/h6YmHJdZuHPexCkLDEztnM53H3Q8YSuozYzCaNUdIKUiqjNTHZgFKU5lqPzhe+iQIaJWXY4l9W1G+3r+toKjELe9V+MQh71tRXuWAbkR14USIrwgpzEE4w3/HIFgKaNxSsknuAGvSCFiJ+Flyf+xbbbCpx2gFEqwjjYb1/3inxB7Enw2KMs4SXM/yViVpTsyx7ss+vdJTfYcw4TV6bX7FWxIGnEbF6cwfvxPZsbPGZbisaYnGMda1VlQJjHdojZgTlnb3Od8UpwaZXrGZLOILi0ynijsbnOB4kOigLZlcwSpexZolil6+3dSYrGHOVLfXHBNYa+zT8TtbzC5Ny7T5rZRnJzQ31xgSlBoCjtMp6B0HVPiDJNioLIUUq1Vh6Z5gV9C6b2KMsmPJuHGBuX1rc4KqS50sx373SIZmP12nd3smVs3u5k1897D0X07wBwq9W/n7rV7dW+/WwePpyp46AzdUDHAcqix49M/wIahUHC2CheGQAAAABJRU5ErkJggg==';

  this.styleElement = '<style id="Toggle-style"> .toggle-on { background-image:url(' + this.toggleOnImg + '); } .toggle-off { background-image:url(' + this.toggleOffImg + '); } </style>';




  /* ******** class functions ******** */

  this.add = function () {

    // add styleElement?
    if ($('#Toggle-style').length == 0) {
      document.write(this.styleElement);
    }

    // add toggle
    document.write(this.html());
    var myThis = this;
    document.getElementById(this.id).addEventListener('click', function (e) { myThis.clicked(); });
  }


  this.html = function () {

    var elClass = 'toggle-off';
    if (this.value) { elClass = 'toggle-on'; }

    var h = '';

    if (this.label) { h += '<div style="position:relative; overflow: hidden;' + this.containerCSS + '">'; }

    h += '<div id="' + this.id + '" style="width:50px; height:28px; cursor:' + this.cursor + '; ' + this.css + '" class="' + elClass + '"></div>';

    if (this.label) {
      h += '<div style="position:absolute; left:54px; top:8px; color:#999999; font-size:12px; font-weight:bold; ' + this.labelCSS + '">' + this.label + '</div>';
      h += '</div>';
    }

    return h;

  }


  this.set = function (v, callback) {
    var callback = (typeof callback === 'undefined') ? true : callback;
    this.value = v;
    if (this.value) {
      $('#' + this.id).removeClass('toggle-off');
      $('#' + this.id).addClass('toggle-on');
    } else {
      $('#' + this.id).removeClass('toggle-on');
      $('#' + this.id).addClass('toggle-off');
    }
    if (this.callback && callback) { eval(this.callback + '(' + this.value + ')'); }
  }


  this.clicked = function ()
  {
    this.toggle();
  }


  this.toggle = function () {
    this.value = !this.value;
    this.set(this.value);
  }


  if (this.autoAdd) { this.add(); }

}
