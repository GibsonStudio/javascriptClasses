// Drop Words
// v1.1 13th December 2017: MOved CSS to class.js
// v1.0 20th June 2017
// Jon Williams

function DropWords (args) {

  var args = args || {};
  this.id = args.id || 'DropWords-' + Math.floor(Math.random() * 1000000) + '-';
  this.text = args.text || [];
  this.wordGroups = args.wordGroups || [];
  this.renderInstructions = (typeof args.renderInstructions === 'undefined') ? true : args.renderInstructions;



  this.addWordGroup = function (wordGroup) {
    wordGroup.id = this.id + 'WordGroup-' + this.wordGroups.length;
    this.wordGroups.push(wordGroup);
  }


  this.submit = function () {

    var feedback = '';

    for (var i = 0; i < this.wordGroups.length; i++) {

      var val = $('#' + this.wordGroups[i].id).val();

      if (val == -1) {
        feedback += '<p>Please select a word for option ' + (i + 1) + '</p>';
        continue;
      }

      var word = this.wordGroups[i].words[val];

      $('#' + this.wordGroups[i].id).removeClass('word-correct');
      $('#' + this.wordGroups[i].id).removeClass('word-wrong');

      if (word.feedback) { feedback += '<p>' + word.feedback + '</p>'; }

      if (word.correct) {
        $('#' + this.wordGroups[i].id).addClass('word-correct');
      } else {
        $('#' + this.wordGroups[i].id).addClass('word-wrong');
      }

    }

    $('#' + this.id + 'dropWords-output').html(feedback);

  }


  this.getWordGroupHTML = function (wordGroup) {

    var html = '<select id="' + wordGroup.id + '" class="dropWords-select">';
    html += '<option value="-1">Choose....</option>';

    for (var i = 0; i < wordGroup.words.length; i++) {
      html += '<option value="' + i + '">' + wordGroup.words[i].text + '</option>';
    }

    html += '</select>';

    return html;

  }


  this.render = function () {

    var html = '';

    if ($('#DropWords-style').length == 0) {
      html += '<style id="DropWords-style">';
      html += '.word-correct { border: 1px solid #116d31 !important; background: #e3efda; }';
      html += '.word-wrong { border: 1px solid #df0000 !important; background: #facac8; }';
      html += '.dropWords-instructions { text-align:center; font-size: 14px; color: #cccccc; margin-bottom: 20px; }';
      html += '.dropWords-question { display: inline-block; background: #f2f2f2; border: 1px solid #4a5463; padding: 10px; margin-bottom: 20px; }';
      html += '#dropWords-output { margin-top: 20px; }';
      html += '.dropWords-select { margin: 0px 10px; }';
      html += '</style>';
    }

    html += '<div style="text-align: center;">';

    if (this.renderInstructions) {
      html += '<div class="dropWords-instructions">Select the correct words to compete the following:</div>';
    }

    html += '<div class="dropWords-question">';

    for (var i = 0; i < this.text.length; i++) {

      html += this.text[i];

      // add option drop?
      if (this.wordGroups[i]) {
        html += this.getWordGroupHTML(this.wordGroups[i]);
      }

    }

    html += '</div><br />';

    // UI
    html += '<button class="button" id="' + this.id + 'dropWords-submit">Submit</button>';
    html += '<div id="' + this.id + 'dropWords-output"></div>';

    html += '</div>';

    document.write(html);

    var my_this = this;
    document.getElementById(this.id + 'dropWords-submit').addEventListener('click', function (e) { my_this.submit(); });

  }





/* ******** end of DropWords ******** */
}




function WordGroup (args) {

  var args = args || {};
  this.id = args.id || false; // id is set in DropWords.addWordGroup
  this.words = args.words || [];

  this.addWord = function (args) {
    this.words.push(new Word(args));
  }

}



function Word (args) {

  var args = args || {};
  this.text = args.text || '';
  this.feedback = args.feedback || '';
  this.correct = args.correct || false;

}
