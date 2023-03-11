import { enableCounter } from "../../../../functions/config.js";

export default class Service {
  constructor() {}
  

  mouseHead(landmarks, config) {
    let heighteye = window.screen.availHeight / 2;
    let widthEye = window.screen.availWidth / 2;
    let top = 4 * (-0.5 + landmarks[6].y) * -1 * config.sensibility;
    let left = 4 * (-0.5 + landmarks[6].x) * -1 * config.sensibilitX;

    top = heighteye - heighteye * 2 * top;
    left = widthEye + widthEye * 2 * left;

    return { top, left };
  }

  identifyBlink(landmarks, config) {
    let rightEye = landmarks[145].y - landmarks[159].y;
    let leftEye = landmarks[374].y - landmarks[386].y; //olho cima-baixo
    rightEye = rightEye < config.rightEye.closed;
    leftEye = leftEye < config.leftEye.closed;

    if (leftEye && rightEye) {
      if(!enableCounter("interval")) return
      console.log("both");
      return "both";
    }

    if (rightEye) {
      if(!enableCounter("interval")) return
      console.log("right");
      return "right";
    }
    if (leftEye) {
      if(!enableCounter("interval")) return
      console.log("left");
      return "left";
    }

    return false;
  }

  identifyOpenMouth(labioSuperior, labioInferior, mouth) {   
    const lips = labioInferior.y - labioSuperior.y;   
    if (enableCounter("mouth") && lips >= mouth.open) {    
      return true;
    }
    return false
  }
}
