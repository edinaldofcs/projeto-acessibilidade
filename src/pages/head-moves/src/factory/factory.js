import Controller from "../../../head-moves/src/controller/controller.js";
import Service from "../../../head-moves/src/service/service.js";
import StorageService from "../../../../global/storageServices.js";
import View from "../../../head-moves/src/view/view.js";
import AnimationService from '../../../../global/animationService.js'
import MouseService from '../../../../global/mouseService.js'
import KeyboardService from '../../../../global/keyboardService.js'


const storageService = new StorageService()
function createServices() {
  const onProgress = () => {
    canvas.stop();
    mouse.mouseClick();
  };

  const canvas = new AnimationService(onProgress, storageService);
  const mouse = new MouseService(canvas);
  const keyboard = new KeyboardService(canvas);

  return { mouse, keyboard };
}

const { mouse, keyboard } = createServices();
console.log('teste');
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(mouse),
      service: new Service(),
      storageService: new StorageService()
    });
  },
};

export default factory;
