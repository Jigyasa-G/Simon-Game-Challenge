var buttonColors = ["red","blue","green","yellow"];  // color array
var gamePattern = [];  //how colors change
var userClickedPattern = []; //detect pattern by user

var started = false; //track if game started or not to call nextSequence function on keypress

var level = 0; //STARTING level

$(document).keypress(function(){   //detect if keyboard pressed, call fn nextSequence
  if (!started){                // "!" for negation of statement
    $("#level-title").text("Level " + level);  //Change h1 from "Press a key to start" to Level 0 call nextSequenceto change level
    nextSequence();
    started = true;
  }
})

$(".btn").click(function(){  //detect button clicked to trigger anonymous function

  var userChosenColor = $(this).attr("id"); //stores id of button clicked
  userClickedPattern.push(userChosenColor); //add chosen color id as array to userChosenPattern

playSound(userChosenColor); // play Sound for user choosen color
animatePress(userChosenColor);

checkAnswer(userClickedPattern.length - 1); //call after user clicks and chooses the answer,passing in the index of last answer in user sequence.

});

function checkAnswer(currentLevel){ // function with input currentLevel

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){ //if statement for userChosenPattern vs gamePattern, declare success if true , else wrong

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () { //call nextSequence after 1000 milliscond delay.
        nextSequence();
      },1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong"); //play wrong.mp3 if user gets wronog answer.

    $("body").addClass("game-over"); //apply class if user gets wrong answer
    setTimeout(function(){
      $("body").removeClass("game-over"); //remove the applied class after 200 milliseconds.
    },200);

    $("#title-level").text("Game Over, Press any key to Restart"); //Change h1 to indicate game over.
    startOver(); //startOver function if user gets wrong sequence.
  }
}

function nextSequence() {

  userClickedPattern = []; //empty array for nextlevel if nextSequence is trigerred, reset userClickedPattern.
  level++; //increase level by 1 every time nextSequenc is called.
$("#level-title").text("Level " + level); //changing text of prev level to current level.

  var randomNumber = Math.floor(Math.random()*4); //random no. generation
  var randomChosenColor = buttonColors[randomNumber];  //position of color from random number
  gamePattern.push(randomChosenColor);  //add obtained color to form pattern

$("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  //choose id & flash
playSound(randomChosenColor); //refactored to play for userChosenColor and randomChosenColor

}

function playSound(name) {                                     //function to play sound taking both inputs of user and random color
  var audio = new Audio("sounds/"+ name + ".mp3");  // play audio for selected button
  audio.play();

}

function animatePress(currentColor) {        // for animation
$("#"+ currentColor).addClass("pressed");    // add pressed class styles to id of pressed button

setTimeout(function() {                     //keyword for setTimeout(fn,delay)
$("#"+currentColor).removeClass("pressed"); //remove pressed class
},100);                                     //duration after which to remove pressed class
}

function startOver() { //function to restart
  level = 0 ;  // reset values of level , gamePattern and started variables.
  gamePattern = [];
  started = false;
}
