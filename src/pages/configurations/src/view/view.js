export default class View {
  canvasCtx;
  #mouse = document.getElementById("mouse");
  #form = document.getElementById("form");
  storageService;
  #mouth = document.getElementById("mouth");
  #eyes = document.getElementById("eyes");
  #leftEye = document.getElementById("left_eye");
  #rightEye = document.getElementById("right_eye");
  #mouthSize = document.getElementById("mouth_size");
  #xAxis = document.getElementById("x_axis");
  #yAxis = document.getElementById("y_axis");
  #write = document.getElementById("activate");

  constructor({ storageService }) {
    this.canvas = document.getElementById("canvas");
    this.canvasCtx = this.canvas.getContext("2d");
    this.storageService = storageService;
    this.initialCheck();
    this.listeners();
  }

  updateStorage(object) {
    this.storageService.updateStorage(object);
    this.storageService.getStorageConfig();
    this.initialCheck();
  }

  showText(text) {
    console.log("here");
    this.#write.innerHTML = text;

    setTimeout(() => {
      this.#write.innerHTML = "";
    }, 500);
  }

  initialCheck() {
    let data = this.storageService.storage;

    this.#leftEye.value = data.leftEye.closed;
    this.#rightEye.value = data.rightEye.closed;
    this.#mouthSize.value = data.mouth.open;
    data.isMouth ? (this.#mouth.checked = true) : (this.#eyes.checked = true);
    data.isMouth
      ? (this.#mouse.style.display = "block")
      : (this.#mouse.style.display = "none");

    this.#xAxis.value = data.sensibilitX;
    this.#yAxis.value = data.sensibility;
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

    this.#mouse.style.top = `${top}px`;
    this.#mouse.style.left = `${left}px`;
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
    // this.canvasCtx.drawImage(
    //   results.image,
    //   0,
    //   0,
    //   this.canvas.width,
    //   this.canvas.height
    // );

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

        // drawConnectors(this.canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
        //   color: "#FF3030",
        // });
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
          color: "#30FF30",
        });

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LIPS, {
          color: "#30FF30",
        });
      }
    }
  }

  restore() {
    this.canvasCtx.restore();
  }

  listeners() {
    this.#mouth.addEventListener("input", () => {
      this.updateStorage({ isMouth: true });
    });

    this.#eyes.addEventListener("input", () => {
      this.updateStorage({ isMouth: false });
    });

    this.#leftEye.addEventListener("input", () => {
      this.updateStorage({
        leftEye: {
          closed: parseFloat(this.#leftEye.value),
        },
      });
    });

    this.#rightEye.addEventListener("input", () => {
      this.updateStorage({
        rightEye: {
          closed: parseFloat(this.#rightEye.value),
        },
      });
    });

    this.#mouthSize.addEventListener("input", () => {
      this.updateStorage({
        mouth: {
          open: parseFloat(this.#mouthSize.value),
          interval: Date.now(),
        },
      });
    });

    this.#xAxis.addEventListener("input", () => {
      this.updateStorage({
        sensibilitX: parseFloat(this.#xAxis.value),
      });
    });

    this.#yAxis.addEventListener("input", () => {
      this.updateStorage({
        sensibility: parseFloat(this.#yAxis.value),
      });
    });

    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.storageService.reset();
      this.storageService.getStorageConfig();
      this.initialCheck();
    });
  }
}
