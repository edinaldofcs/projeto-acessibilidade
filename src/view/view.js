export default class View {
  canvasCtx;
  #mouse = document.getElementById("mouse");
  #alfabeto;
  value;
  #especiais;
  #texto = document.getElementById("text");
  #letraSelacionada = document.getElementById("selecao");
  #caractere = "";
  #play = document.getElementById("sound");
  #liberado = false;
  constructor() {
    this.video = document.getElementById("video");
    this.canvas = document.getElementById("canvas");
    this.canvasCtx = this.canvas.getContext("2d");
    this.#alfabeto = document.querySelectorAll(".alfabeto");
    this.#especiais = document.querySelectorAll(".especiais");
  }

  mouseMove(axis) {
    const { top, left } = axis;
    this.#mouse.style.top = `${top}px`;
    this.#mouse.style.left = `${left}px`;
    this.selectLetter(top, left);
  }

  selectLetter(top, left) {
    this.selectDomObject(this.#alfabeto, top, left);
    this.selectDomObject(this.#especiais, top, left);
  }

  selectDomObject(element, top, left) {
    element.forEach((letra) => {
      if (this.calculateArea(letra, top, left)) {
        letra.style.backgroundColor = "#CCC";
        this.setTexto(letra);
        this.#letraSelacionada.innerText = letra.innerHTML;
      } else {
        letra.style.backgroundColor = "white";
      }
    });
  }

  setTexto(letra) {
    switch (letra.value) {
      case "apagar":
        this.#caractere = "apagar";
        break;
      case "falar":
        this.#caractere = "falar";
        break;
      case "limpar":
        this.#caractere = "limpar";
        break;
      default:
        this.#caractere = letra.value;
        break;
    }
  }

  escreverComABoca(possoEscrever) {
    if (!possoEscrever) {
      this.#caractere = "";
      return;
    }

    if (possoEscrever && this.#caractere != "") {
      if (this.#caractere.length <= 2) {
        this.#texto.innerHTML += this.#caractere;
        this.#caractere = "";
        return;
      }

      switch (this.#caractere) {
        case "falar":
          this.#play.style.display = 'block';
          this.speakWithDelay(this.#texto.innerHTML, this.hidePlay());
          break;
        case "apagar":
          this.#texto.innerHTML = this.#texto.innerHTML.slice(0, -1);
          break;
        case "limpar":
          this.#texto.innerHTML = "";
          break;
        default:
          break;
      }
      this.#caractere = "";
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

  hidePlay(){
    setTimeout(() => {      
      this.#play.style.display = 'none';
    }, 2000);
  }
}
