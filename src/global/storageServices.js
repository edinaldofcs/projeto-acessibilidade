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

  updateStorage(item){
    let updated = {...this.storage, ...item}
    localStorage.setItem("config", JSON.stringify(updated));
    this.storage = updated
  }

  reset(){
    localStorage.setItem("config", JSON.stringify(config));
    this.storage = config
  }
}
