var buttonColor = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var sequencePattern = [];
var level = 0;

// play corresponding sounds to the outputs of $nextSequence and $handler
function playSound(name) {
    switch (name) {
        case "red":
            var redAudio = new Audio("./sounds/red.mp3");
            redAudio.play();
            break;
        case "blue":
            var blueAudio = new Audio("./sounds/blue.mp3");
            blueAudio.play();
            break;
        case "yellow":
            var yellowAudio = new Audio("./sounds/yellow.mp3");
            yellowAudio.play();
            break;
        case "green":
            var greenAudio = new Audio("./sounds/green.mp3");
            greenAudio.play();
            break;
        case "wrong":
            var wrongAudio = new Audio("./sounds/wrong.mp3");
            wrongAudio.play();
            break;
        default:
            console.error();
            break;
    }
}

// adds and removes ".pressed" class to the clicked-button.  
function animatePress(currentColor) {
    var ActiveClick = $("."+currentColor);
    ActiveClick.addClass("pressed");
    setTimeout(() => {
        ActiveClick.removeClass("pressed");
    }, 100);
}

// creates random sequence value and updates the title according to the current level. 
function nextSequence() {
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.round((Math.random() * 3));
        var randomColor = buttonColor[randomNumber];
        sequencePattern.push (randomColor);
        $("#" + randomColor).fadeOut(100).fadeIn(100);
        playSound(randomColor);
}

//  ends the game and resets values.
function gameOver() {
    var endGame = "wrong";
    playSound(endGame);
    $('h1').text("Press 'a' to Restart the Game");
    $(document.body).addClass("game-over");
    setTimeout(() => {
        $(document.body).removeClass("game-over");
    }, 100);

    //Reset Game
    sequencePattern = [];
    level = 0;
    userClickPattern = [];
}

// checks user clicks relative to the $sequencePattern
function checkAns(currentSequence) {
    if (userClickPattern[currentSequence] === sequencePattern[currentSequence]) {
        console.log ("correct " + userClickPattern);
        console.log ("correct " + sequencePattern);
        if (userClickPattern.length === sequencePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickPattern = [];
        }
    } else {
        gameOver();
    }
}


//===============================================================================================================================
//===============================================================================================================================

// starts the game when "a" is pressed 
$(document).keypress(function (e) { 
    if (e.key === "a") {
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

// detects user mouse clicks
$(".btn").click(function (e) {
    var userChosenColor = e.target.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickPattern.length -1);
});