/**
 * A box engine-level component
 */
class Coin extends Component {
    /**
     * Draw the rabbit to the given context.
     * @param {CanvasRenderingContext2D} ctx The context to draw to.
     */
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
    }
}

//Add box to the global namespace.
window.Coin = Coin;