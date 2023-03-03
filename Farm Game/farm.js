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

let coins = 0;
let cropX = []
let cropY = []

let points = 0;

//-----------------------------------------------------
//Start

class StartController extends Component {
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
}

class StartDrawComponent extends Component {
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = `rgb(${time / 2},${time + 40},${time + 70})`
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", canvas.width / 3, canvas.height / 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${time % 40 - 10})`
        ctx.font = "50px arial"
        ctx.fillText("Press Space to Start", canvas.width / 3, 3 * (canvas.height / 4));
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

class MainController extends Component {
    start() {
        this.timer = 100
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
}

class MainDrawComponent extends Component {
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(50,200,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)
        //Timer
        ctx.fillStyle = "white";
        ctx.font = "20px arial"
        ctx.fillText(timer, 50, 50);
    }
}

class MainControllerGameObject extends GameObject {
    start() {
        this.addComponent(new MainController())
    }
}

class MainDrawGameObject extends GameObject {
    start() {
        this.addComponent(new MainDrawComponent());
    }

}


class MainScene extends Scene {
    start() {
        this.addGameObject(new MainControllerGameObject())
        this.addGameObject(new MainDrawGameObject())
    }
}

//SceneManager.addScene(MainScene)


class PointsComponent extends Component {
    name = "PointComponent"
    start() {
        this.points = 0
    }
    update() {

    }
    draw(ctx) {
        //View part of MVC
        ctx.fillStyle = "green"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "white"
        ctx.fillText(this.points, this.transform.x, this.transform.y);
        //ctx.fillText(points, 0, 10);
    }
}

class PlayerComponent extends Component {
    name = "PlayerComponent"
    start() {
        
    }
    update() {
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
        if (playerX < -canvas.width / 2) {
            playerX = -canvas.width / 2
        }
        if (playerX > canvas.width / 2 - playerWidth) {
            playerX = canvas.width / 2 - playerWidth;
        }
        if (playerY < -canvas.height / 2 + playerWidth) {
            playerY = -canvas.height / 2 + playerWidth
        }
        if (playerY > canvas.height / 2 - playerHeight) {
            playerY = canvas.height / 2 - playerHeight;
        }
    }
    draw(ctx) {
        //Body
        ctx.beginPath();
        ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (rightFace) {
            ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY + 15, 45, 5);
        }
        else {
            ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY + 15, -5, 5);
        }
        ctx.fill();
        ctx.closePath();
        //Hat
        ctx.beginPath();
        ctx.rect((canvas.width / 2) + playerX - 5, (canvas.height / 2) + playerY, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((canvas.width / 2) + playerX + 5, (canvas.height / 2) + playerY, 30, -20);
        ctx.fill();
        ctx.closePath();
    }
}

class AppleComponent extends Component {
    name = "AppleComponent"
    start() {

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

    }
    update() {

    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(canvas.width / 4, canvas.height / 4, 50, 25);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 4 + canvas.width / 50, canvas.height / 4 - canvas.height / 70, 10, 15)
        ctx.fillStyle = "white ";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width / 4 + 50, canvas.height / 4 + 5, 5, 0, 2 * Math.PI)
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

    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(canvas.width / 3, canvas.height - canvas.height / 12, canvas.width / 3, canvas.height / 12);
        ctx.fillStyle = "rgb(115, 80, 0)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 3 + canvas.width / 100, canvas.height - canvas.height / 15,
            canvas.width / 3 - canvas.width / 52, canvas.height / 20);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}


class CoinCounterComponent extends Component {
    name = "CoinCounterComponent"
    start() {

    }
    update() {

    }
    draw(ctx) {
        //Coin Icon
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width / 12), canvas.height / 15, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width / 12), canvas.height / 15, 20, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", canvas.width - (canvas.width / 11) + 5, canvas.height / 13);
        ctx.closePath();
        //Coin Count
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, canvas.width - (canvas.width / 20), canvas.height / 13);
    }
}

