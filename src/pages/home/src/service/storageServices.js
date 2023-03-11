import { config } from "../../../../functions/config.js";

export default class storageService {
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

  updateStorage(){

  }
}
