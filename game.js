var gamePattern = [];
var userClickedBtns = [];

var level = 0;
var started = false;

//press any key to restart
$(document).keypress(function(event){
    start();
})
$("h1").click(function(){
    if(!started){
        start();
    }
    
})
function start(){
    level=0;
    if(!started){
        $("h1").text("level "+ level);
        nextSequence();
        started= true;
    }
}

// random number generation record 
function nextSequence(){
    level++;
    $("h1").text("level "+level);
    var randomVariable = Math.floor(Math.random()*4);
    var colors = ["green","red","yellow","blue"];
    var randomChosenColor = colors[randomVariable];

    playSound(randomChosenColor)

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(200).fadeIn(200);

}

//button clicking event
var count = 0
$(".btn").click(function(event){
    count++;
    var btn = event.target;
    var clickedId = $(btn).attr("id")
    userClickedBtns.push(clickedId);

    playSound(clickedId);
    btnAnimation(btn); 

    if(userClickedBtns[count-1] !== gamePattern[count-1]){
        wrongAnswer();
        count=0;
    }
    else if(count >= level){
        nextLevel();
        count=0;
    }

})

//go to next level
function nextLevel(){
    userClickedBtns = [];
    setTimeout(function(){
        nextSequence();
    },700);
}

//wrong answer and game over
function wrongAnswer(){
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $('body').addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    },300);
    gamePattern = [];
    userClickedBtns = [];
    $("h1").text("Game over, Press any key to restart");
    started = false;
}

// animation in the buttons
function btnAnimation(btn){
    $(btn).addClass("pressed");
    setTimeout(function(){
        $(btn).removeClass("pressed");
    },100)
}

// playing sounds on buttons
function playSound(name){
    switch(name){
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            console.log("Click valid button");
    }
}