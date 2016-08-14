var level1 = {circleXSpeed:1, circleYSpeed:0, circleBound:1025, goalXSpeed:0, goalYSpeed:0, goalBoundX:0, goalBoundY:0, goalTopMargin: 0};
var level2 = {circleXSpeed:3, circleYSpeed:0, circleBound:1025, goalXSpeed:0, goalYSpeed:0, goalBoundX:0, goalBoundY:0, goalTopMargin: 50};
var level3 = {circleXSpeed:5, circleYSpeed:0, circleBound:1025, goalXSpeed:2, goalYSpeed:0, goalBoundX:1000, goalBoundY:0, goalTopMargin: 200};
var level4 = {circleXSpeed:5, circleYSpeed:0, circleBound:1025, goalXSpeed:3, goalYSpeed:0, goalBoundX:1000, goalBoundY:0, goalTopMargin: 75};
var level5 = {circleXSpeed:6, circleYSpeed:0, circleBound:1025, goalXSpeed:4, goalYSpeed:2, goalBoundX:1000, goalBoundY:50, goalTopMargin: 200};
var level6 = {circleXSpeed:6, circleYSpeed:0, circleBound:1025, goalXSpeed:4, goalYSpeed:5, goalBoundX:1000, goalBoundY:100, goalTopMargin: 300};
var level7 = {circleXSpeed:6, circleYSpeed:0, circleBound:1025, goalXSpeed:4, goalYSpeed:10, goalBoundX:1000, goalBoundY:200, goalTopMargin: 200};
var level7 = {circleXSpeed:10, circleYSpeed:0, circleBound:1025, goalXSpeed:5, goalYSpeed:5, goalBoundX:1000, goalBoundY:500, goalTopMargin: 500};
var level8 = {circleXSpeed:10, circleYSpeed:0, circleBound:1025, goalXSpeed:10, goalYSpeed:5, goalBoundX:1000, goalBoundY:600, goalTopMargin: 500};
var levels = [level1, level2, level3, level4, level5, level6, level7, level8];
var level = 0;
var count = 0;
var move = true;
var repeat = false;
var next = false;
var timer = null;
var moveCircleRight = true;
var moveGoalRight = true;
var moveGoalUp = true;
var circleCounter= 0;
var goalRightCounter = 0;
var goalUpCounter = 0;
var pointMade = false;
var setGoalXPosition = 0;
var goalCurrentHeight = 0;
var lives = 5;

setGoalInitialPosition();
buttonsVisibility();


