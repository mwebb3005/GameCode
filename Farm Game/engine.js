let canvas = document.querySelector("#canv")
let ctx = canvas.getContext("2d");

let keysDown = []
let mouseX
let mouseY
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)


//0 is start scene, 1 main scene, 2 is dead scene
let scene = 0;

let pause = false;

function keyUp(e) {
    keysDown[e.key] = false
    //console.log(e)
    if (e.key == "ArrowLeft") {
        console.log("Up Left")
    }
    if (e.key == "ArrowRight") {
        console.log("Up Right")
    }
    if (e.key == "ArrowUp") {
        console.log("Up Up")
    }
    if (e.key == "ArrowDown") {
        console.log("Up Down")
    }
    if (e.key == "p") {
        pause = !pause
    }
}

function keyDown(e) {
    keysDown[e.key] = true
    //console.log(e)
    if (e.key == "ArrowLeft") {
        console.log("Down Left")
    }
    if (e.key == "ArrowRight") {
        console.log("Down Right")
    }
    if (e.key == "ArrowUp") {
        console.log("Down Up")
    }
    if (e.key == "ArrowDown") {
        console.log("Down Down")
    }
    if (e.key == " "){
        //Prevent Default
    }
}

function engineUpdate() {
    if (pause) return
    update()
}

function engineDraw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}

function start(title){
    document.title = title
    function gameLoop() {
        engineUpdate()
        engineDraw()
      }
  
      setInterval(gameLoop, 1000 / 30)
}