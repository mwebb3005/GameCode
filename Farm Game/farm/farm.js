import "../engine/engine.js"
import Time from "../engine/Time.js"


class StartController extends Component {
    start(ctx) {
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
    draw(ctx) {

        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(-1500, -700, 3200, 3000)
        ctx.fillStyle = `rgb(${this.time / 2},${this.time + 40},${this.time + 70})`
        ctx.fillRect(-1500, -900, 3200, 300)
        ctx.fillStyle = "white";
        ctx.font = "100px arial"
        ctx.fillText("Untitled Farm Game", -500, 0);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.time % 120 - 20})`
        ctx.font = "100px arial"
        ctx.fillText("Press Space to Start", -500, 300);

    }
}


//Current issue: can't transfer code to DrawComponent or things break
//Doesn't use Time reference from StartController in intended way 

class StartDrawComponent extends Component {
    draw(ctx) {
        /*
        ctx.fillStyle = "rgb(30,200,25)"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = `rgb(${StartController.time / 2},${StartController.time + 40},${StartController.time + 70})`
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 8)
        ctx.fillStyle = "white";
        ctx.font = "50px arial"
        ctx.fillText("Untitled Farm Game", ctx.canvas.width / 3, ctx.canvas.height / 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${StartController.time % 40 - 10})`
        ctx.font = "50px arial"
        ctx.fillText("Press Space to Start", ctx.canvas.width / 3, 3 * (ctx.canvas.height / 4));
        */
    }
}

class StartCameraComponent extends Component {
    start() {

    }
    update() {
        this.parent.transform.x += 0;
        // this.parent.transform.sx = 10;
        // this.parent.transform.sy = 10;
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
        Camera.main.parent.addComponent(new StartCameraComponent());
    }
}

//---------------------------------------------------------------------------

class Inventory{
    static coins = 0;
    static speed = 15;
    static intim = 200;
    static eco = 1;
}

class MainScene extends Scene {
    start(ctx) {
        this.addGameObject(new GameObject("TimerGameObject").addComponent(new TimerComponent()))
        //this.addGameObject(new GameObject("PlayerGameObject").addComponent(new PlayerComponent()))
        //this.addGameObject(new GameObject("RabbitGameObject").addComponent(new RabbitComponent()))
        //this.addGameObject(new GameObject("BoxGameObject").addComponent(new BoxComponent()))
        //this.addGameObject(new GameObject("AppleGameObject").addComponent(new AppleComponent()))
        this.addGameObject(new GameObject("CoinCounterGameObject").addComponent(new CoinCounterComponent()))
        this.addGameObject(new GameObject("MainControllerGameObject").addComponent(new MainController()))
        GameObject.getObjectByName("CoinCounterGameObject").doNotDestroyOnLoad()
        Camera.main.parent.addComponent(new MainCameraComponent());

    }
}

class MainCameraComponent extends Component{
    start(){

    }
    update(){
        // this.transform.x = 75;
        //  this.transform.y = 75;
        //  this.transform.sx = 3;
        //  this.transform.sy = 3;
        this.transform.x = 50
    }
}

class MainController extends Component {
    maxTime = 1;
    timeSinceLastApple = this.maxTime

