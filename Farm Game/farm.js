let margin = 20;
let size = 100;
let time = 0
let timer = 100
let up = true

let playerX = 0
let playerY = 0
let playerWidth = 40
let playerHeight = 80
let player;
let rightFace = true;

let coins = 0;
let cropX = []
let cropY = []


function update() {
    if (scene == 0) {
        //Starts Game
        if (keysDown[" "]) {
            time = 0;
            scene = 1;
        }
        //For color changing sky
        if (up) {
            time++;
            if(time == 255)
                up = false
        }
        else {
            time--
            if(time == 0){
                up = true
            }
        }
    }
    else if (scene == 1) {
        time++
        //Need to increase to match an actual second 
        if (time > 1){
            timer--;
            time = 0;
        }
        if (timer < 0){
            scene = 2
        }

        //Update the paddle based on input
        if (keysDown["ArrowLeft"]) {
            playerX -= 8;
            rightFace = false
        }
        else if (keysDown["ArrowRight"]) {
            playerX += 8
            rightFace = true
        }
        if (keysDown["ArrowUp"]) {
            playerY -= 8;
        }
        else if (keysDown["ArrowDown"]) {
            playerY += 8
        }

        //Constrain the player position to screen
        if (playerX < -canvas.width/2) {
            playerX = -canvas.width/2
        }
        if (playerX > canvas.width/2 - playerWidth) {
            playerX = canvas.width/2 - playerWidth;
        }
        if (playerY < -canvas.height/2 + playerWidth) {
            playerY = -canvas.height/2 + playerWidth
        }
        if (playerY > canvas.height/2 - playerHeight) {
            playerY = canvas.height/2 - playerHeight;
        }


    }
    else {
        //Scene 2
        if (keysDown[" "]) {
            scene = 1;
        }
        timer = 100;
    }
}

function draw() {
    if (scene == 0) {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = `rgb(${time/2},${time+40},${time + 50})`
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", canvas.width/3, canvas.height/2)  ;
    }
    else if (scene == 1) {
        //Grass
        ctx.fillStyle = "rgb(50,200,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)

        //Player
        ctx.beginPath();
        ctx.rect((canvas.width/2)+playerX, (canvas.height/2) + playerY, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (rightFace){
            ctx.rect((canvas.width/2)+playerX, (canvas.height/2) + playerY + 15, 45, 5);
        }
        else{
            ctx.rect((canvas.width/2)+playerX, (canvas.height/2) + playerY + 15, -5, 5);
        }  
        ctx.fill();
        ctx.closePath();

        
        //Hat
        ctx.beginPath();
        ctx.rect((canvas.width/2)+playerX-5, (canvas.height/2) + playerY, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((canvas.width/2)+playerX+5, (canvas.height/2) + playerY, 30, -20);
        ctx.fill();
        ctx.closePath();

        //Apple
        ctx.beginPath();
        ctx.arc(100,100, 30, 0, 2*Math.PI)
        ctx.fillStyle = "rgb(255, 40, 10)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(100,65, 3,10)
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //Coins
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width/12),canvas.height/15, 25, 0, 2*Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width/12),canvas.height/15, 20, 0, 2*Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", canvas.width - (canvas.width/11) + 5 , canvas.height/13)  ;
        ctx.closePath();

        //Coin Count
        //Timer
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, canvas.width - (canvas.width/20), canvas.height/13)  ;

        
        //Timer
        ctx.fillStyle = "white";
        ctx.font = "20px arial"
        ctx.fillText(timer, 50 , 50)  ;


    }
    else if (scene == 2) {
        //Grass
        ctx.fillStyle = "rgb(5,100,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)

        //Menu
        ctx.beginPath();
        ctx.rect(canvas.width/3 - (canvas.width/11), canvas.height/3, 
        canvas.width/3+(canvas.width/6), 
        (canvas.height/2) + (canvas.height/10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width/3 - (canvas.width/12), canvas.height/3 + (canvas.width/100), 
        canvas.width/3+((canvas.width/6) - (canvas.width/53)), 
        (canvas.height/2) + (canvas.height/15));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();


        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("End of the Day", (canvas.width/2)-(canvas.width/8), canvas.height/4)  ;
    }

}
