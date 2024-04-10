var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");
runSound.loop=true;



function controller(event){
    if(event.key == "Enter"){
        if(runWorker == 0){
            clearInterval(jumpWorker);
            run();
            runSound.play();
            updateScore();
            moveBackground();
            flameMarginLeftArray.forEach(flameCreateAndMove);
        }
    }
   if(event.key == " "){
        if(jumpWorker == 0){
            if(runWorker != 0){
                clearInterval(runWorker);
                jump();
                runSound.pause();
                jumpSound.play();

            }
            
        }
    }
}

var runWorker = 0;
var runImageNumber = 1;
function run(){
    jumpSound.pause();
    runSound.play();

    runWorker = setInterval(
        ()=>{
            runImageNumber= runImageNumber + 1
            if(runImageNumber == 9){
                runImageNumber = 1;
            }
            document.getElementById("boy").src="run"+runImageNumber+".png";
        },150
    );
}

var jumpWorker = 0;
var jumpImageNumber = 1;
var jumpMarginTop = 1650;
function jump(){

    jumpWorker = setInterval(
        ()=>{
            jumpImageNumber= jumpImageNumber + 1;
            if(jumpImageNumber < 8){
                jumpMarginTop = jumpMarginTop - 90;
                document.getElementById("boy").style.marginTop=jumpMarginTop + "px";
            }
            if(jumpImageNumber > 7){
                jumpMarginTop = jumpMarginTop + 90;
                document.getElementById("boy").style.marginTop=jumpMarginTop + "px";
            }
            
            if(jumpImageNumber == 13){
                jumpImageNumber = 1;
                clearInterval(jumpWorker);
                run();
                jumpWorker = 0;
            }
            document.getElementById("boy").src="jump"+jumpImageNumber+".png";
        }, 150
    );
}

var scoreWorker = 0;
var score=0;
function updateScore(){
    scoreWorker = setInterval(
        ()=>{

            if (score == 1450){
                alert("you won! press ok to restart.");
                window.location.reload();

            }
            score = score + 10;
            document.getElementById("score").innerHTML= score;

        
        },100
    );
}

var backgroundWorker =0;
var backgroundPosition=0;

function moveBackground(){
    backgroundWorker = setInterval(
        ()=>{
            backgroundPosition = backgroundPosition - 50;
            document.getElementById("background").style.backgroundPositionX = backgroundPosition+"px";
        },50
    );
}

var deadWorker = 0;
var deadImage = 1;
var deadSound = new Audio("dead.mp3");

function dead(){
    deadWorker = setInterval(
        ()=>{
            deadImage= deadImage+1;

            if(deadImage == 11){
                deadImage = 1;
                clearInterval(deadWorker);
                alert("Game over! press ok to restart. ")
                window.location.reload();
            }
            
            document.getElementById("boy").src = "dead"+deadImage+".png";
        },100
    );
}

var flameMarginLeftArray = [1000,2000,3000];
var flameWorker = 0;


function flameCreateAndMove(x){

    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";

    document.getElementById("background").appendChild(i);

    flameWorker = setInterval(
        ()=>{

            if(flameWorker != 0){
                x =x-10;
                i.style.marginLeft = x + "px";
            }

            if (x ==550){
                if (jumpWorker ==0){
                    clearInterval(runWorker);
                    clearInterval(scoreWorker);
                    clearInterval(backgroundWorker);
                    clearInterval(flameWorker);
                    flameWorker = 0;
                    dead();
                    deadSound.play();

                }
            }
        },50
    );

}