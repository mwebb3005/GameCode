/**
 * A box engine-level component
 */
class Arrow extends Component {
    /**
     * Draw the rabbit to the given context.
     * @param {CanvasRenderingContext2D} ctx The context to draw to.
     */
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
  
  //Add box to the global namespace.
  window.Arrow = Arrow;