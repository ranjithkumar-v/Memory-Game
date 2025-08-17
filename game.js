
var buttonColours = ["red", "blue", "green", "yellow"];

const instructionText = "Repeat the pattern of lights and sounds – how far can your memory take you?";

// Function to show instruction before the game starts
function showInstruction() {
  // Assume there's an element with id="instruction" to display the message
  const instructionDiv = document.getElementById('instruction');
  if (instructionDiv) {
    instructionDiv.textContent = instructionText;
    instructionDiv.style.display = 'block';
  }
}

// Function to hide instruction when game starts
function hideInstruction() {
  const instructionDiv = document.getElementById('instruction');
  if (instructionDiv) {
    instructionDiv.style.display = 'none';
  }
}

// Call showInstruction() when the page loads or before game starts
window.onload = function() {
  showInstruction();
};

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
  hideInstruction();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
