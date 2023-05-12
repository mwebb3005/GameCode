/**
 * A apple engine-level component
 */
class Apple extends Component {
    /**
     * Draw the rabbit to the given context.
     * @param {CanvasRenderingContext2D} ctx The context to draw to.
     */
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
  
  //Add circle to the global namespace.
  window.Apple = Apple;