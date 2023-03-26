import MeuFaceMesh from "../../../../global/faceMesh.js";

export default class HeadController {
  #view;
  #service;
  #storageService;
  constructor({ view, service, storageService }) {
    this.#view = view;
    this.#service = service;
    this.faceMesh = new MeuFaceMesh(this.onResults.bind(this));
    this.#storageService = storageService;
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
    this.mouseMove(landMarks);
  }

  mouseMove(landMarks) {
    this.#storageService.getStorageConfig();
    const axis = this.#service.mouseHead(landMarks, this.#storageService.storage);
    this.#view.mouseMove(axis);
  }

  static async initialize(deps) {
    const controller = new HeadController(deps);
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
