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
// var answers = [
//                 0, 1, 3, 3, 3, 0
//               ];
var answers = [
                3, 0, 2, 2, 1, 0, 0, 1, 3, 2,
                2, 1, 1, 0, 0, 3, 2, 3, 2, 0,
                3, 3, 2, 1, 0, 2, 0, 1, 3, 2,
                0, 1, 3, 3, 3, 0
              ];
var selections = [];

function getAnswers() {
  var question;
  var selection;
  var noCheck = 0;

  for (var i = 0; i < numQuestions; i++) {
    question = document.getElementsByName(i);
    for (var j=0; j < numOptions; j++) {
      if (question[j].checked) {
        if (question[j].value == answers[i]) {
          rawScore++;
        }
        selection = question[j].value;
        break;
      } else {
        noCheck++;
      }
    }

    if (noCheck == numOptions) {
      selections.push("nr");
    } else {
      selections.push(selection);
    }
    noCheck = 0;
  }
  console.log(selections);
}

var sinResponder = function() {
  var m = document.getElementById("sinResponder");
  var question;
  var sinResp = 0;
  var noCheck = 0;
  for (var i = 0; i < numQuestions; i++) {
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
  var row ="";
  var a;
  var s;

  getAnswers();
  actualScore =  Math.round(rawScore / numQuestions * 100);
  console.log("puntaje: " + actualScore);
  var msg_str ="Su puntuación es %d%%";
  msg_str = msg_str.replace("%d",actualScore).replace("%%","%");

  c.innerHTML = msg_str;

  for (var i = 0; i < numQuestions; i++) {
    a = answers[i] == 0 ? 'A' : answers[i] == 1 ? 'B' : answers[i] == 2 ? 'C' : 'D';
    s = selections[i] == 0 ? 'A' : selections[i] == 1 ? 'B' : selections[i] == 2 ? 'C' : selections[i] == 3 ? 'D' : 'No respondió';
    if (a == s) {
      row += `
      <tr class="green">
      <td>${i+1}</td>
      <td>${a}</td>
      <td>${s}</td>
      </tr>
      `;
    } else {
      row += `
      <tr class="red">
      <td>${i+1}</td>
      <td>${a}</td>
      <td>${s}</td>
      </tr>
      `;
    }
  }

  $('#tabla tbody').append(row);
  $('#modal2').modal('open');
  $('#env').addClass('hide');
  $('#punt').removeClass('hide');
}
