/**
 *
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function showGrid(ctx:CanvasRenderingContext2D){
    let canvas = {
        width:512,
        height:480
    }

    for(let i = -16 ; i <= 496 ; i+=34){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    for(let j = 0 ; j <= 512 ; j+=32){
        ctx.beginPath();
        ctx.moveTo(j,0);
        ctx.lineTo(j,canvas.height);
        ctx.stroke();
    }
     ctx.beginPath();
	 ctx.moveTo(0, 480);
	 ctx.lineTo(canvas.width, 480);
     ctx.stroke();
}
export default showGrid