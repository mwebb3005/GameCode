import "../engine/engine.js"


class StartController extends Component {
    start() {
        this.freezeTime = 0
        this.maxFreezeTime = 1
        this.up = true
        this.time = 0
    }
    update() {
        this.freezeTime += 100 / 500
        //Starts Game
        if (keysDown[" "] && this.freezeTime >= this.maxFreezeTime) {
            this.time = 0;
            SceneManager.changeScene(1)
        }
        //For color changing sky
        if (this.up) {
            this.time++;
            if (this.time == 255)
                this.up = false
        }
        else {
            this.time--
            if (this.time <= 0) {
                this.up = true
            }
        }
    }
    draw(ctx){
        
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = `rgb(${this.time / 2},${this.time + 40},${this.time + 70})`
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", ctx.canvas.width / 3, ctx.canvas.height / 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.time % 40 - 10})`
        ctx.font = "50px arial"
        ctx.fillText("Press Space to Start", ctx.canvas.width / 3, 3 * (ctx.canvas.height / 4));
    }
}


//Current issue: can't transfer code to DrawComponent or things break

class StartDrawComponent extends Component {
    draw(ctx) {
        
        
    }
}



class StartControllerGameObject extends GameObject {
    start() {
        this.addComponent(new StartController())
    }
}

class StartDrawGameObject extends GameObject {
    start() {
        this.addComponent(new StartDrawComponent());
    }

}

class StartScene extends Scene {
    start() {
        this.addGameObject(new StartControllerGameObject())
        this.addGameObject(new StartDrawGameObject())
    }
}





//Main (Attempts)-----------------------------------------------------------------


class MainDrawComponent extends Component {
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(50,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)
        //Timer
        ctx.fillStyle = "white";
        ctx.font = "20px arial"
        ctx.fillText(timer, 50, 50);
    }
}

/*
class MainControllerGameObject extends GameObject {
    start() {
        this.addComponent(new MainController())
    }
}
*/

/*
class MainDrawGameObject extends GameObject {
    start() {
        this.addComponent(new MainDrawComponent());
    }

}
*/



/*
class MainControllerComponent extends Component {
    start() {

    }
    update() {


    }
    handleMessage(message) {
        if (message.message == "ApplePickup") {
            let appleGameObjects = GameObject.getObjectsByName("AppleGameObject")
            appleGameObjects = appleGameObjects.filter(go => !go.markForDestroy)
            
            
        }
    }
}
*/


// class MainScene extends Scene {
//     start() {
//         this.addGameObject(new MainControllerGameObject())
//         this.addGameObject(new MainDrawGameObject())
//     }
// }

//SceneManager.addScene(MainScene)


class MainScene extends Scene {
    start(ctx) {
        /*let RabbitGameObject = new GameObject("RabbitGameObject")
        rabbitGameObject.addComponent(new RabbitComponent()) */

        let playerGameObject = new GameObject("PlayerGameObject")
        playerGameObject.addComponent(new PlayerComponent())
        PlayerComponent.width = ctx.canvas.width
        PlayerComponent.height = ctx.canvas.height
        PlayerComponent.transform.x = ctx.canvas.width/2
        PlayerComponent.transform.y = ctx.canvas.height/2
        this.addGameObject(playerGameObject)



        this.addGameObject(new GameObject("TimerGameObject").addComponent(new TimerComponent()))
        this.addGameObject(new GameObject("RabbitGameObject").addComponent(new RabbitComponent()))
        this.addGameObject(new GameObject("BoxGameObject").addComponent(new BoxComponent()))
        this.addGameObject(new GameObject("AppleGameObject").addComponent(new AppleComponent()))
        this.addGameObject(new GameObject("CoinCounterGameObject").addComponent(new CoinCounterComponent()))

    }
}


class TimerComponent extends Component {
    name = "TimerComponent"
    start() {
        this.timer = 100
        this.transform.x = 20
        this.transform.y = 20

    }
    update() {
        time++
        //Need to increase to match an actual second 
        if (time > 1) {
            timer--;
            time = 0;
        }
        if (timer < 0) {
            SceneManager.changeScene(2)
        }
    }
    draw(ctx) {
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)

        //Background
        ctx.fillStyle = "green"
        ctx.fillRect(0, ctx.canvas.height / 8, ctx.canvas.width, ctx.canvas.height)

        //Timer
        ctx.fillStyle = "white"
        ctx.font = "20px arial"
        ctx.fillText(timer, 50, 50);
    }
}

