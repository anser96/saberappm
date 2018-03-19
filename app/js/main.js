$(document).ready(function(){    
    $('.modal').modal({
      dismissible: false
    });

    $('#env').click(sinResponder);
});

var numQuestions = 36;
var numOptions = 4;
var rawScore = 0;
var actualScore = 0;
var answers = [
                0, 1, 3, 3, 3, 0
              ];
// var answers = [
//                 3, 0, 2, 2, 1, 0, 0, 1, 3, 2,
//                 2, 1, 1, 0, 0, 3, 2, 3, 2, 0,
//                 3, 3, 2, 1, 0, 2, 0, 1, 3, 2,
//                 0, 1, 3, 3, 3, 0
//               ];

function getAnswers() {
  var question;
  for (var i = 30; i < numQuestions; i++) {
    question = document.getElementsByName(i);
    for (var j=0; j < numOptions; j++) {
      if (question[j].checked) {
        if (question[j].value == answers[i-30]) {
          rawScore++;
        }
      }
    }
  }
}

var sinResponder = function() {
  var m = document.getElementById("sinResponder");
  var question;
  var sinResp = 0;
  var noCheck = 0;
  for (var i = 30; i < numQuestions; i++) {
    question = document.getElementsByName(i);
    for (var j=0; j < numOptions; j++) {
      if (!question[j].checked) {
        noCheck++;
      }
    }
    if (noCheck == numOptions) {
      sinResp++;
    }
    noCheck = 0;
  }

  console.log("sinResponder: " + sinResp);
  if (sinResp > 0) {
    m.innerHTML = "Parece que aún tienes preguntas sin responder.";
  } else {
    m.innerHTML = "";
  }
}

function calcScore() {
  var c = document.getElementById("puntaje");
  getAnswers();
  actualScore =  Math.round(rawScore / 6 * 100);
  console.log("puntaje: " + actualScore);
  var msg_str ="Su puntuación es %d%%";
  msg_str = msg_str.replace("%d",actualScore).replace("%%","%");

  c.innerHTML = msg_str;
  $('#modal2').modal('open');
  $('#env').addClass('hide');
  $('#punt').removeClass('hide');
  // document.getElementById("quizForm").enviar.disabled = true;
}