class MainScene extends Scene {
    start() {
        let pointsGameObject = new GameObject("PointsGameObject")
        pointsGameObject.addComponent(new PointsComponent())
        pointsGameObject.transform.x = 0
        pointsGameObject.transform.y = 10
        this.addGameObject(pointsGameObject)
        
        
        let playerGameObject = new  GameObject("PlayerGameObject")
        ballGameObject.addComponent(new PlayerComponent())
        this.addGameObject(playerGameObject)
        
        
        this.addGameObject(new GameObject("RabbitGameObject").addComponent(new RabbitComponent()))
        this.addGameObject(new GameObject("BoxGameObject").addComponent(new BoxComponent()))
        this.addGameObject(new GameObject("AppleGameObject").addComponent(new AppleComponent()))
        this.addGameObject(new GameObject("CoinCounterGameObject").addComponent(new CoinCounterComponent()))
    }
}


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
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)

        //Menu
        ctx.beginPath();
        ctx.rect(canvas.width / 3 - (canvas.width / 11), canvas.height / 3,
            canvas.width / 3 + (canvas.width / 6),
            (canvas.height / 2) + (canvas.height / 10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 3 - (canvas.width / 12), canvas.height / 3 + (canvas.width / 100),
            canvas.width / 3 + ((canvas.width / 6)) - (canvas.width / 55),
            (canvas.height / 2) + (canvas.height / 15));
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
        let wOffset = canvas.width / 5 + canvas.width / 25
        let hOffset = canvas.height / 12
        inpOffset = arrow

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.fillRect(canvas.width / 2 - wOffset, canvas.height / 2 - hOffset + (inpOffset * 100), 30, 10)
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "white"
        ctx.moveTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.lineTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(canvas.width/2 + 20, canvas.height/2)
        ctx.lineTo(canvas.width / 2 + 50 - wOffset, canvas.height / 2 + 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(canvas.width/2, canvas.height/2 + 20)
        ctx.lineTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 + 15 - hOffset + (inpOffset * 100))
        //ctx.moveTo(canvas.width/2, canvas.height/2)
        ctx.lineTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
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
        ctx.fillText("End of the Day", (canvas.width / 2) - (canvas.width / 8), canvas.height / 4);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item2", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + 100);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + 200);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Start Day", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + 300);
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

SceneManager.addScene(startScene)
SceneManager.addScene(mainScene)
SceneManager.addScene(endScene)


