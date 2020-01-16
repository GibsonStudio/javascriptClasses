// Audio Class
// v1.1 20th June 2017
// Jon Williams

function Audio (args) {

  var args = args || {};
  this.src = args.src || [];
  this.id = args.id || 'audio';
  this.controls = (typeof args.controls === 'undefined') ? true : args.controls;
  this.autoplay = (typeof args.autoplay === 'undefined') ? true : args.autoplay;
  this.loop = args.loop || false;
  this.defaultContainer = (typeof args.defaultContainer === 'undefined') ? true : args.defaultContainer;
  this.narration = args.narration || false;
  this.timeControl = args.timeControl || false;
  this.timeControlClass = args.timeControlClass || 'time-controlled';
  this.narrationWordCount = 0;
  this.audio = this;


  /* ******* functions ******** */

  this.audio_source_html = function (filename) {

    var extension = filename.substr(filename.lastIndexOf('.') + 1);

    if (extension == 'ogg') {
      return '<source src="' + filename + '" type="audio/ogg">';
    } else if (extension == 'wav') {
      return '<source src="' + filename + '" type="audio/wav">';
    }

    // default - use mp3
    return '<source src="' + filename + '" type="audio/mp3">';

  }


  this.addSpansToNarration = function ()
  {

    if (document.getElementById('narration-text') && this.narration) {

      var text = $('#narration-text').html();
      var words = text.split(" ");
      var html = '';
      this.narrationWordCount = words.length;

      for (var i = 0; i < words.length; i++) {
        html += '<span id="narration-word-' + (i + 1) + '" class="narration-word" onclick="CBT.audio.narrationGoTo(' + i + ');">' + words[i] + ' </span>';
      }

      $('#narration-text').html(html);

    }

  }


  this.timeControl = function (data) {

    var my_this = this.audio;

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


  this.narrationTick = function (data)
  {

    if (this.narration) {
      var narration_progress = this.audio.currentTime / this.audio.duration;
      var word_index = Math.ceil(narration_progress * this.narrationWordCount);
      this.hilightNarrationWord(word_index);
    }

  }


  this.narrationEnded = function (data)
  {
    $('.narration-word').removeClass('narration-hilighted');
  }



  this.hilightNarrationWord = function (word_index)
  {
    word_index++;
    $('.narration-word').removeClass('narration-hilighted');
    $('#narration-word-' + (word_index - 1)).addClass('narration-hilighted');
    $('#narration-word-' + word_index).addClass('narration-hilighted');
    $('#narration-word-' + (word_index + 1)).addClass('narration-hilighted');
  }


  this.narrationGoTo = function (index)
  {
    var ratio = index / this.narrationWordCount;
    this.audio.currentTime = this.audio.duration * ratio;
    this.audio.play();
  }






  /* ******** ini ******** */

  if (this.src.length < 1) { console.log('Audio must have at least one source!'); return false; }

  var html = '<audio id="' + this.id + '"';
  if (this.controls) { html += ' controls '; }
  if (this.autoplay) { html += ' autoplay '; }
  if (this.loop) { html += ' loop '; }
  html += '>';

  // add sources
  for (var i = 0; i < this.src.length; i++) {
    html += this.audio_source_html(this.src[i]);
  }

  html += '</audio>';

  if (this.defaultContainer) {
    $('#audio-container').html(html);
  } else {
    document.write(html);
  }

  var my_this = this;
  this.audio = document.getElementById(this.id);

  if (this.narration) {
    this.audio.addEventListener('timeupdate', function (data) { my_this.narrationTick(data); });
    this.audio.addEventListener('ended', function (data) { my_this.narrationEnded(data); });
    this.addSpansToNarration();
    CBT.addNarrationToggle();
    CBT.narrationTextShow();
  }

  if (this.timeControl) {
    this.audio.addEventListener('timeupdate', function (data) { my_this.timeControl(data); });
  }









}
