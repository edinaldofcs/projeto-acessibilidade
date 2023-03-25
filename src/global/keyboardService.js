export default class KeyboarService {
  constructor(canvas) {
    this.buttonText = document.querySelectorAll("[data-option]");
    this.modify = document.getElementById("modify");
    this.textArea = document.getElementById("text");
    this.shift = document.getElementById("shift");
    this.backSpace = document.getElementById("backspace");
    this.enter = document.getElementById("enter");
    this.space = document.getElementById("space");
    this.clear = document.getElementById("clear");
    this.canvas = canvas;
    this.init();
    this.previous = "";
    this.next = "";
    this.isBlock = false;
  }

  init() {
    this.modify.addEventListener("click", () => {
      this.buttonText.forEach((item) => {
        this.changeLetter(item);
      });
    });

    this.buttonText.forEach((element) => {
      element.addEventListener("click", () => {
        this.write(element.innerHTML);
      });
    });

    this.shift.addEventListener("click", () => {
      this.capitalize();
      this.shift.classList.toggle("button");
      this.textAreaFocusAndRestartCanvas();
    });

    this.backSpace.addEventListener("click", () => {
      this.textArea.value = this.textArea.value.slice(0, -1);
      this.textAreaFocusAndRestartCanvas();
    });

    this.enter.addEventListener("click", () => {
      this.write("\n");
    });

    this.space.addEventListener("click", () => {
      this.write(" ");
    });

    this.clear.addEventListener("click", () => {
      this.textArea.value = "";
      this.textAreaFocusAndRestartCanvas();
    });

    this.mainButtons()
  }
  
  mainButtons(){    
    document.querySelectorAll("#speak").forEach((element) => {
      element.addEventListener("click", () => {
        if (!this.isBlock) {
          this.isBlock = true;
          element.classList.toggle("active");
          this.speakWithDelay(this.textArea.value, () =>
            this.hidePlay(element)
          );
        }
      });
    });
  
    document.querySelectorAll("#canIclick").forEach((element) => {
      element.addEventListener("click", () => {
        element.classList.toggle("active");
        this.canvas.activateButtons = !this.canvas.activateButtons
      });
    });

    document.querySelectorAll("#config").forEach((element) => {
      element.addEventListener("click", () => {
        window.location.href = "../config/index.html"
      });
    });
  }

  textAreaFocus() {
    this.textArea.focus();
    this.textArea.selectionStart = this.textArea.selectionEnd =
      this.textArea.value.length;
  }

  changeLetter(element) {
    let [op1, op2] = element.dataset.option.split("!-");
    let letter = op1 == element.innerHTML.toLowerCase() ? op2 : op1;
    element.innerHTML = letter;
    this.shift.classList.add("button");
  }

  capitalize() {
    this.buttonText.forEach((element) => {
      let character = element.innerHTML;
      if (character == "&lt;" || character == "&gt;") return;

      let isUpper = character == character.toUpperCase();
      if (isUpper) {
        element.innerHTML = character.toLowerCase();
      } else {
        element.innerHTML = character.toUpperCase();
      }
    });
  }
  toLowerCase() {
    this.buttonText.forEach((element) => {
      let character = element.innerHTML;
      if (character == "&lt;" || character == "&gt;") return;

      character = character.toLowerCase();
    });
  }

  write(text) {
    this.textArea.value += text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    this.shift.classList.add("button");
    this.toLowerCase();
    this.textAreaFocusAndRestartCanvas();
  }

  textAreaFocusAndRestartCanvas() {
    this.textAreaFocus();
    this.canvas.restart();
  }

  speakWithDelay(text, callback) {
    responsiveVoice.speak(text, "Brazilian Portuguese Female", {
      onend: function () {
        callback();
      },
    });
  }

  hidePlay = (element) => {
    this.isBlock = false;
    element.classList.toggle("active");
  };
}
