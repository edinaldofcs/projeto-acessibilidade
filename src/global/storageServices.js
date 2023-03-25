import { config } from "../global/config.js";

export default class StorageService {
  storage;
  constructor() {
    this.storage = this.getStorageConfig();
  }

  getStorageConfig() {
    let info = localStorage.getItem("config");
    if (info) {
      return JSON.parse(info);
    }

    localStorage.setItem("config", JSON.stringify(config));
    return config;
  }

  updateStorage(item) {
    let updated = { ...this.storage, ...item };
    localStorage.setItem("config", JSON.stringify(updated));
    this.storage = updated;
  }

  reset() {
    localStorage.setItem("config", JSON.stringify(config));
    this.storage = config;
  }

  saveIrisPosition(position) {
    let info = localStorage.getItem("eye");
    if (info) {
      info = JSON.parse(info);
      info = [...info, ...position];
      localStorage.setItem("eye", JSON.stringify(info));
    } else {
      localStorage.setItem("eye", JSON.stringify(position));
    }
  }

  updateIrisPosition(position) {
    let info = localStorage.getItem("eye");
    if (!info) return;

    info = JSON.parse(info);
    info[2].esquerdo = position.esquerdo;
    info[2].center_x = position.center_x;
    info[2].eye_y = position.eye_y;
    info[2].center_y = position.center_y;

    localStorage.setItem("eye", JSON.stringify(info));
  }

  getIrisPositions() {
    let info = localStorage.getItem("eye");
    let data = {};
    if (!info) return;
    info = JSON.parse(info);
    let x = info[2].esquerdo - 70 - info[2].center_x;
    let y = info[2].eye_y - info[2].center_y;

    if (x > 0) {
      x = x * 0.8;
    }
    if (y < 0) {
      y = y * 0.5;
    } else {
      y = y * 1;
    }
    x = x * -50 + 512;
    // console.log(info[2].eye_y - info[2].center_y);
    y = y * 50 + window.screen.height / 1.5
    // console.log(y);
    data = [x, y];
    return data;
  }
}
