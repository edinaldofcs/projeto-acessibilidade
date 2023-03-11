import MeuFaceMesh from "../../../../functions/faceMesh.js";

export default class Controller {
  #view;
  #service;
  #storageService;
  constructor({ view, service }) {
    this.#view = view;
    this.#service = service;
    this.faceMesh = new MeuFaceMesh(this.onResults.bind(this));
  }

  onResults(results) {
    try {
      if (!results) return;
      const landMarks = results.multiFaceLandmarks[0];
      this.#view.onResults(results);
      this.#option(landMarks);
    } catch (error) {
      // console.log(error);
    }
  }

  #option(landMarks) {
    if (this.#view.storageService.storage.isMouth) {
      this.mouseMove(landMarks);
      this.writeWithMouth(landMarks);
      return;
    }
    this.#writeWithEyes(landMarks);
  }

  #writeWithEyes(landMarks) {
    const eye = this.#service.identifyBlink(
      landMarks,
      this.#view.storageService.storage
    );
    if (!eye) return;
    let text = "";
    switch (eye) {
      case "left":
        text = "Piscou com o olho esquerdo";
        break;
      case "right":
        text = "Piscou com o olho direito";
        break;
      case "both":
        text = "Piscou com os dois olhos";
        break;
      default:
        break;
    }
    this.#view.showText(text);
  }

  writeWithMouth(landMarks) {
    const write = this.#service.identifyOpenMouth(
      landMarks[0],
      landMarks[17],
      this.#view.storageService.storage.mouth
    );
    if (write) {
      this.#view.showText("Sua boca está aberta");
    }
  }

  mouseMove(landMarks) {
    const axis = this.#service.mouseHead(
      landMarks,
      this.#view.storageService.storage
    );
    this.#view.mouseMove(axis);
  }

  static async initialize(deps) {
    const controller = new Controller(deps);
    return controller.init();
  }

  async init() {
    console.log("init!!");
    await this.loadModel();
  }

  async loadModel() {
    await this.faceMesh.initialize();
    await this.faceMesh.start();
  }
}
