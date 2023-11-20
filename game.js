
/**
 * @file This file contains the implementation of the Simon Game Challenge.
 * @summary The game generates a random sequence of colors and plays them for the user to memorize. The user then has to repeat the sequence by clicking on the colors in the correct order. If the user succeeds, the game generates a longer sequence. If the user fails, the game is over and the user can restart by pressing any key or the restart button.
 * @description The file contains the following functions:
 * - nextSequence: generates the next sequence of colors and plays them for the user to memorize.
 * - playSound: plays the sound of the color when it is clicked or generated.
 * - animatePress: adds a visual effect to the color when it is clicked or generated.
 * - checkAnswer: checks if the user clicked the colors in the correct order and generates the next sequence or ends the game accordingly.
 * - startOver: resets the game to its initial state.
 */

let gamePattern = [];
let userClickedPattern = [];
let isFirstKeyPress = false;
let level = 0;

let buttonColours = ["green", "red", "yellow", "blue"];

// Generates the next sequence in the game, adds a random color to the game pattern,
// plays the corresponding sound, and updates the level display.
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

// Plays the sound corresponding to the provided color name.
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

// Animates a button press by adding and removing the "pressed" class.
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

// Handles the click event on game buttons, records the user's click,
// plays the corresponding sound, and checks the answer.
$(".btn").on("click", function(){
    
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

// Handles the keypress event to start the game when any key is pressed.
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

// Checks if the user's current pattern matches the game pattern,
// and proceeds to the next level or ends the game accordingly.
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
        $(".startBtn").show().text("RESTART");
        startOver();
    }
}

// Resets game variables to start over after a game over.
function startOver(){
    level = 0;
    gamePattern = [];
    isFirstKeyPress = false;
}

// Handles the click event on the restart button to start the game again.
$(".startBtn").on("click", function(){
    if (!isFirstKeyPress){
        $("#level-title").text("Level " + level);
        nextSequence();
        isFirstKeyPress = true;
        console.log("Game started");
        $(".startBtn").hide();
    } 
});