    start(ctx) {
        
        
        
        let playerGameObject = new GameObject("PlayerGameObject")
            let playerComponent = new PlayerComponent();
            playerComponent.addListener(this)
            // playerComponent.addListener(GameObject.getObjectByName("AppleGameObject").getComponent("AppleComponent"))
            // playerComponent.addListener(GameObject.getObjectByName("BoxGameObject").getComponent("BoxComponent"))
            playerGameObject.addComponent(playerComponent)
            GameObject.instantiate(playerGameObject)
        

        for (let i = 0; i < 5; i++) {
            let rabbitGameObject = new GameObject("RabbitGameObject")
            let rabbitComponent = new RabbitComponent();
            rabbitComponent.addListener(this)
            // rabbitComponent.addListener(GameObject.getObjectByName("AppleGameObject").getComponent("AppleComponent"))
            rabbitGameObject.addComponent(rabbitComponent)
            GameObject.instantiate(rabbitGameObject)
            
        }
        for (let i = 0; i < 5; i++) {
            let appleGameObject = new GameObject("AppleGameObject")
            let appleComponent = new AppleComponent();
            appleComponent.addListener(this)
            // appleComponent.addListener(GameObject.getObjectByName("PlayerGameObject").getComponent("PlayerComponent"))
            // appleComponent.addListener(GameObject.getObjectByName("RabbitGameObject").getComponent("RabbitComponent"))
            appleGameObject.addComponent(appleComponent)
            GameObject.instantiate(appleGameObject)
            
        }
        

        
        let boxGameObject = new GameObject("BoxGameObject")
            let boxComponent = new BoxComponent();
            boxComponent.addListener(this)
            // boxComponent.addListener(GameObject.getObjectByName("PlayerGameObject").getComponent("PlayerComponent"))
            // boxComponent.addListener(GameObject.getObjectByName("CoinCounterGameObject").getComponent("CoinCounterComponent"))
            boxGameObject.addComponent(boxComponent)
            GameObject.instantiate(boxGameObject)

        let coinCounterGameObject = new GameObject("CoinCounterGameObject")
            let coinCounterComponent = new CoinCounterComponent();
            coinCounterComponent.addListener(this)
            // boxComponent.addListener(GameObject.getObjectByName("PlayerGameObject").getComponent("PlayerComponent"))
            // boxComponent.addListener(GameObject.getObjectByName("CoinCounterGameObject").getComponent("CoinCounterComponent"))
            coinCounterGameObject.addComponent(coinCounterComponent)
            GameObject.instantiate(coinCounterGameObject)

        GameObject.getObjectByName("PlayerGameObject").doNotDestroyOnLoad()
        GameObject.getObjectByName("CoinCounterGameObject").doNotDestroyOnLoad()

        
    }
    addApple(){
        let toAdd = new GameObject("AppleGameObject")
            GameObject.instantiate(toAdd)
            let appleComponent = toAdd.getComponent("AppleComponent")
            appleComponent.addListener(this)
    }
    update() {
        if(this.timeSinceLastApple >= this.maxTime){
          this.addApple;
          this.timeSinceLastApple = 0;
        }
        this.timeSinceLastApple += Time.deltaTime;
    }
    handleMessage(message){
        if (message.message == "ApplePicked"){
            let toAdd = new GameObject("AppleGameObject")
            GameObject.instantiate(toAdd)
            let appleComponent = toAdd.getComponent("AppleComponent")
            appleComponent.addListener(this)
        }
    }
    
}

class TimerComponent extends Component {
    name = "TimerComponent"
    start(ctx) {
        this.time = 0
        this.timer = 100
        this.transform.x = -1470
        this.transform.y = -1470
    }
    update(ctx) {
        this.time++
        //Need to increase to match an actual second 
        if (this.time > 10) {
            this.timer--;
            this.time = 0;
        }
        if (this.timer < 0) {
            SceneManager.changeScene(2)
        }
    }
    draw(ctx) {
        //Sky
        ctx.fillStyle = "rgb(50,240,250)"
        ctx.fillRect(-1500, -900, 3200, 200)

        //Background
        ctx.fillStyle = "green"
        ctx.fillRect(-1500, -700, 3200, 3000)

        //Timer
        ctx.fillStyle = "white"
        ctx.font = "100px arial"
        ctx.fillText(this.timer, -1400, -750);
    }
}

