//The code to move our player. 
import "../engine/engine.js"
import "../engine/Rabbit.js"
import "../engine/Apple.js"
import "../engine/Player.js"
import "../engine/Box.js"
import "../engine/Coin.js"
import "../engine/Arrow.js"
import Time from "../engine/Time.js"

//See "../layers" for details.
class PlayerComponent extends Component {
    name = "PlayerComponent"
    speed = 20
    start() {
    }
    update() {
      if (keysDown["ArrowRight"]) {
        this.transform.x += this.speed * Time.deltaTime
      }
      if (keysDown["ArrowLeft"]) {
        this.transform.x -= this.speed * Time.deltaTime
      }
      if (keysDown["ArrowUp"]) {
        this.transform.y -= this.speed * Time.deltaTime
      }
      if (keysDown["ArrowDown"]) {
        this.transform.y += this.speed * Time.deltaTime
      }
    }
  
  }
  
  class ControllerComponent extends Component {
    //0 - No tracking
    //1 - Fixed tracking
    //2 - Boundary tracking
    //3 - Momentum tracking
    //4 - Momentum bondary tracking
    start() {
      Camera.main.fillStyle = "green"
    }
    update() {
  
      let tracker = GameObject.getObjectByName("FixedTrackerGameObject")
  
      Camera.main.transform.x = tracker.transform.x;
      Camera.main.transform.y = tracker.transform.y;
  
    }
  }
  
  //A component that follows the player exactly
  class FixedTrackerComponent extends Component {
    name = "FixedTrackerComponent"
    update() {
      let playerGameObject = GameObject
        .getObjectByName("PlayerGameObject")
        .getComponent("PlayerComponent")
      //The uncommented code is identical to this.
      //I'm using this more complex math so we can compare it 
      //to the other tracking options
      //this.transform.x = playerGameObject.transform.x
      let difference = playerGameObject.transform.x - this.transform.x;
      this.transform.x += difference
      let differenceY = playerGameObject.transform.y - this.transform.y;
      this.transform.y += differenceY
    }
  }
  
  //The objects in our scene
  //See "../layers/" for details about the box, player, and controller
  class CameraTrackingScene extends Scene {
    start() {
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("brown")),
        new Vector2(0, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("black")),
        new Vector2(-20, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("magenta")),
        new Vector2(-60, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("yellow")),
        new Vector2(60, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("white")),
        new Vector2(-80, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("grey")),
        new Vector2(80, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("red")),
        new Vector2(-40, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("blue")),
        new Vector2(40, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("darkorchid")),
        new Vector2(40, 0),
        new Vector2(1000, 5)
      )
      this.addGameObject(
        new GameObject("BoxGameObject")
          .addComponent(new Rectangle("blue")),
        new Vector2(40, 0),
        new Vector2(20, 400)
      )
      this.addGameObject(
        new GameObject("PlayerGameObject")
          .addComponent(new PlayerComponent())
          .addComponent(new Player()),
        new Vector2(0, 0),
        new Vector2(10, 10)
      )
      this.addGameObject(
        new GameObject("ControllerGameobject")
          .addComponent(new ControllerComponent())
      )
  
      //Our four different tracking methods
      //The fixed tracking
      this.addGameObject(
        new GameObject("FixedTrackerGameObject")
          .addComponent(new FixedTrackerComponent()),
        //   .addComponent(new Rectangle("Black")),
        new Vector2(0, 0),
        //Make this larger so it is always visible.
        //Otherwise the black square will usually obscure it.
        new Vector2(2, 2)
      )
    
      //Add the helper text game objects
      //The font to use
      let font = "5px Arial"
      //The location for the highest text
      let y = -75
      //The margin between text
      let margin = 7;

  
    }
  }
  
  //export the main scene so the .html file can run the game.
  export default new CameraTrackingScene();