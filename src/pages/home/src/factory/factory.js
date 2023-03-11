import Controller from "../../../home/src/controller/controller.js";
import Service from "../../../home/src/service/service.js";
import storageService from "../../../../global/storageServices.js";
import View from "../../../home/src/view/view.js";

const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(),
      service: new Service(),
      storageService: new storageService()
    });
  },
};

export default factory;