class PlayerComponent extends Component {
    name = "PlayerComponent"
    start() {
        this.width = 0
        this.height = 0
        this.rightFace = true;
        this.playerWidth = 40
        this.playerHeight = 80
        this.transform.x = 0
        this.transform.y = 0
        this.time = 0
        this.timer = 100
        this.handsFull = false

        /*
        let up = true
        let arrow = 0
        let inpOffset

        let playerX = 0
        let playerY = 0
        
        let player;
        
        let handsFull = false
        */
    }
    update() {
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= 8
            rightFace = false
        }
        else if (keysDown["ArrowRight"]) {
            this.transform.x += 8
            rightFace = true
        }
        if (keysDown["ArrowUp"]) {
            this.transform.y -= 8;
        }
        else if (keysDown["ArrowDown"]) {
            this.transform.y += 8
        }

        //Constrain the player position to screen
        if (this.transform.x < -ctx.canvas.width / 2) {
            this.transform.x = -ctx.canvas.width / 2
        }
        if (this.transform.x > ctx.canvas.width / 2 - this.transform.x) {
            this.transform.x = ctx.canvas.width / 2 - this.transform.x;
        }
        if (this.transform.y < -ctx.canvas.height / 2 + this.transform.y) {
            this.transform.y = -ctx.canvas.height / 2 + this.transform.y
        }
        if (this.transform.y > ctx.canvas.height / 2 - this.transform.y) {
            this.transform.y = ctx.canvas.height / 2 - this.transform.y;
        }
    }
    draw(ctx) {
        //Body
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 2) + this.transform.x, (ctx.canvas.height / 2) + this.transform.y, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (this.rightFace) {
            ctx.rect((ctx.canvas.width / 2) + this.transform.x, (ctx.canvas.height / 2) + this.transform.y + 15, 45, 5);
        }
        else {
            ctx.rect((ctx.canvas.width / 2) + this.transform.x, (ctx.canvas.height / 2) + this.transform.y + 15, -5, 5);
        }
        ctx.fill();
        ctx.closePath();
        //Hat
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 2) + this.transform.x - 5, (ctx.canvas.height / 2) + this.transform.y, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((ctx.canvas.width / 2) + this.transform.x + 5, (ctx.canvas.height / 2) + this.transform.y, 30, -20);
        ctx.fill();
        ctx.closePath();
    }
}

class AppleComponent extends Component {
    name = "AppleComponent"
    start() {
        this.transform.x = ctx.canvas.width/(Math.random * 2)
        this.transform.y = ctx.canvas.height/(Math.random * 3)
    }
    update() {

    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 40, 10)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(100, 65, 3, 10)
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

class RabbitComponent extends Component {
    name = "RabbitComponent"
    start() {
        this.movementTimer = 0
        this.bunnyVX = 0
        this.bunnyVY = 0
        this.moveRabbit = true
        this.transform.x = ctx.canvas.width / 3
        this.transform.y = ctx.canvas.height / 3
    }
    update() {
        //Pseudo Logic: Random movement every 100 time, if in certain range of Apple Array, move towards apple
        if (moveRabbit) {
            movementTimer++;
            if (movementTimer > 1)
                moveRabbit = false
        }
        else {
            movementTimer--
            if (movementTimer == 0) {
                moveRabbit = true
            }
        }


        if (moveRabbit) {
            let newDirection = -1 + Math.floor((Math.random()) * 4)

            if (newDirection > 1) {
                bunnyVX = -1 * (Math.floor(Math.random) * 10)
                bunnyVY = -1 * (Math.floor(Math.random) * 10)
            }
            if (newDirection < 2 && newDirection > 0) {
                bunnyVX = (Math.floor(Math.random) * 10)
                bunnyVY = -1 * (Math.floor(Math.random) * 10)
            }
            if (newDirection == 0) {
                bunnyVX = -1 * (Math.floor(Math.random) * 10)
                bunnyVY = (Math.floor(Math.random) * 10)
            }
            if (newDirection < 0) {
                bunnyVX = (Math.floor(Math.random) * 10)
                bunnyVY = (Math.floor(Math.random) * 10)
            }
        }


        this.transform.x += bunnyVX
        this.transform.y += bunnyVY

        //Keep bunny within boundaries of map
        if (this.transform.x < 0) {
            bunnyVX *= -1
        }
        if (this.transform.y < 0) {
            bunnyVY *= -1
        }
        if (this.transform.x > ctx.canvas.width) {
            bunnyVX *= -1
        }
        if (this.transform.y > ctx.canvas.height) {
            bunnyVY *= -1
        }


    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 4) + this.transform.x, (ctx.canvas.height / 4) + this.transform.y, 50, 25);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 4 + ctx.canvas.width / 50) + this.transform.x, (ctx.canvas.height / 4 - ctx.canvas.height / 70) + this.transform.y, 10, 15)
        ctx.fillStyle = "white ";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc((ctx.canvas.width / 4 + 50) + this.transform.x, (ctx.canvas.height / 4 + 5) + this.transform.y, 5, 0, 2 * Math.PI)
        ctx.fillStyle = "pink ";
        ctx.fill();
        ctx.closePath();
    }
}