class PlayerComponent extends Component {
    name = "PlayerComponent"
    start(ctx) {
        this.width = ctx.canvas.width
        this.height = ctx.canvas.height
        this.rightFace = true;
        this.playerWidth = 75
        this.playerHeight = 150
        this.transform.x = 0//((ctx.canvas.width)) / 2
        this.transform.y = 0//(ctx.canvas.height) / 2
        this.time = 0
        this.timer = 100
        this.speed = Inventory.speed
        this.handsFull = false
        this.scareDistance = Inventory.intim
        // PlayerComponent.addListener(this)
        // PlayerComponent.addListener(GameObject.getObjectByName("AppleGameObject").getComponent("AppleComponent"))

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
    update(ctx) {
        if (SceneManager.getActiveScene() == 2){
            this.transform.x = -500
            this.transform.y = 0
        }
        else{
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= this.speed * Time.deltaTime * 20
            this.rightFace = false
        }
        else if (keysDown["ArrowRight"]) {
            this.transform.x += this.speed * Time.deltaTime * 20
            this.rightFace = true
        }
        if (keysDown["ArrowUp"]) {
            this.transform.y -= this.speed * Time.deltaTime * 20
        }
        else if (keysDown["ArrowDown"]) {
            this.transform.y += this.speed * Time.deltaTime * 20
        }

        //Constrain the player position to screen
        //Left
        if (this.transform.x < -1525 + this.playerWidth) {
            this.transform.x = -1525 + this.playerWidth
        }
        //Right
        if (this.transform.x > 1550 - this.playerWidth) {     //- this.transform.x
            this.transform.x = 1550 - this.playerWidth        //- this.transform.x
        }
        //Top
        if (this.transform.y < -750) {
            this.transform.y = -750
        }
        //Bottom
        if (this.transform.y > 700) {    //- this.transform.y
            this.transform.y = 700      //- this.transform.y
        }

        if ((this.transform.y + this.playerHeight >= ctx.canvas.height/2 - ctx.canvas.height / 12) &&
            ((this.transform.x + this.playerWidth >= -ctx.canvas.height / 2 + ctx.canvas.width / 3) || this.transform.x + this.playerWidth <= (ctx.canvas.width/2 - ctx.canvas.width / 3))) {
                this.transform.x = this.transform.x
                this.transform.y >= ctx.canvas.height/2 - ctx.canvas.height / 12
        }
        
        
        }
    }
    // handleUpdate(component, eventName) {
    //     if (eventName == "AppleTouched") {
    //         let appleComponent = GameObject
    //             .getObjectByName("AppleGameObject")
    //             .getComponent("AppleComponent")
    //         if (this.handsFull == false) {
    //             this.handsFull = true;
    //         }
    //     }
        
    // }
    handleMessage(message) {
        if (message.message == "ApplePicked") {
            this.handsFull = true
        }
        if (message.message == "AppleDeposit") {
            this.handsFull = false
        }
        if(message.message == "UpgradeSpeed"){
            this.speed = this.speed + 2
        }
        if(message.message == "UpgradeIntimidation"){
            this.speed = this.scareDistance + 20
        }
    }

    draw(ctx) {
        //Body
        ctx.beginPath();
        ctx.rect(this.transform.x, this.transform.y, this.playerWidth, this.playerHeight);
        ctx.fillStyle = "rgb(255, 245, 190)";
        if (this.rightFace) {
            ctx.rect(this.transform.x, this.transform.y + 25, 90, 15);
        }
        else {
            ctx.rect(this.transform.x, this.transform.y + 25, -15, 15);
        }
        ctx.fill();
        ctx.closePath();
        //Hat
        ctx.beginPath();
        ctx.rect( this.transform.x - 5, this.transform.y, 90, 20);
        ctx.fillStyle = "rgb(138, 115, 10)";
        ctx.rect(this.transform.x + 5, this.transform.y, 70, -20);
        ctx.fill();
        ctx.closePath();
        //Apple
        if (this.handsFull) {
            ctx.beginPath();
            ctx.arc(this.transform.x + (this.playerWidth/2), this.transform.y + (this.playerHeight/2), 10, 0, 2 * Math.PI)
            ctx.fillStyle = "rgb(255, 40, 10)";
            ctx.fill();
            ctx.closePath();
        }
    }
}

class AppleComponent extends Component {
    name = "AppleComponent"
    start(ctx) {
        this.transform.x = -1500 + (3000 / (Math.random() * 10))
        this.transform.y = -600 + (1000 / (Math.random() * 10))
        this.touched = false
    }
    update(ctx) {
        //Mark to destroy if touched 
        //Pseudocode, need to decide on logic for touched 
        let playerGameObject = GameObject.getObjectByName("PlayerGameObject")
        let playerComponent = playerGameObject.getComponent("PlayerComponent")
        let playerX = playerComponent.transform.x;
        let playerY = playerComponent.transform.y;
        let playerWidth = playerComponent.playerWidth
        let playerHeight = playerComponent.playerHeight
        let playerHands = playerComponent.handsFull

        if (((playerX >= this.transform.x - playerWidth ) && (playerX  <= this.transform.x + playerWidth)) 
            && ((playerY  >= this.transform.y - playerHeight) && (playerY  <= this.transform.y + playerHeight))
            && !(playerHands)) {
            this.touched = true
            console.log("Player on Apple")
            this.updateListeners("ApplePicked")
            this.parent.destroy()
        }

        // if (this.transform.x == 0 && this.transform.y == 0){
        //     this.transform.x = ctx.canvas.width/ (Math.random() * 10)
        //     this.transform.y = ctx.canvas.height/ (Math.random() * 10)
        // }

        //let playerComponent = GameObject.getObjectByName("PlayerGameObject").getComponent("PlayerComponent")

    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.transform.x, this.transform.y, 50, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 40, 10)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.transform.x - 5, this.transform.y - 60, 10, 30)
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

