import { createFormFields } from "./helper/create-form-fields.js";

export default class HeadView {
  canvasCtx;
  storageService;
  constructor(mouse) {
    this.canvas = document.getElementById("canvas");
    this.canvasCtx = this.canvas.getContext("2d");
    this.mouse = mouse;
    this.createFormFieldsByObject();
    this.storageService = this.mouse.canvas.storageService;  
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

    this.mouse.handleMouseMove(left, top);
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

  createFormFieldsByObject() {
    const items = [
      {
        step: "0.1",
        value: "2",
        min: "0.1",
        max: "8",
        id: "x_axis",
        text: "Sensibilidade eixo X",
        spanId: "x_axis_l",
        data_storage: "sensibilitX",
      },
      {
        step: "0.1",
        value: "3",
        min: "0.1",
        max: "8",
        id: "y_axis",
        text: "Sensibilidade eixo Y",
        spanId: "y_axis_l",
        data_storage: "sensibilitY",
      },
      {
        step: "1",
        value: "0",
        min: "-200",
        max: "200",
        id: "x_sensibility",
        text: "Compensação eixo x",
        spanId: "x_sensibility_l",
        data_storage: "compensationX",
      },
      {
        step: "1",
        value: "0",
        min: "-200",
        max: "200",
        id: "y_sensibility",
        text: "Compensação eixo y",
        spanId: "y_sensibility_l",
        data_storage: "compensationY",
      },
      {
        step: "0.1",
        value: "2",
        min: "0.5",
        max: "5",
        id: "timer",
        text: "Temporizador",
        spanId: "timer_l",
        data_storage: "timer",
      },
    ];

    createFormFields(items);
    this.setListenner();
  }

  updateLabelPosition(id, label) {
    var slider = document.getElementById(id);
    var value = document.getElementById(label);
    var pixelValue =
      ((slider.value - slider.min) / (slider.max - slider.min)) *
      slider.offsetWidth;
    value.style.left = pixelValue - value.offsetWidth / 2 + "px";
    value.innerHTML = slider.value;
  }

  setListenner() {
    setTimeout(() => {
      document.querySelectorAll("input").forEach((el) => {
        el.value = this.storageService.storage[`${el.dataset.storage}`]  
            
        this.updateLabelPosition(el.id, el.id + "_l");      
        el.addEventListener("input", () => {
          this.updateLabelPosition(el.id, el.id + "_l");
          this.updateStorage({ [`${el.dataset.storage}`]: Number(el.value)});
        });
      });
      
    }, 500);

    const button = document.getElementById('form_button')
    button.addEventListener('click',(e)=>{
      e.preventDefault()
      this.storageService.reset();
      this.updateValues()
    })
  }

  updateStorage(object) {
    this.storageService.updateStorage(object);
    this.storageService.getStorageConfig();
  }

  updateValues(){
    document.querySelectorAll("input").forEach((el) => {
      el.value = this.storageService.storage[`${el.dataset.storage}`]
      this.updateLabelPosition(el.id, el.id + "_l");
    });
  }
  
}
