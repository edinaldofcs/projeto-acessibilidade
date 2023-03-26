export default class View {
  canvasCtx;

  constructor(mouse) {
    this.canvas = document.getElementById("canvas");
    this.canvasCtx = this.canvas.getContext("2d");
    this.mouse = mouse
  }

  mouseMove(axis) {
    let { top, left } = axis;
    top = top < 0 ? 0 : top;
    left =
      left < 0
        ? 0
        : left > window.screen.availWidth
        ? window.screen.availWidth - 20
        : left;

    this.mouse.handleMouseMove(left, top)   
    
  }   
  
  onResults(results) {
    try {
      this.drawResult(results);
      this.canvasCtx.restore();
    } catch (error) {
      // console.log(error);
    }
  }

  drawResult(results) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.drawImage(
      results.image,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.#drawFace(results);
  }

  #drawFace(results) {
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        // drawConnectors(this.canvasCtx, landmarks, FACEMESH_TESSELATION,
        //                {color: '#C0C0C070', lineWidth: 1});
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
          color: "#FF3030",
        });

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
          color: "#FF3030",
        });
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
          color: "#30FF30",
        });

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {
          color: "#30FF30",
        });
      }
    }
  }

  restore() {
    this.canvasCtx.restore();
  }
  
}
