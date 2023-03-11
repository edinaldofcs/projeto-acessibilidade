import Controller from "../controller/controller.js";
import Service from "../service/service.js";
import StorageService from "../../../../global/storageServices.js";
import View from "../view/view.js";

const storageService = new StorageService()

const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View({storageService}),
      service: new Service()
    });
  },
};

export default factory;
