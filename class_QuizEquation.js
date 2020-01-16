// Quiz from Equations Class
// v1.1 13th December 2017: Moved CSS into class.js
// v1.0 20th June 2017
// Jon Williams

var QuizEquation;

function QuizEquation (args) {

  var args = args || {};

  this.questionScripts = args.questionScripts || [];
  this.correctAnswer = args.correctAnswer || 0;
  this.answerPrecision = (typeof args.answerPrecision === 'undefined') ? 2 : args.answerPrecision;
  this.equation = args.equation || false;
  this.question = args.question || '';
  this.revealAnswer = (typeof args.revealAnswer === 'undefined') ? true : args.revealAnswer;

  QuizEquation = this;


  this.askQuestion = function () {

    $('#answer').removeClass('answer-correct');
		$('#answer').removeClass('answer-wrong');

    var index = Math.round(Math.random() * (this.questionScripts.length - 1));
    var my_script = this.questionScripts[index];
    window[my_script]();
    this.showQuestion();

  }


  this.showQuestion = function () {

		var html = this.question + '<br /><br />';

    if (this.answerPrecision == 0) {
      html += '(Answer to the nearest whole number)';
    } else {
      html += '(Answer to ' + this.answerPrecision + ' decimal places)';
    }

		$('#question').html(html);
		$('#answer').val('');
		$('#output').html('');

	}


  this.submit = function () {

		var answer = $('#answer').val() * 1.0;
		answer = answer.toFixed(this.answerPrecision);

		if (answer == this.correctAnswer) {
			this.indicateCorrect();
		} else {
			this.indicateWrong();
		}

	}


  this.revealAnswer = function () {
    $('#answer').val(QuizEquation.correctAnswer);
    this.indicateCorrect();
  }


  this.indicateCorrect = function () {

  	$('#answer').addClass('answer-correct');
  	$('#answer').removeClass('answer-wrong');
  	$('#output').html('&check;');

  }


  this.indicateWrong = function ()
  {

  	$('#answer').addClass('answer-wrong');
  	$('#answer').removeClass('answer-correct');
  	$('#output').html('&cross;');

  }


  this.render = function () {

    var step = 1 / Math.pow(10, this.answerPrecision);

    var html = '';

    if ($('#QuizEquation-style').length == 0) {
      html += '<style id="QuizEquation-style">';
      html += '#question { padding: 20px; text-align: center; }';
      html += '#output { font-size: 20px; }';
      html += '#answer { border: 1px solid #e2e2e2; }';
      html += '.answer-correct { border: 1px solid #116d31 !important; background: #00C389; }';
      html += '.answer-wrong { border: 1px solid #df0000 !important; background: #F9423A; }';
      html += '</style>';
    }

    if (this.equation) {
      html += '<div class="content-center">';
      html += '<div style="display:inline-block;border:1px solid #4a5463;background:#f2f2f2;padding:10px;">' + this.equation + '</div>';
      html += '</div>';
    }

    html += '<div id="question"></div>';
    html += '<div class="content-center">';
    html += '<input id="answer" type="number" step="' + step + '" style="margin:20px;text-align:center;">';
    html += '<span id="output"></span><br />';
    html += '<button class="button" onclick="QuizEquation.submit()">Submit</button>';
    html += '<button class="button" onclick="QuizEquation.askQuestion()">New Question</button>';

    if (this.revealAnswer) {
      html += '<br /><button class="button button-small" onclick="QuizEquation.revealAnswer()">Reveal Answer</button>';
    }

    html += '</div>';

    document.write(html);

  }



}
