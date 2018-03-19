var numQuestions = 36;
var numOptions = 4;
var rawScore = 0;
var actualScore = 0;
var sinResponder = 0;
var answers = [
                3, 0, 2, 2, 1, 0, 0, 1, 3, 2,
                2, 1, 1, 0, 0, 3, 2, 3, 2, 0,
                3, 3, 2, 1, 0, 2, 0, 1, 3, 2,
                0, 1, 3, 3, 3, 0
              ];

function getAnswer() {
  var question;
  var noCheck = 0;
  for (var i = 0; i < numQuestions; i++) {
    question = document.getElementsByName(i);
    for (var j=0; j < numOptions; j++) {
      if (question[j].checked) {
        if (question[j].value == answers[i]) {
          rawScore++;
        }
      } else {
        noCheck++;
      }
    }
    if (noCheck == numOptions) {
      sinResponder++;
    }
    noCheck = 0;
  }
}

function calcScore() {
  getAnswer();
  actualScore =  Math.round(rawScore / numQuestions * 100);
  console.log("sinResponder: " + sinResponder);
  console.log("puntaje: " + actualScore);
  document.getElementById("quizForm").enviar.disabled = true;
  var s = document.getElementById("calificacion");
  var msg_str ="Su puntuación es %d%%";
  msg_str = msg_str.replace("%d",actualScore).replace("%%","%");
  if (s) {
    s.innerHTML = "<div class='feedback'><p>"+msg_str+"</p></div>";
  } else {
    alert(msg_str);
  }
}