class BoxComponent extends Component {
    name = "BoxComponent"
    start() {

    }
    update() {
        let playerX = PlayerComponent.transform.x
        let playerY = PlayerComponent.transform.y
        let handsFull = PlayerComponent.handsFull
        
        if((playerY >= ctx.canvas.height - ctx.canvas.height) && 
        ((playerX >= ctx.canvas.width/3) && playerX <= (ctx.canvas.width - ctx.canvas.width/3))){
            if(handsFull){
                GameObject.handleMessage(this, "AppleDeposit")
            }
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3, ctx.canvas.height - ctx.canvas.height / 12, ctx.canvas.width / 3, ctx.canvas.height / 12);
        ctx.fillStyle = "rgb(115, 80, 0)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 + ctx.canvas.width / 100, ctx.canvas.height - ctx.canvas.height / 15,
            ctx.canvas.width / 3 - ctx.canvas.width / 52, ctx.canvas.height / 20);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}


class CoinCounterComponent extends Component {
    name = "CoinCounterComponent"
    start() {
        this.coins = 0
    }
    update() {

    }
    handleMessage(message) {
        if (message.message = "AppleDeposit") {
            this.coins++
        }
    }
    draw(ctx) {
        //Coin Icon
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - (ctx.canvas.width / 12), ctx.canvas.height / 15, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - (ctx.canvas.width / 12), ctx.canvas.height / 15, 20, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", ctx.canvas.width - (ctx.canvas.width / 11) + 5, ctx.canvas.height / 13);
        ctx.closePath();
        //Coin Count
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, ctx.canvas.width - (ctx.canvas.width / 20), ctx.canvas.height / 13);
    }
}


/*
class MainScene extends Scene {
    start() {
        let timerGameObject = new GameObject("TimerGameObject")
        timerGameObject.addComponent(new TimerComponent())
        timerGameObject.transform.x = 0
        timerGameObject.transform.y = 10
        this.addGameObject(timerGameObject)


        let playerGameObject = new GameObject("PlayerGameObject")
        playerGameObject.addComponent(new PlayerComponent())
        this.addGameObject(playerGameObject)


        this.addGameObject(new GameObject("RabbitGameObject").addComponent(new RabbitComponent()))
        this.addGameObject(new GameObject("BoxGameObject").addComponent(new BoxComponent()))
        this.addGameObject(new GameObject("AppleGameObject").addComponent(new AppleComponent()))
        this.addGameObject(new GameObject("CoinCounterGameObject").addComponent(new CoinCounterComponent()))
    }
}
*/


//End Scene----------------------------------------------------------------------------
class EndController extends Component {
    update() {
        if (keysDown[" "]) {
            SceneManager.changeScene(1)
        }
    }
}


class EndDrawComponent extends Component {
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(5,100,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)

        //Menu
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 - (ctx.canvas.width / 11), ctx.canvas.height / 3,
            ctx.canvas.width / 3 + (ctx.canvas.width / 6),
            (ctx.canvas.height / 2) + (ctx.canvas.height / 10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 - (ctx.canvas.width / 12), ctx.canvas.height / 3 + (ctx.canvas.width / 100),
            ctx.canvas.width / 3 + ((ctx.canvas.width / 6)) - (ctx.canvas.width / 55),
            (ctx.canvas.height / 2) + (ctx.canvas.height / 15));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}


