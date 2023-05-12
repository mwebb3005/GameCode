/**
 * A rabbit engine-level component
 */
class Rabbit extends Component {
    /**
     * Draw the rabbit to the given context.
     * @param {CanvasRenderingContext2D} ctx The context to draw to.
     */
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
  
  //Add circle to the global namespace.
  window.Rabbit = Rabbit;