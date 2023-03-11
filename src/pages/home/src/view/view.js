import { groups } from "../../../../functions/config.js";

export default class View {
  canvasCtx;
  #mouse = document.getElementById("mouse");
  #alphabet;
  value;
  #specialOptions;
  #text = document.getElementById("text");
  #SelectedLetter = document.getElementById("select");
  #character = "";
  #play = document.getElementById("sound");
  #row = -1;
  #column = -1;
  #word = "";

  constructor() {
    this.video = document.getElementById("video");
    this.canvas = document.getElementById("canvas");
    this.canvasCtx = this.canvas.getContext("2d");
    this.#alphabet = document.querySelectorAll(".alphabet");
    this.#specialOptions = document.querySelectorAll(".specialOptions");
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
    this.selectLetter(top, left);
  }

  selectLetter(top, left) {
    this.selectDomObject(this.#alphabet, top, left);
    this.selectDomObject(this.#specialOptions, top, left);
  }

  selectDomObject(element, top, left) {
    element.forEach((letra) => {
      if (this.calculateArea(letra, top, left)) {
        letra.style.backgroundColor = "#7B8F99";
        this.setText(letra);
        this.#SelectedLetter.innerText = letra.innerHTML;
      } else {
        letra.style.backgroundColor = "white";
      }
    });
  }

  setText(letra) {
    switch (letra.value) {
      case "apagar":
        this.#character = "apagar";
        break;
      case "falar":
        this.#character = "falar";
        break;
      case "limpar":
        this.#character = "limpar";
        break;
      default:
        this.#character = letra.value;
        break;
    }
  }

  selectDomObjectByEye(element) {
    element.forEach((letra) => {
      if (letra.value == this.#word) {
        letra.style.backgroundColor = "#FB5";
        this.setText(letra);
        this.#SelectedLetter.innerText = letra.innerHTML;
      } else {
        letra.style.backgroundColor = "white";
      }
    });
  }

  chooseDomObjectByEye(type) {
    switch (type) {
      case "right":
        this.#row = this.#row < 6 ? (this.#row += 1) : 0;
        this.#column = this.#column == -1 ? 0 : this.#column;
        let groupColumn = this.#row > 4 && this.#column > 3 ? 3 : this.#column;
        this.#word = groups[this.#row][groupColumn];
        break;
      case "both":
        this.#column = this.#column < 5 ? (this.#column += 1) : 0;
        this.#row = this.#row == -1 ? 0 : this.#row;
        this.#word = groups[this.#row][this.#column];
        break;
      case "left":
        this.write();
        break;
      default:
        break;
    }
    this.selectDomObjectByEye(this.#alphabet);
    this.selectDomObjectByEye(this.#specialOptions);
  }

  write() {    

    if (this.#character != "") {
      if (this.#character.length <= 2) {
        this.#text.innerHTML += this.#character;
        this.#character = "";
        return;
      }

      switch (this.#character) {
        case "falar":
          this.#play.style.display = "block";
          this.speakWithDelay(this.#text.innerHTML, this.hidePlay());
          break;
        case "apagar":
          this.#text.innerHTML = this.#text.innerHTML.slice(0, -1);
          break;
        case "limpar":
          this.#text.innerHTML = "";
          break;
        default:
          break;
      }
      this.#character = "";
    }
  }

  calculateArea(item, mouseTop, mouseLeft) {
    const { top, left, height, width } = item.getBoundingClientRect();

    return (
      mouseLeft >= left &&
      mouseLeft <= left + width &&
      mouseTop >= top &&
      mouseTop <= top + height
    );
  }

  onResults(results) {
    try {
      this.value = results;
      this.drawResult(results);
      this.canvasCtx.restore();
    } catch (error) {
      // console.log(error);
    }
  }

  getValue() {
    console.log(this.value);
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

  speakWithDelay(text, callback) {
    responsiveVoice.speak(text, "Brazilian Portuguese Female", {
      onend: function () {
        callback();
      },
    });
  }

  hidePlay() {
    setTimeout(() => {
      this.#play.style.display = "none";
    }, 2000);
  }
}
