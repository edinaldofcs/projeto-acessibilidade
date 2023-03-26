
export default class HeadService {
  constructor() {}

  mouseHead(landmarks, config) {
    let heighteye = window.screen.availHeight / 2;
    let widthEye = window.screen.availWidth / 2;
    let top = 4 * (-0.5 + landmarks[6].y) * -1 * config.sensibilitY;
    let left = 4 * (-0.5 + landmarks[6].x) * -1 * config.sensibilitX;

    top = (heighteye - heighteye * 2 * top) + config.compensationY;
    left = (widthEye + widthEye * 2 * left) + config.compensationX;

    return { top, left };
  }
  
}