function startProg() {
  if(timer){
    clearTimeout(timer);
    timer = null;
  }
  if(move) {
      $(":animated").promise().done(function() {
            moveCircle("circle", levels[level].circleXSpeed, levels[level].circleBound);
            moveGoal("goal", levels[level].goalXSpeed, levels[level].goalYSpeed, levels[level].goalBoundX, levels[level].goalBoundY);
            timer = setTimeout("startProg()", 1);
      });
  }

}
function dropCircle() {
  if(move){
      $( "#circle" ).animate({ "bottom": "-=" + (goalCurrentHeight + 120) + "px" }, "slow" );
      $( "#goal" ).animate({ "bottom": "-=" + goalUpCounter + "px" }, "slow" );

    if(circleCounter >= (goalRightCounter) && (circleCounter + 75) <= (goalRightCounter + 100)){
      document.getElementById("header").innerHTML = "You got it!";
      repeat = false;
      next = true;
    }
    else{
      repeat = true;
      next = false;
      takeLifeAway();
    }
  }
  move = false;
  buttonsVisibility();
}
function moveCircle(id, circleXSpeed, bound) {
  if(moveCircleRight){
    $( "#" + id ).animate({ "left": "+=" + circleXSpeed + "px"}, 0);
    circleCounter = circleCounter + circleXSpeed;
  }
  else{
    $( "#" + id ).animate({ "left": "-=" + circleXSpeed + "px" }, 0);
    circleCounter = circleCounter - circleXSpeed;
  }
  if(circleCounter >= bound){
    moveCircleRight = false;
  }
  if(circleCounter <= 0){
    moveCircleRight = true;
  }
}
function moveGoal(id, goalXSpeed, goalYSpeed, boundRight, boundUp) {
  if(moveGoalRight){
    $( "#" + id ).animate({ "left": "+=" + goalXSpeed + "px"}, 0);
    goalRightCounter = goalRightCounter + goalXSpeed;
  }
  else{
    $( "#" + id ).animate({ "left": "-=" + goalXSpeed + "px" }, 0);
    goalRightCounter = goalRightCounter - goalXSpeed;
  }
  if(moveGoalUp){
    $( "#" + id ).animate({ "bottom": "+=" + goalYSpeed + "px"}, 0);
    goalUpCounter = goalUpCounter + goalYSpeed;
  }
  else{
    $( "#" + id ).animate({ "bottom": "-=" + goalYSpeed + "px" }, 0);
    goalUpCounter = goalUpCounter - goalYSpeed;
  }
  if(goalRightCounter >= boundRight){
    moveGoalRight = false;
  }
  if(goalRightCounter <= 0){
    moveGoalRight = true;
  }
  if(goalUpCounter >= boundUp){
    moveGoalUp = false;
  }
  if(goalUpCounter <= 0){
    moveGoalUp = true;
  }
}
function repeatLevel() {
  if(!move) {
    resetCSSProperties();
    setGoalInitialPosition();
    timer = setTimeout("startProg()", 1);
  }
}
function nextLevel() {
  if(!move){
    level++;
    resetCSSProperties();
    setGoalInitialPosition();
    addLives();
    timer = setTimeout("startProg()", 1);
  }
}
function resetCSSProperties() {
  if(!move){
      $( "#circle" ).animate({ "bottom": "+=" + (goalCurrentHeight + 120) + "px" }, "fast" );
  }
  else{
    $( "#circle" ).animate({ "bottom": "-=" + (goalCurrentHeight) + "px" }, 0 );
  }
  $( "#circle" ).animate({ "left": "-=" + circleCounter + "px" }, "fast" );
  document.getElementById("header").innerHTML = "Go!";
  document.getElementById("level").innerHTML = "level: " + (level + 1);
    
  timer = null;
  moveCircleRight = true;
  moveGoalRight = true;
  moveGoalUp = true;
  circleCounter= 0;
  goalUpCounter = 0;
  move = true;
  repeat = false;
  next = false;
  buttonsVisibility();
}
function takeLifeAway() {
  lives--;
  if(lives == 0){
    document.getElementById("header").innerHTML = "Game Over!";
    document.getElementById("level").innerHTML = "level: " + (level + 1);
    move = false;
    repeat = false;
    next = false;
    buttonsVisibility();
  }
  document.getElementById("lives").innerHTML = " " + lives;

}
function addLives() {
  lives = lives + 3;
  document.getElementById("lives").innerHTML = " " + lives;
}
function restart() {
    if(!move){    
        level = 0;
        lives = 5;
        resetCSSProperties();
        setGoalInitialPosition();
        document.getElementById("lives").innerHTML = " " + lives;
        document.getElementById("header").innerHTML = "Go!";
        document.getElementById("level").innerHTML = "level: " + (level + 1);

        move = true;
        repeat = false;
        next = false;
        buttonsVisibility();
        timer = setTimeout("startProg()", 1);
    }
 
}
function setGoalInitialPosition() {
    
  setGoalXPosition = Math.floor((Math.random() * 900) + 50);
  if(setGoalXPosition >= goalRightCounter) { 
    $( "#goal" ).animate({ "left": "+=" + (setGoalXPosition - goalRightCounter) + "px" }, "slow" );
  }
  else {
    $( "#goal" ).animate({ "left": "-=" + (goalRightCounter - setGoalXPosition) + "px" }, "fast" );
  }
  goalRightCounter = setGoalXPosition;
    
 

    if(levels[level].goalTopMargin >= goalCurrentHeight) {
        $( "#goal" ).animate({ "bottom": "-=" + (levels[level].goalTopMargin - goalCurrentHeight) + "px" }, "fast" );
    }
    else {
     $( "#goal" ).animate({ "bottom": "+=" + (goalCurrentHeight - levels[level].goalTopMargin) + "px" }, "fast" );
    }
    goalCurrentHeight = levels[level].goalTopMargin;
 
    
}
function buttonsVisibility() {
  document.getElementById("drop").disabled = !move;
  document.getElementById("repeat").disabled = !repeat;
  document.getElementById("next").disabled = !next;
  document.getElementById("restart").disabled = move;
    
}
window.onkeydown = function(e){
  if(e.keyCode === 32){
     e.preventDefault();
     if(move){
       dropCircle();
     }
     else if(repeat) {
       repeatLevel();
     }
     else if(next){
       nextLevel();
     }

    }
}