//Previous Code
//---------------------------------------------------------------------------------

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
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = `rgb(${time / 2},${time + 40},${time + 50})`
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", canvas.width / 3, canvas.height / 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${time})`;
        ctx.font = "50px arial"
        ctx.fillText("Press Space to Start", canvas.width / 3, 3 * (canvas.height/4));
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
        if (playerX < -canvas.width / 2) {
            playerX = -canvas.width / 2
        }
        if (playerX > canvas.width / 2 - playerWidth) {
            playerX = canvas.width / 2 - playerWidth;
        }
        if (playerY < -canvas.height / 2 + playerWidth) {
            playerY = -canvas.height / 2 + playerWidth
        }
        if (playerY > canvas.height / 2 - playerHeight) {
            playerY = canvas.height / 2 - playerHeight;
        }
    }
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(50,200,25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)

        //Player
        ctx.beginPath();
        ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (rightFace) {
            ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY + 15, 45, 5);
        }
        else {
            ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY + 15, -5, 5);
        }
        ctx.fill();
        ctx.closePath();


        //Hat
        ctx.beginPath();
        ctx.rect((canvas.width / 2) + playerX - 5, (canvas.height / 2) + playerY, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((canvas.width / 2) + playerX + 5, (canvas.height / 2) + playerY, 30, -20);
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
        ctx.rect(canvas.width / 4, canvas.height / 4, 50, 25);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 4 + canvas.width / 50, canvas.height / 4 - canvas.height / 70, 10, 15)
        ctx.fillStyle = "white ";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width / 4 + 50, canvas.height / 4 + 5, 5, 0, 2 * Math.PI)
        ctx.fillStyle = "pink ";
        ctx.fill();
        ctx.closePath();

        //Box
        ctx.beginPath();
        ctx.rect(canvas.width / 3, canvas.height - canvas.height / 12, canvas.width / 3, canvas.height / 12);
        ctx.fillStyle = "rgb(115, 80, 0)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 3 + canvas.width / 100, canvas.height - canvas.height / 15,
            canvas.width / 3 - canvas.width / 52, canvas.height / 20);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //Coins
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width / 12), canvas.height / 15, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width / 12), canvas.height / 15, 20, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", canvas.width - (canvas.width / 11) + 5, canvas.height / 13);
        ctx.closePath();

        //Coin Count
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, canvas.width - (canvas.width / 20), canvas.height / 13);


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
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)

        //Menu
        ctx.beginPath();
        ctx.rect(canvas.width / 3 - (canvas.width / 11), canvas.height / 3,
            canvas.width / 3 + (canvas.width / 6),
            (canvas.height / 2) + (canvas.height / 10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 3 - (canvas.width / 12), canvas.height / 3 + (canvas.width / 100),
            canvas.width / 3 + ((canvas.width / 6)) - (canvas.width / 55),
            (canvas.height / 2) + (canvas.height / 15));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //Arrow
        let wOffset = canvas.width / 5 + canvas.width / 25
        let hOffset = canvas.height / 12
        inpOffset = arrow

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.fillRect(canvas.width / 2 - wOffset, canvas.height / 2 - hOffset + (inpOffset * 100), 30, 10)
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "white"
        ctx.moveTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.lineTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(canvas.width/2 + 20, canvas.height/2)
        ctx.lineTo(canvas.width / 2 + 50 - wOffset, canvas.height / 2 + 5 - hOffset + (inpOffset * 100))
        //ctx.moveTo(canvas.width/2, canvas.height/2 + 20)
        ctx.lineTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 + 15 - hOffset + (inpOffset * 100))
        //ctx.moveTo(canvas.width/2, canvas.height/2)
        ctx.lineTo(canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + (inpOffset * 100))
        ctx.stroke()
        ctx.fill()


        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("End of the Day", (canvas.width / 2) - (canvas.width / 8), canvas.height / 4);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item2", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + 100);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Item1", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + 200);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Start Day", canvas.width / 2 + 30 - wOffset, canvas.height / 2 - 5 - hOffset + 300);
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
        if (playerX < -canvas.width / 2) {
            playerX = -canvas.width / 2
        }
        if (playerX > canvas.width / 2 - playerWidth) {
            playerX = canvas.width / 2 - playerWidth;
        }
        if (playerY < -canvas.height / 2 + playerWidth) {
            playerY = -canvas.height / 2 + playerWidth
        }
        if (playerY > canvas.height / 2 - playerHeight) {
            playerY = canvas.height / 2 - playerHeight;
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
        ctx.fillStyle = `rgb(${time / 2},${time + 40},${time + 50})`
        ctx.fillRect(0, 0, canvas.width, canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", canvas.width / 3, canvas.height / 2);
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
        ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY, playerWidth, playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (rightFace) {
            ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY + 15, 45, 5);
        }
        else {
            ctx.rect((canvas.width / 2) + playerX, (canvas.height / 2) + playerY + 15, -5, 5);
        }
        ctx.fill();
        ctx.closePath();


        //Hat
        ctx.beginPath();
        ctx.rect((canvas.width / 2) + playerX - 5, (canvas.height / 2) + playerY, 50, 10);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect((canvas.width / 2) + playerX + 5, (canvas.height / 2) + playerY, 30, -20);
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
        ctx.arc(canvas.width - (canvas.width / 12), canvas.height / 15, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width - (canvas.width / 12), canvas.height / 15, 20, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "20px arial"
        ctx.fillText("C", canvas.width - (canvas.width / 11) + 5, canvas.height / 13);
        ctx.closePath();

        //Coin Count
        //Timer
        ctx.fillStyle = "white";
        ctx.font = "25px arial"
        ctx.fillText(coins, canvas.width - (canvas.width / 20), canvas.height / 13);


        //Timer
        ctx.fillStyle = "white";
        ctx.font = "20px arial"
        ctx.fillText(timer, 50, 50);


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
        ctx.rect(canvas.width / 3 - (canvas.width / 11), canvas.height / 3,
            canvas.width / 3 + (canvas.width / 6),
            (canvas.height / 2) + (canvas.height / 10));
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width / 3 - (canvas.width / 12), canvas.height / 3 + (canvas.width / 100),
            canvas.width / 3 + ((canvas.width / 6) - (canvas.width / 53)),
            (canvas.height / 2) + (canvas.height / 15));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();


        //Text
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("End of the Day", (canvas.width / 2) - (canvas.width / 8), canvas.height / 4);
    }

}
*/
