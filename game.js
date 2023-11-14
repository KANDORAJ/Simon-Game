
let gamePattern = [];
let userClickedPattern = [];
let isFirstKeyPress = false;
let level = 0;

let buttonColours = ["green", "red", "yellow", "blue"];

function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
};

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

$(".btn").on("click", function(){
    
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


$(document).on("keypress", function(){
    if (!isFirstKeyPress){
        $("#level-title").text("Level " + level);
        nextSequence();
        isFirstKeyPress = true;
        console.log("Game started");
    } else {
        console.log("Game already started");
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    isFirstKeyPress = false;
}
