import MeuFaceMesh from "../../../../functions/faceMesh.js";

export default class Controller {
  #view;
  #service;
  #storageService;
  constructor({ view, service, storageService }) {
    this.#view = view;
    this.#service = service;
    this.faceMesh = new MeuFaceMesh(this.onResults.bind(this));
    this.#storageService = storageService.storage;
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
    if (this.#storageService.isMouth) {
      this.mouseMove(landMarks);
      this.#writeWithMouth(landMarks);
      return;
    }
    this.#writeWithEyes(landMarks);
  }

  #writeWithEyes(landMarks) {
    const eye = this.#service.identifyBlink(landMarks, this.#storageService);
    if (!eye) return;

    this.#view.chooseDomObjectByEye(eye);
  }

  #writeWithMouth(landMarks) {
    const write = this.#service.identifyOpenMouth(
      landMarks[0],
      landMarks[17],
      this.#storageService.mouth
    );
    if (write) {
      this.#view.write();
    }
  }

  mouseMove(landMarks) {
    const axis = this.#service.mouseHead(landMarks, this.#storageService);
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