class ArrowComponent extends Component {
    name = "ArrowComponent"
    start() {
        this.arrow = 0
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }
    update() {
        //Scene 2
        this.freezeTime += 150 / 500
        if (keysDown["Enter"]) {
            SceneManager.changeScene(1)
        }
        else if (keysDown[" "]) {

        }
        else if (keysDown["ArrowDown"] && this.freezeTime >= this.maxFreezeTime) {
            this.freezeTime = 0
            arrow += 1
            if (arrow > 3) {
                arrow = 0
                console.log("ARROW ARROW DOWN")
            }

        }
        else if (keysDown["ArrowUp"] && this.freezeTime >= this.maxFreezeTime) {
            this.freezeTime = 0
            arrow -= 1
            if (arrow < 0) {
                arrow = 3
                console.log("ARROW ARROW UP")
            }
        }

        timer = 100;
    }
    draw(ctx) {
        //Arrow
        wOffset = ctx.canvas.width / 5 + ctx.canvas.width / 24
        hOffset = ctx.canvas.height / 12
        inpOffset = arrow

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.fillRect(ctx.canvas.width / 2 - wOffset, ctx.canvas.height / 2 - hOffset + (inpOffset * 100), 30, 10)
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "white"
        ctx.moveTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.lineTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(ctx.canvas.width/2 + 20, ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width / 2 + 50 - wOffset, ctx.canvas.height / 2 + 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2 + 20)
        ctx.lineTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 + 15 - hOffset + (inpOffset * 100))
        //ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.stroke()
        ctx.fill()
    }
}

class EndTextComponent extends Component {
    name = "EndTextComponent"
    start() {

    }
    update() {

    }
    draw(ctx) {
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("End of the Day", (ctx.canvas.width / 2) - (ctx.canvas.width / 8), ctx.canvas.height / 4);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", ctx.canvas.width / 2 + 55 - wOffset, ctx.canvas.height / 2 + 25 - hOffset);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item2", ctx.canvas.width / 2 + 55 - wOffset, ctx.canvas.height / 2 + 25 - hOffset + 100);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item3", ctx.canvas.width / 2 + 55 - wOffset, ctx.canvas.height / 2 + 25 - hOffset + 200);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Start Day", ctx.canvas.width / 2 + 55 - wOffset, ctx.canvas.height / 2 + 25 - hOffset + 300);
    }
}

class EndScene extends Scene {
    start() {
        this.addGameObject(new GameObject().addComponent(new EndController()))
        this.addGameObject(new GameObject().addComponent(new EndDrawComponent()))
        this.addGameObject(new GameObject().addComponent(new ArrowComponent()))
        this.addGameObject(new GameObject().addComponent(new EndTextComponent()))
    }
}



let startScene = new StartScene()
let mainScene = new MainScene()
let endScene = new EndScene()

window.allScenes = [startScene, mainScene, endScene]


//Previous Code
//---------------------------------------------------------------------------------

/*
let margin = 20;
let size = 100;
let time = 0
let timer = 100
let up = true
let arrow = 0
let inpOffset

let playerX = 0
let playerY = 0
let playerWidth = 40
let playerHeight = 80
let player;
let rightFace = true;
let handsFull = false

let movementTimer = 0
let bunnyVX = 0
let bunnyVY = 0
let moveRabbit = false

let coins = 0;
let cropX = []
let cropY = []

let points = 0;

//For Arrow
let wOffset = ctx.canvas.width / 3
let hOffset = ctx.canvas.height / 12
*/

//-----------------------------------------------------
//Start





