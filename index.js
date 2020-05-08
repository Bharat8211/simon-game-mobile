 var buttonColours = [ "red", "blue", "green", "yellow"];

 var gamePattern = [];

 var userClickedPattern = [];
 var level = 0;
 var count = 0;
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
$(".start").click(function(){
  if(count<1){
  $("#level-title").text("Level " + level);
  nextSequence();
  count++;}
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      if(userClickedPattern.length === gamePattern.length)
        {
          setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      playSound("wrong");
          $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Start to Restart");
      startOver();
    }

}

function nextSequence(){
   userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}
function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}
function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");

   setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
},100);
}
function startOver(){
  count = 0;
  level = 0;
  gamePattern = [];
}
