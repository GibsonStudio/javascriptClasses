// Quiz Class
// v1.2 15th December 2017: Updated styles to corporate colours
// v1.1 13th December 2017: Moved CSS into class.js
// v1.0 12th June 2017
// Jon Williams


/* ******** global Quiz functions ******** */

var Quiz;

function QuizOptionClicked (questionIndex, optionIndex) {

  var q = Quiz.questions[questionIndex];
  q.selectedOption = optionIndex;

  //remove selected
  for (var i = 0; i < q.options.length; i++) {
    $('#' + q.options[i].id).removeClass('option-selected');
    $('#' + q.options[i].id).removeClass('option-correct');
    $('#' + q.options[i].id).removeClass('option-wrong');
  }

  $('#' + q.options[optionIndex].id).addClass('option-selected');

}








/* ******** Quiz Class ******** */

function Quiz (args) {

  var args = args || {};
  this.questions = [];
  this.container = (typeof args.container === 'undefined') ? true : args.container;
  Quiz = this;

  this.addQuestion = function (args) {
    args = args || {};
    args.Quiz = this;
    args.questionIndex = this.questions.length;
    var q = new Question(args);
    this.questions.push(q);
  }


  this.render = function () {

    if ($('#Quiz-style').length == 0) {
      var html = '<style id="Quiz-style">';
      html += '.quiz-container { padding:5px 40px; }';
      html += '.question-title { font-weight: bold; background: #9BCBEB; padding: 6px; border-bottom: 1px solid #999999; }';
      html += '.question-image-container { text-align: center; }';
      html += '.question-image-container img { border: 1px solid #999999; margin: 6px; max-width: 90%; }';
      html += '.question { padding-bottom: 40px; }';
      html += '.question-text { padding: 10px; background: #F2F2F2; }';
      html += '.option { border: 1px solid #F2F2F2; background: #FFFFFF; margin: 4px; padding: 10px; cursor:pointer; }';
      html += '.option:hover { background: #f2f2f2; }';
      html += '.option-selected { background: #9BCBEB !important; }';
      html += '.option-correct { color: #FFFFFF !important; background: #00C389 !important; }';
      html += '.option-wrong { color: #FFFFFF !important; background: #F9423A !important; }';
      html += '.quiz-feedback { margin: 10px;	padding: 10px; background: #fafafa;	border: 1px solid #999999; }';
      html += '#quiz-result { width: 200px; margin: auto;	text-align: center;	background: #005EB8; padding: 10px; }';
      html += '#quiz-score { color: #ffffff; font-weight: bold; padding-top: 10px; }';
      html += '#quiz-percent { background: #ffffff; color: #333333;	font-size: 40px; }';
      html += '.quiz-buttons {	padding: 10px; text-align: center; }';
      html += '.quiz-submit-button { background: #005EB8;	color: #ffffff;	font-weight: bold;	padding: 10px; }';
      html += '.quiz-submit-button:hover {	background: #F0B323 !important; }';
      html += '</style>';
      document.write(html);
    }

    if (this.container) { document.write('<div class="quiz-container">'); }

    // add questions
    for (var i = 0; i < this.questions.length; i++) {
      document.write(this.questions[i].html());
    }

    // add feedback
    result = '<div id="quiz-result" style="display:none;"></div>';
	  document.write(result);

    // add submit button
    var buttons = '<div class="quiz-buttons">';
  	buttons += '<div class="quiz-submit-button" onclick="Quiz.submit();">Submit</div>';
  	buttons += '</div>';

  	document.write(buttons);

    if (this.container) { document.write('</div>'); }

  }


  this.submit = function () {

    var score = 0;

    for (var i = 0; i < this.questions.length; i++) {

      var q = this.questions[i];
      $('#' + q.id + '-feedback').hide();

      if (q.selectedOption == q.answer) {

        score++;
        $('#' + q.id + '-' + q.selectedOption).addClass('option-correct');

        if (q.feedbackCorrect) {
          $('#' + q.id + '-feedback').html(q.feedbackCorrect);
          $('#' + q.id + '-feedback').show();
        }

      } else {

        $('#' + q.id + '-' + q.selectedOption).addClass('option-wrong');

        if (q.feedback) {
          $('#' + q.id + '-feedback').html(q.feedback);
          $('#' + q.id + '-feedback').show();
        }

      }

      //report score
    	var percent = (score / this.questions.length) * 100;
    	percent = percent.toFixed(0);
    	var html = '<div id="quiz-percent">' + percent + '%</div>';
    	html += '<div id="quiz-score">' + score + ' / ' + this.questions.length + '</div>';
      $('#quiz-result').show();
    	$('#quiz-result').html(html);


    }








  }



}








/* ******** Question Class ******** */

function Question (args) {

  var args = args || {};
  this.Quiz = args.Quiz || new Quiz();

  this.id = args.id || 'question-' + this.Quiz.questions.length;
  this.text = args.text || '';
  this.options = args.options || [];
  this.feedback = args.feedback || false;
  this.feedbackCorrect = args.feedbackCorrect || false;
  this.answer = args.answer || 0;
  this.image = args.image || '';
  this.imageCss = args.imageCss || '';
  this.questionIndex = args.questionIndex || 0;
  this.selectedOption = -1;

  // make options into objects
  for (var i = 0; i < this.options.length; i++) {
    var o = {};
    o.text = this.options[i];
    o.id = this.id + '-' + i;
    this.options[i] = o;
  }



  this.html = function () {

    var html = '<div id="' + this.id + '" class="question">';
  	html += '<div class="question-title">Question ' + (this.questionIndex + 1) + '</div>';

  	if (this.text != '') { html += '<div class="question-text">' + this.text + '</div>'; }
  	if (this.image != '') { html += '<div class="question-image-container"><img style="' + this.imageCss + '" src="' + this.image + '" alt="' + this.image + '" /></div>'; }

  	//add options
  	for (var i = 0; i < this.options.length; i++) {
  		html += '<div id="' + this.options[i].id + '" onclick="QuizOptionClicked(' + this.questionIndex +',' + i +');" class="option">' + this.options[i].text + '</div>';
  	}

  	//add feedback area
  	html += '<div class="quiz-feedback" style="display:none;" id="'+ this.id + '-feedback"></div></div>';

    return html;

  }



}