/*
class StartScene extends Scene {
    start() {
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }
    update() {
        this.freezeTime += 100 / 500
        //Starts Game
        if (keysDown[" "] && this.freezeTime >= this.maxFreezeTime) {
            time = 0;
            SceneManager.changeScene(1)
        }
        //For color changing sky
        if (up) {
            time++;
            if (time == 255)
                up = false
        }
        else {
            time--
            if (time == 0) {
                up = true
            }
        }
    }
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = `rgb(${time / 2},${time + 40},${time + 50})`
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", ctx.canvas.width / 3, ctx.canvas.height / 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${time})`;
        ctx.font = "50px arial"
        ctx.fillText("Press Space to Start", ctx.canvas.width / 3, 3 * (ctx.canvas.height/4));
    }

}

class MainScene extends Scene {
    start() {
        this.timer = 0;
    }
    update() {
        time++
        //Need to increase to match an actual second 
        if (time > 1) {
            timer--;
            time = 0;
        }
        if (timer < 0) {
            SceneManager.changeScene(2)
        }

        //Update the player based on input
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
        if (playerX < -ctx.canvas.width / 2) {
            playerX = -ctx.canvas.width / 2
        }
        if (playerX > ctx.canvas.width / 2 - playerWidth) {
            playerX = ctx.canvas.width / 2 - playerWidth;
        }
        if (playerY < -ctx.canvas.height / 2 + playerWidth) {
            playerY = -ctx.canvas.height / 2 + playerWidth
        }
        if (playerY > ctx.canvas.height / 2 - playerHeight) {
            playerY = ctx.canvas.height / 2 - playerHeight;
        }
    }
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(50,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)

        //Player
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 2) + playerX, (ctx.canvas.height / 2) + playerY, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (rightFace) {
            ctx.rect((ctx.canvas.width / 2) + playerX, (ctx.canvas.height / 2) + playerY + 15, 45, 5);
        }
        else {
            ctx.rect((ctx.canvas.width / 2) + playerX, (ctx.canvas.height / 2) + playerY + 15, -5, 5);
        }
        ctx.fill();
        ctx.closePath();


        //Hat
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 2) + playerX - 5, (ctx.canvas.height / 2) + playerY, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((ctx.canvas.width / 2) + playerX + 5, (ctx.canvas.height / 2) + playerY, 30, -20);
        ctx.fill();
        ctx.closePath();

        //Apple
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 40, 10)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(100, 65, 3, 10)
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();


        //Rabbit
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 4, ctx.canvas.height / 4, 50, 25);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 4 + ctx.canvas.width / 50, ctx.canvas.height / 4 - ctx.canvas.height / 70, 10, 15)
        ctx.fillStyle = "white ";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 4 + 50, ctx.canvas.height / 4 + 5, 5, 0, 2 * Math.PI)
        ctx.fillStyle = "pink ";
        ctx.fill();
        ctx.closePath();

        //Box
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3, ctx.canvas.height - ctx.canvas.height / 12, ctx.canvas.width / 3, ctx.canvas.height / 12);
        ctx.fillStyle = "rgb(115, 80, 0)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 + ctx.canvas.width / 100, ctx.canvas.height - ctx.canvas.height / 15,
            ctx.canvas.width / 3 - ctx.canvas.width / 52, ctx.canvas.height / 20);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //Coins
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - (ctx.canvas.width / 12), ctx.canvas.height / 15, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - (ctx.canvas.width / 12), ctx.canvas.height / 15, 20, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", ctx.canvas.width - (ctx.canvas.width / 11) + 5, ctx.canvas.height / 13);
        ctx.closePath();

        //Coin Count
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, ctx.canvas.width - (ctx.canvas.width / 20), ctx.canvas.height / 13);


        //Timer
        ctx.fillStyle = "white";
        ctx.font = "20px arial"
        ctx.fillText(timer, 50, 50);
    }
}


//End--------------------------------------------------------------------------
class EndScene extends Scene {
    start() {
        this.arrow = 0
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }

    update() {
        //Scene 2
        this.freezeTime += 150 / 500
        if (keysDown["Enter"]) {
            SceneManager.changeScene(1)
        }
        else if (keysDown[" "]) {

        }
        else if (keysDown["ArrowDown"] && this.freezeTime >= this.maxFreezeTime) {
            this.freezeTime = 0
            arrow += 1
            if (arrow > 3) {
                arrow = 0
                console.log("ARROW ARROW DOWN")
            }

        }
        else if (keysDown["ArrowUp"] && this.freezeTime >= this.maxFreezeTime) {
            this.freezeTime = 0
            arrow -= 1
            if (arrow < 0) {
                arrow = 3
                console.log("ARROW ARROW UP")
            }
        }

        timer = 100;
    }
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(5,100,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)

        //Menu
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 - (ctx.canvas.width / 11), ctx.canvas.height / 3,
            ctx.canvas.width / 3 + (ctx.canvas.width / 6),
            (ctx.canvas.height / 2) + (ctx.canvas.height / 10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 - (ctx.canvas.width / 12), ctx.canvas.height / 3 + (ctx.canvas.width / 100),
            ctx.canvas.width / 3 + ((ctx.canvas.width / 6)) - (ctx.canvas.width / 55),
            (ctx.canvas.height / 2) + (ctx.canvas.height / 15));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //Arrow
        let wOffset = ctx.canvas.width / 5 + ctx.canvas.width / 25
        let hOffset = ctx.canvas.height / 12
        inpOffset = arrow

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.fillRect(ctx.canvas.width / 2 - wOffset, ctx.canvas.height / 2 - hOffset + (inpOffset * 100), 30, 10)
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "white"
        ctx.moveTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.lineTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(ctx.canvas.width/2 + 20, ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width / 2 + 50 - wOffset, ctx.canvas.height / 2 + 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2 + 20)
        ctx.lineTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 + 15 - hOffset + (inpOffset * 100))
        //ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.stroke()
        ctx.fill()


        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("End of the Day", (ctx.canvas.width / 2) - (ctx.canvas.width / 8), ctx.canvas.height / 4);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item2", ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + 100);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + 200);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Start Day", ctx.canvas.width / 2 + 30 - wOffset, ctx.canvas.height / 2 - 5 - hOffset + 300);
    }
}

let startScene = new StartScene()
let mainScene = new MainScene()
let endScene = new EndScene()

SceneManager.addScene(startScene)
SceneManager.addScene(mainScene)
SceneManager.addScene(endScene)



/*
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
            if (time == 255)
                up = false
        }
        else {
            time--
            if (time == 0) {
                up = true
            }
        }
    }
    else if (scene == 1) {
        time++
        //Need to increase to match an actual second 
        if (time > 1) {
            timer--;
            time = 0;
        }
        if (timer < 0) {
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
        if (playerX < -ctx.canvas.width / 2) {
            playerX = -ctx.canvas.width / 2
        }
        if (playerX > ctx.canvas.width / 2 - playerWidth) {
            playerX = ctx.canvas.width / 2 - playerWidth;
        }
        if (playerY < -ctx.canvas.height / 2 + playerWidth) {
            playerY = -ctx.canvas.height / 2 + playerWidth
        }
        if (playerY > ctx.canvas.height / 2 - playerHeight) {
            playerY = ctx.canvas.height / 2 - playerHeight;
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
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = `rgb(${time / 2},${time + 40},${time + 50})`
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", ctx.canvas.width / 3, ctx.canvas.height / 2);
    }
    else if (scene == 1) {
        //Grass
        ctx.fillStyle = "rgb(50,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)

        //Player
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 2) + playerX, (ctx.canvas.height / 2) + playerY, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (rightFace) {
            ctx.rect((ctx.canvas.width / 2) + playerX, (ctx.canvas.height / 2) + playerY + 15, 45, 5);
        }
        else {
            ctx.rect((ctx.canvas.width / 2) + playerX, (ctx.canvas.height / 2) + playerY + 15, -5, 5);
        }
        ctx.fill();
        ctx.closePath();


        //Hat
        ctx.beginPath();
        ctx.rect((ctx.canvas.width / 2) + playerX - 5, (ctx.canvas.height / 2) + playerY, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((ctx.canvas.width / 2) + playerX + 5, (ctx.canvas.height / 2) + playerY, 30, -20);
        ctx.fill();
        ctx.closePath();

        //Apple
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 40, 10)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(100, 65, 3, 10)
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //Coins
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - (ctx.canvas.width / 12), ctx.canvas.height / 15, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - (ctx.canvas.width / 12), ctx.canvas.height / 15, 20, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", ctx.canvas.width - (ctx.canvas.width / 11) + 5, ctx.canvas.height / 13);
        ctx.closePath();

        //Coin Count
        //Timer
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, ctx.canvas.width - (ctx.canvas.width / 20), ctx.canvas.height / 13);


        //Timer
        ctx.fillStyle = "white";
        ctx.font = "20px arial"
        ctx.fillText(timer, 50, 50);


    }
    else if (scene == 2) {
        //Grass
        ctx.fillStyle = "rgb(5,100,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)

        //Menu
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 - (ctx.canvas.width / 11), ctx.canvas.height / 3,
            ctx.canvas.width / 3 + (ctx.canvas.width / 6),
            (ctx.canvas.height / 2) + (ctx.canvas.height / 10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width / 3 - (ctx.canvas.width / 12), ctx.canvas.height / 3 + (ctx.canvas.width / 100),
            ctx.canvas.width / 3 + ((ctx.canvas.width / 6) - (ctx.canvas.width / 53)),
            (ctx.canvas.height / 2) + (ctx.canvas.height / 15));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();


        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("End of the Day", (ctx.canvas.width / 2) - (ctx.canvas.width / 8), ctx.canvas.height / 4);
    }

}
*/
