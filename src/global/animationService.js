export default class AnimationService {
  constructor(progressCallback, storageService) {
    this.canvas = document.createElement("canvas");
    this.setAttributes();
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.startAngle = -1.55;
    this.endAngle = Math.PI * 2;
    this.currentAngle = this.startAngle;
    this.center = this.canvas.getBoundingClientRect().width / 2;
    this.startTime = new Date().getTime();
    this.progressCallback = progressCallback;
    this.canIPlay = false;
    this.previous = "";
    this.next = "";
    this.activateButtons = true;
    this.storageService = storageService;
  }

  setAttributes() {
    this.canvas.setAttribute("id", "mycanvas");
    this.canvas.setAttribute("class", "mycanvas");
    this.canvas.setAttribute("width", "40px");
    this.canvas.setAttribute("height", "40px");
    this.canvas.style.position = "fixed";
    this.canvas.style.zIndex = 1;
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.opacity = "70%";
  }

  draw() {
    this.storageService.getStorageConfig();
    const timeElapsed = new Date().getTime() - this.startTime;
    const progress = timeElapsed / (this.storageService.storage.timer * 1000);

    if (progress > 1) {
      clearInterval(this.animationInterval);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.stop();
      this.progressCallback(1);
    }

    this.currentAngle = this.startAngle + Math.PI * 2 * progress;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.moveTo(this.center, this.center);
    this.ctx.arc(
      this.center,
      this.center,
      20,
      this.startAngle,
      this.currentAngle,
      false
    );
    this.ctx.lineTo(this.center, this.center);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();

    // this.progressCallback(progress);
  }

  play() {
    this.canvas.style.opacity = "70%";
    this.startTime = new Date().getTime();
    this.currentAngle = this.startAngle;
    this.animationInterval = setInterval(() => {
      this.draw();
    }, 10);
  }

  restart() {
    setTimeout(() => {
      if (this.canIPlay) {
        this.stop();
        this.play();
      }
    }, 200);
  }
  stop() {
    clearInterval(this.animationInterval);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.opacity = "0%";
  }

  checkIfButton(element) {
    this.next = element.innerHTML;
    if (this.previous != this.next) {
      this.previous = this.next;
      this.restart();
      this.canIPlay = true;
    }
  }

  checkIfNotButton() {
    this.stop();
    this.canIPlay = false;
    this.previous = "";
    this.next = "-";
  }

  move(x, y) {
    // mover o elemento
    this.canvas.style.left = x - this.center + "px";
    this.canvas.style.top = y - this.center + "px";

    // verificar se o elemento sob o ponteiro do mouse é um botão
    let element = document.elementFromPoint(x, y);
    if (
      element.nodeName === "BUTTON" &&
      this.activateButtons ||
      element.classList.contains("config")
    ) {
      this.checkIfButton(element);
    } else {
      this.checkIfNotButton();
    }
  }
}
