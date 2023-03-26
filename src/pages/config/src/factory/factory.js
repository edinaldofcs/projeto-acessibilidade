import HeadController from "../controller/headController.js";
import HeadService from "../service/headService.js";
import StorageService from "../../../../global/storageServices.js";
import HeadView from "../view/headView.js";
import AnimationService from "../../../../global/animationService.js";
import MouseService from "../../../../global/mouseService.js";
import KeyboardService from "../../../../global/keyboardService.js";

const storageService = new StorageService();
function createServices() {
  const onProgress = () => {
    canvas.stop();
    mouse.mouseClick();
  };

  const canvas = new AnimationService(onProgress, storageService);
  const mouse = new MouseService(canvas);
  new KeyboardService(canvas);

  return { mouse };
}

const { mouse } = createServices();
const controllerObject = {}

function getViewAndService() {
  const urlParams = new URLSearchParams(window.location.search);

  const key = urlParams.get("page");
 
  console.log(key)

  switch (key) {
    case "head":
      controllerObject.view =  new HeadView(mouse)
      controllerObject.service = new HeadService()
      break;
    case "blink":
      break;
    case "eyemove":
      break;
    default:
      window.location.href = "/";
      break;
  }
}
getViewAndService();

const factory = {
  async initialize() {
    return HeadController.initialize({
      ...controllerObject,
      storageService: storageService,
    });
  },
};

export default factory;
