/**
 * A player engine-level component
 */
class Player extends Component {
    /**
     * Draw the rabbit to the given context.
     * @param {CanvasRenderingContext2D} ctx The context to draw to.
     */
    draw(ctx) {
        //Body
        ctx.beginPath();
        ctx.rect(this.transform.x, this.transform.y, 70, 140);
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
        // //Apple
        // if (this.handsFull) {
        //     ctx.beginPath();
        //     ctx.arc(this.transform.x + (this.playerWidth/2), this.transform.y + (this.playerHeight/2), 10, 0, 2 * Math.PI)
        //     ctx.fillStyle = "rgb(255, 40, 10)";
        //     ctx.fill();
        //     ctx.closePath();
        // }
    }
  }
  
  //Add circle to the global namespace.
  window.Player = Player;