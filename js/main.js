var turn;
var boxes;
var message;
var active_game;
var winner_combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

var boxClicked = function(box){
  var box_element = box.target;
  if (box_element.innerHTML === "" && active_game) {
    console.log(box);
    if (turn) {
      box_element.innerHTML = "X";
    } else{
      box_element.innerHTML = "O";
    }
    var theWinner = checkWinner();
    if (theWinner !== false){
      message.innerHTML = "Felicitaciones " + theWinner;
      active_game = false;
    } else {
      if (turn) {
        message.innerHTML = "Es turno de O";
      } else{
        message.innerHTML = "Es turno de X";
      }
    }
    if (checkTie()) {
      message.innerHTML = "Empate, vuelvan a empezar";
      active_game = false;
    }
    turn = !turn; //Turn Change
  } else {
    alert("Ey! ¿Que te pasa? 😡");
  }
};

var prepareGame = function(){
  message = document.getElementById("message");
  message.innerHTML = "Es turno de X";
  turn = true;
  active_game = true;
};

var resetGame = function(){
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
  prepareGame();
};

var checkTie = function(){
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].innerHTML === "") {
      return false;
    }
  }
  return true;
};

var checkWinner = function(){
  for (var i = 0; i < winner_combinations.length; i++) {
    if (boxes[winner_combinations[i][0]].innerHTML === boxes[winner_combinations[i][1]].innerHTML && boxes[winner_combinations[i][1]].innerHTML === boxes[winner_combinations[i][2]].innerHTML && boxes[winner_combinations[i][0]].innerHTML !== "") {
      // console.log("Gano " + boxes[winner_combinations[i][0]].innerHTML);
      return boxes[winner_combinations[i][0]].innerHTML;
    }
  }
  console.log("No hay ganador");
  return false;
};

document.addEventListener("DOMContentLoaded", function(){
  boxes = document.getElementsByTagName("li");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", boxClicked);
  }
  prepareGame();
  document.getElementById("resetBtn").addEventListener("click", resetGame);
});
