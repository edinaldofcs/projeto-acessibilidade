import Controller from "../controller/controller.js";
import Service from "../service/service.js";
import View from "../view/view.js";

const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(),
      service: new Service(),      
    });
  },
};

export default factory