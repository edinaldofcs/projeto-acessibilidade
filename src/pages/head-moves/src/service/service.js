import { enableCounter } from "../../../../global/config.js";

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
  
}
