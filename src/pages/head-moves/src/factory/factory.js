import Controller from "../../../head-moves/src/controller/controller.js";
import Service from "../../../head-moves/src/service/service.js";
import storageService from "../../../../global/storageServices.js";
import View from "../../../head-moves/src/view/view.js";
import AnimationService from '../../../../global/animationService.js'
import MouseService from '../../../../global/mouseService.js'
import KeyboardService from '../../../../global/keyboardService.js'


function createServices() {
  const onProgress = () => {
    canvas.stop();
    console.log("clicou");
    mouse.mouseClick();
  };

  const canvas = new AnimationService(onProgress);
  const mouse = new MouseService(canvas);
  const keyboard = new KeyboardService(canvas);

  return { mouse, keyboard };
}

const { mouse, keyboard } = createServices();
console.log('teste');
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(mouse, keyboard),
      service: new Service(),
      storageService: new storageService()
    });
  },
};

export default factory;