class RabbitComponent extends Component {
    name = "RabbitComponent"
    start(ctx) {
        this.movementTimer = 0
        this.bunnyVX = 0
        this.bunnyVY = 0
        this.moveRabbit = true
        this.transform.x = 500
        this.transform.y = 500
        this.xV = -1
        this.xY = -1
        this.newDirection = -1 + Math.floor((Math.random()))
    }
    update(ctx) {
        //Pseudo Logic: Random movement every 100 time, if in certain range of Apple Array, move towards apple
        

        if (this.moveRabbit) {
            this.movementTimer = 10
            if (this.movementTimer > 1)
                this.moveRabbit = false
        }
        else {
            this.movementTimer--
            if (this.movementTimer == 0) {
                this.moveRabbit = true
            }
        }

        let playerGameObject = GameObject.getObjectByName("PlayerGameObject")
        let playerComponent = playerGameObject.getComponent("PlayerComponent")
        let playerX = playerComponent.transform.x;
        let playerY = playerComponent.transform.y;
        let scareDistance = playerComponent.scareDistance;

        let appleGameObject = GameObject.getObjectByName("AppleGameObject")
        let appleComponent = appleGameObject.getComponent("AppleComponent")
        let appleX = appleComponent.transform.x;
        let appleY = appleComponent.transform.y;

        if ((this.transform.x >= appleX - 50 && this.transform.x <= appleX + 50) && 
            (this.transform.y >= appleY - 50 && this.transform.y <= appleY + 50)){
        //     this.transform.x = 100
            // This will probably work to center it 
            this.transform.x += (appleX / 20)
            this.transform.y += (appleX / 20)
        }
        // if ((this.transform.y >= appleY - 50 && this.transform.y <= appleY + 50)){
        // //     this.transform.x = 100
        //     // This will probably work to center it 
            
        // }
        // if ((this.transform.x >= appleX - 50 && this.transform.x <= appleX + 50)){
        // //     this.transform.x = 100
        //     // This will probably work to center it 
        //     this.transform.x += (appleX / 20)
        // }


        if ((this.transform.x >= playerX - scareDistance && this.transform.x <= playerX + scareDistance)){
            // this.xV *= -1
            this.transform.x += -(this.transform.x / this.transform.x) * 3
        }
        if ((this.transform.y >= playerY - scareDistance && this.transform.y <= playerY + scareDistance)){
            // this.xV *= -1
            this.transform.y += -(this.transform.y / this.transform.y) * 3
        }

        
        if (this.transform.y >= playerY - scareDistance && this.transform.y <= playerY + scareDistance){
            this.yV *= -1
            this.transform.y += this.yV 
        }
        else if (this.moveRabbit) {
            this.newDirection = (-1 * (Math.random()))+ (Math.random())

            if (this.newDirection < -.6) {
                this.transform.x += -30
                this.transform.y += -30
            }
            else if (this.newDirection < -.4) {
                this.transform.x += 0
                this.transform.y += -30
            }
            else if (this.newDirection < -.2) {
                this.transform.x += -30
                this.transform.y += 0
            }
            else if (this.newDirection < 0) {
                this.transform.x += -30
                this.transform.y += 30
            }
            else if (this.newDirection < .2) {
                this.transform.x += 30
                this.transform.y += 0
            }
            else if (this.newDirection < .4) {
                this.transform.x += 0
                this.transform.y += 30
            }
            else if (this.newDirection < .6) {
                this.transform.x += 30
                this.transform.y += 30
            }
            
        }
        
        

        // if (this.moveRabbit){
        //     this.transform.x += 6 //* this.moveDir
        //     this.transform.y += 6 //* this.moveDir
        // }
        

        //Keep bunny within boundaries of map
        if (this.transform.x < -1500) {
            this.parent.destroy()
            this.updateListeners("BunnyOutOfBounds")
        }
        if (this.transform.y < -100) {
            this.parent.destroy()
            this.updateListeners("BunnyOutOfBounds")
        }
        if (this.transform.x > 1500) {
            this.parent.destroy()
            this.updateListeners("BunnyOutOfBounds")
        }
        if (this.transform.y > 1000) {
            this.parent.destroy()
            this.updateListeners("BunnyOutOfBounds") 
        }
        


    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.transform.x, this.transform.y, 100, 50);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.transform.x + 15, -20 + this.transform.y, 20, 40)
        ctx.fillStyle = "white ";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.transform.x, this.transform.y, 10, 0, 2 * Math.PI)
        ctx.fillStyle = "pink ";
        ctx.fill();
        ctx.closePath();
    }
}

