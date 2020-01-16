// Video Class
// v1.0 15th June 2017
// Jon Williams

function Video (args) {

  var args = args || {};
  this.id = args.id || 'video';
  this.src = args.src || [];
  this.width = args.width || 400;
  this.height = args.height || 200;
  this.fullscreen = args.fullscreen || false;
  this.controls = (typeof args.controls === 'undefined') ? true : args.controls;
  this.autoplay = (typeof args.autoplay === 'undefined') ? true : args.autoplay;
  this.loop = (typeof args.loop === 'undefined') ? true : args.loop;
  this.fallback = (typeof fallback === 'undefined') ? '<div class="video-error">Your browser does not support the video tag.</div>' : args.fallback;
  this.containerCSS = args.containerCSS || '';
  this.timeControl = args.timeControl || false;
  this.timeControlClass = args.timeControlClass || 'time-controlled';


  this.video_source_html = function (filename) {

    var extension = filename.substr(filename.lastIndexOf('.') + 1);

    if (extension == 'webm') {
      return '<source src="' + filename + '" type="video/webm">';
    } else if (extension == 'ogg' || extension == 'ogv') {
      return '<source src="' + filename + '" type="video/ogg">';
    }

    // default - use mp4
    return '<source src="' + filename + '" type="video/mp4">';

  }

  if (this.src.length < 1) { console.log('Video must have at least one source!'); return false; }

  if (this.fullscreen) {
    html = '<div class="video-container-fullscreen">';
  } else {
    html = '<div class="video-container" style="width:' + this.width + 'px; height:' + this.height + 'px; ' + this.containerCSS + '">';
  }

  html += '<video id="' + this.id + '"';
  if (this.controls) { html += ' controls="controls" '; }
  if (this.loop) { html += ' loop '; }
  if (this.autoplay) { html += ' autoplay '}

  if (this.fullscreen) {
    html += ' style="width:100%;height:100%;"';
  } else {
    html += ' width="' + this.width + '" height="' + this.height + '">';
  }

  // sources
  for (var i = 0; i < this.src.length; i++) {
    html += this.video_source_html(this.src[i]);
  }

  //fallback
  if (this.fallback) { html += this.fallback; }

  // end
  html += '</video></div>';

  if (this.fullscreen) { $('#button-narration').hide(); } 

  document.write(html);
  this.video = document.getElementById(this.id);

  var my_this = this;
  if (this.timeControl) { this.video.addEventListener('timeupdate', function (data) { my_this.timeControl(data); }); }

  this.timeControl = function (data) {

    var my_this = this.video;

    $('.' + this.timeControlClass).each( function () {

      var $el = $(this);
      var start = $el.attr('start') || 0;
      var end = $el.attr('end') || my_this.duration;
      var onShow = $el.attr('onShow') || false;
      var onHide = $el.attr('onHide') || false;

      if (my_this.currentTime >= start && my_this.currentTime <= end) {

        if (!$el.is(':visible')) {
          $el.show();
          eval(onShow);
        }

      } else {

        if ($el.is(':visible')) {
          $el.hide();
          eval(onHide);
        }

      }

    });

  }



}
