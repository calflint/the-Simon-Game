const buttonColors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let levels = 0;
let started = true;

const nextSequence = ()=> {
    userClickedPattern=[];

    levels++ 
    // generates a random number
    let random = Math.floor(Math.random() * 4);

    // stores the generated random number as the same as the array property
    let randomChosenColor = buttonColors[random];
    
    // adds the property to that array
    gamePattern.push(randomChosenColor);
    
    // animates the active color
    $("." + randomChosenColor).fadeOut('fast').fadeIn('fast');

    $("#level-title").text("Level " + levels );
   }

// adds event listener on the the 4 colors, adds the clicked color into an array and plays the sound of that color
$(".btn").click(
    (e)=> {
    let userChosenColor = e.target.id;
       userClickedPattern.push(userChosenColor);
       playSounds(userChosenColor);
       animatePress(userChosenColor);
       let indexer = userClickedPattern.indexOf(userChosenColor);
       checkAnswer(indexer)
        }
)
// sound play function
const playSounds = (name) => {
    let playSounds = new Audio('sounds/' + name +'.mp3')
    playSounds.play();
};
// animates when pressed funtion
const animatePress = (currentColor) => {
    let clicked = $("." + currentColor);
        clicked.addClass("pressed");
       setTimeout(()=>{
           clicked.removeClass("pressed");
        }, 100);
}
$(document).keypress(
()=>{
    if (started) {nextSequence();
        $("#level-title").text("Level " + levels );
        started = false;
    };
});
const checkAnswer = (currentLevel) =>{
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(()=> {
    nextSequence();}, 1000)
    }} else { 
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        let wrongSound = new Audio('sounds/wrong.mp3')
        wrongSound.play();
        $("#level-title").text(" Game Over, Wrong Sequence. Press Any Key To Start Over..!!!")
        started = true;
        levels = 0;
        userClickedPattern = [];
        gamePattern = [];
    }
    };