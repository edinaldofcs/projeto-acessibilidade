export default class MeuFaceMesh {
  #video = document.getElementById("video")
  constructor(onResults) {
    this.faceMesh = null;
    this.camera = null;
    this.onResults = onResults;
  }

  async initialize() {
    this.faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.faceMesh.onResults(this.onResults);
    // await new Promise((resolve, reject) => {
    //   this.faceMesh.onResults((results) => {
    //     resolve();
    //   });
    // });
  }

  async start() {
    this.camera = new Camera(this.#video, {
      onFrame: async () => {
        await this.faceMesh.send({ image: this.#video });
      },
      width: 1280,
      height: 720,
    });
    // this.camera.start()
    await new Promise((resolve, reject) => {
      this.camera.start({
        onDone: () => {
          resolve();
        },
      });
    });
  }
}
