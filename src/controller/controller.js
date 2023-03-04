import MeuFaceMesh from "../functions/faceMesh.js";

export default class Controller {
  #view;
  #service;
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
      this.#view.mouseMove(this.#service.mouseHead(landMarks));
      this.#service.identificar_piscada(landMarks);

      const escrever = this.#service.identificar_boca_aberta(
        landMarks[0],
        landMarks[17]
      );
      this.#view.escreverComABoca(escrever);
    } catch (error) {
      console.log(error);
    }
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
