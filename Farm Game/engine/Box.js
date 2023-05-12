/**
 * A box engine-level component
 */
class Box extends Component {
    /**
     * Draw the rabbit to the given context.
     * @param {CanvasRenderingContext2D} ctx The context to draw to.
     */
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
  
  //Add box to the global namespace.
  window.Box = Box;