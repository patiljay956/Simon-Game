var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
// start game

$(document).keypress(function () { 
    if(!started){
        $("#level-title").text("level "+ level)
        newSequence();
        started = true;
    }
});

// button clicked
$(".btn").click(function () {
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    // console.log(userClickedPattern);//optional
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function newSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level "+ level);
    
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    // Sound
    var sound = new Audio('sounds/' + name + '.mp3');
        sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }
    else {
        var gameover = new Audio('sounds/wrong.mp3');
        gameover.play();
        $("body").addClass("game-over");

        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key To Restart");
        gameOver();
    }
}
function gameOver(){
    level = 0;
    gamePattern = [];
    started = false;
}