import { config, destravar_contador } from "../functions/config.js";

const sensibility = 2.4; //2
const sensibilitX = 2; //1.8

export default class Service {
  constructor() {}

  mouseHead(landmarks) {
    let heighteye = window.screen.availHeight / 2;
    let widthEye = window.screen.availWidth / 2;
    let top = 4 * (-0.5 + landmarks[6].y) * -1 * sensibility;
    let left = 4 * (-0.5 + landmarks[6].x) * -1 * sensibilitX;

    top = heighteye - heighteye * 2 * top;
    left = widthEye + widthEye * 2 * left;

    return { top, left };
  }

  identificar_piscada(landmarks) {
    const olho_direito = landmarks[145].y - landmarks[159].y;
    const olho_esquerdo = landmarks[374].y - landmarks[386].y; //olho cima-baixo

    if (
      olho_esquerdo < config.dois_olhos.fechado &&
      olho_direito < config.dois_olhos.fechado &&
      destravar_contador()
    ) {
      console.log("os dois");
      return "pular_grupo";
    }

    if (
      olho_direito < config.olho_direito.fechado &&
      destravar_contador()
    ) {
      console.log({olho_direito, olho_esquerdo});
      return;
    }
    if (
      olho_esquerdo < config.olho_esquerdo.fechado &&
      destravar_contador()
    ) {
        console.log({olho_esquerdo, olho_direito});
      return;
    }
  }

  identificar_boca_aberta(labioSuperior, labioInferior) {
    const labios = labioInferior.y - labioSuperior.y;

    if (destravar_contador("boca") && labios >= config.boca.aberta) {
      return true
    }
  }
}