class BoxComponent extends Component {
    name = "BoxComponent"
    start(ctx) {

    }
    update(ctx) {
        let playerGameObject = GameObject.getObjectByName("PlayerGameObject")
        let playerComponent = playerGameObject.getComponent("PlayerComponent")
        let playerX = playerComponent.transform.x;
        let playerY = playerComponent.transform.y;
        let playerHeight = playerComponent.playerHeight
        let playerWidth = playerComponent.playerWidth
        let handsFull = playerComponent.handsFull

        if ((playerY + playerHeight >= 700) &&
            ((playerX + playerWidth >= -600) && playerX <= (550))) {
            console.log("At Box")
            if (handsFull) { 
                this.updateListeners("AppleDeposit")
                Inventory.coins = Inventory.coins + Inventory.eco
            }
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(-600, 700, 1150, 300);
        ctx.fillStyle = "rgb(115, 80, 0)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(-570, 720, 1100, 55);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}


class CoinCounterComponent extends Component {
    name = "CoinCounterComponent"
    start(ctx) {
        this.coins = Inventory.coins
        this.economy = Inventory.eco
    }
    update(ctx) {

    }
    handleMessage(message) {
        if (message.message == "AppleDeposit") {
            this.coins = this.coins + this.economy
        }
        if (message.message == "UpgradeEconomy"){
            this.economy = this.economy + 1
        }
    }
    draw(ctx) {
        //Coin Icon
        ctx.beginPath();
        ctx.arc(1420, -770, 50, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(190, 170, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(1420, -770, 45, 0, 2 * Math.PI)
        ctx.fillStyle = "rgb(255, 240, 30)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(176, 165, 50)";
        ctx.font = "70px arial"
        ctx.fillText("C", 1395, -745);
        ctx.closePath();
        //Coin Count
        ctx.fillStyle = "white";
        ctx.font = "70px arial"
        ctx.fillText(this.coins, 1480, -745);
    }
}

//End Scene----------------------------------------------------------------------------
class EndController extends Component {
    start(ctx){
        let arrowGameObject = new GameObject("ArrowGameObject")
            let arrowComponent = new ArrowComponent();
            arrowComponent.addListener(this)
            arrowComponent.addListener(GameObject.getObjectByName("PlayerGameObject").getComponent("PlayerComponent"))
            arrowComponent.addListener(GameObject.getObjectByName("CoinCounterGameObject").getComponent("CoinCounterComponent"))
            arrowGameObject.addComponent(arrowComponent)
            GameObject.instantiate(arrowGameObject)


            //For store and upgrading, create a static class that keeps track of upgrades, coins, etc. 
    }
}


class EndDrawComponent extends Component {
    draw(ctx) {
        //Grass
        ctx.fillStyle = "rgb(5,100,25)"
        ctx.fillRect(-1520, -700, 3200, 1500)
        //Sky
        ctx.fillStyle = "rgb(15,20,145)"
        ctx.fillRect(-1520, -1000, 3200, 300)

        //Menu
        ctx.beginPath();
        ctx.rect(-900, -500, 1700, 1000);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(-880, -480, 1660, 960);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}


class ArrowComponent extends Component {
    name = "ArrowComponent"
    start(ctx) {
        this.arrow = 0
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }
    update() {
        // let playerGameObject = GameObject.getObjectByName("PlayerGameObject")
        // let playerComponent = playerGameObject.getComponent("PlayerComponent")
        // let playerX = playerComponent.transform.x;
        // let playerY = playerComponent.transform.y;
        // let scareDistance = playerComponent.scareDistance;

        // let coinCounterGameObject = GameObject.getObjectByName("CoinCounterGameObject");
        // let coinCounterComponent = coinCounterGameObject.getComponent("CoinCounterComponent")
        // let coins = coinCounterComponent.coins

        //Scene 2
        this.freezeTime += (50 / 500) 
        if (keysDown["Enter"]) {
            SceneManager.changeScene(1)
        }
        
        if(this.arrow == 0 && Inventory.coins >= 2){
            if(keysDown[" "]){
                this.updateListeners("UpdateSpeed")
                this.updateListeners("CoinSubtract")
                Inventory.speed = Inventory.speed + 2
                Inventory.coins = Inventory.coins - 2
            }
        }
        if(this.arrow == 1 && Inventory.coins >= 2){
            if(keysDown[" "]){
                this.updateListeners("UpdateIntimidation")
                this.updateListeners("CoinSubtract")
                Inventory.intim = Inventory.intim + 50
                Inventory.coins = Inventory.coins - 2
            }
        }
        if(this.arrow == 2 && Inventory.coins >= 2){
            if(keysDown[" "]){
                this.updateListeners("UpdateEconomy")
                this.updateListeners("CoinSubtract")
                Inventory.eco = Inventory.eco + 1
                Inventory.coins = Inventory.coins - 2
            }
        }
        if(this.arrow == 3){
            if(keysDown[" "]){
                SceneManager.changeScene(1)
            }
        }
        else if (keysDown["ArrowDown"] && this.freezeTime >= this.maxFreezeTime) {
            this.freezeTime = 0
            this.arrow += 1
            if (this.arrow > 3) {
                this.arrow = 0
                console.log("ARROW ARROW DOWN")
            }

        }
        else if (keysDown["ArrowUp"] && this.freezeTime >= this.maxFreezeTime) {
            this.freezeTime = 0
            this.arrow -= 1
            if (this.arrow < 0) {
                this.arrow = 3
                console.log("ARROW ARROW UP")
            }
        }

        //timer = 100;      Not sure why this was here, leaving just in case
    }
    draw(ctx) {
        //Arrow
        this.wOffset = ctx.canvas.width / 5 + ctx.canvas.width / 24
        this.hOffset = ctx.canvas.height / 12
        this.inpOffset = this.arrow

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.fillRect(-800, -410 + (this.inpOffset * 215), 60, 20)
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "white"
        ctx.moveTo(-745, -410 + (this.inpOffset * 215))
        ctx.lineTo(-745, -370 + (this.inpOffset * 215))
        //ctx.moveTo(ctx.canvas.width/2 + 20, ctx.canvas.height/2)
        ctx.lineTo(-700, -400 + (this.inpOffset * 215))
        //ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2 + 20)
        ctx.lineTo(-745, -430 + (this.inpOffset * 215))
        //ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2)
        ctx.lineTo(-745, -410 + (this.inpOffset * 215))
        ctx.stroke()
        ctx.fill()
    }
}

class EndTextComponent extends Component {
    name = "EndTextComponent"
    start(ctx) {
        this.wOffset = ctx.canvas.width / 5 + ctx.canvas.width / 24
        this.hOffset = ctx.canvas.height / 12
    }
    update() {

    }
    draw(ctx) {
        //Text
        ctx.fillStyle = "white";
        ctx.font = "150px arial"
        ctx.fillText("End of the Day", -540, -550);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "100px arial"
        ctx.fillText("Upgrade Speed", -640, -370);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "100px arial"
        ctx.fillText("Upgrade Intimidation", -640, -150);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "100px arial"
        ctx.fillText("Upgrade Economy", -640, 80);
        //Text
        ctx.fillStyle = "white";
        ctx.font = "100px arial"
        ctx.fillText("Start Day", -640, 280);
    }
}

class EndScene extends Scene {
    start() {
        this.addGameObject(new GameObject("EndControllerGameObject").addComponent(new EndController()))
        this.addGameObject(new GameObject("EndDrawGameObject").addComponent(new EndDrawComponent()))
        this.addGameObject(new GameObject("ArrowGameObject").addComponent(new ArrowComponent()))
        this.addGameObject(new GameObject("EndTextGameObject").addComponent(new EndTextComponent()))
        //this.addGameObject("CoinCounterGameObject")
    }
}



let startScene = new StartScene()
let mainScene = new MainScene()
let endScene = new EndScene()

window.allScenes = [startScene, mainScene, endScene]


//Previous Code
//---------------------------------------------------------------------------------



//Main (Attempts)-----------------------------------------------------------------

/*
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
*/

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
