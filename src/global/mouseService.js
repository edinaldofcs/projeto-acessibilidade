export default class MouseService {  
  mouseAverage = { x1: [], y1: [] };

  constructor(canvas) {
    this.mouse = document.getElementById("mouse");
    this.canvas = canvas;
    this.mouse.addEventListener("click", () => {
      let x = this.mouse.getBoundingClientRect().left;
      let y = this.mouse.getBoundingClientRect().top;
      this.clicar(x, y);
    });    
  }

  handleMouseMove(x,y) {
    let [x1, y1] = this.updateAverage(this.mouseAverage, x, y, 10);
    this.canvas.move(x1, y1);
    this.mouse.style.left = x1 - 7.5 + "px";
    this.mouse.style.top = y1 - 7.5 + "px";
  }

  clicar(x, y) {
    let element = document.elementFromPoint(x, y);
    if (element.nodeName == "BUTTON") {
      element.click();
    }
  }

  mouseClick(){
    this.mouse.click()
  }

  updateAverage(controller, xx, yy, iterations = 10) {
    if (controller.x1.length == iterations) {
      controller.x1.shift();
    }

    if (controller.y1.length == iterations) {
      controller.y1.shift();
    }

    controller.x1.push(xx);
    controller.y1.push(yy);

    let x1 = controller.x1.reduce((acc, val) => acc + val, 0);
    let y1 = controller.y1.reduce((acc, val) => acc + val, 0);

    x1 = x1 / controller.x1.length;
    y1 = y1 / controller.y1.length;

    return [x1, y1];
  }
}