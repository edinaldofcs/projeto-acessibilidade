export var config = {
  leftEye: {
    closed: 0.012,
  },
  rightEye: {
    closed: 0.012,
  },
  interval: { interval: Date.now() },
  sensibilitY: 3,
  sensibilitX: 2,
  compensationX: 0,
  compensationY: 0,
  timer: 2
};

export function enableCounter(key) {
  const result = Date.now() - config[key].interval > 800;
  if (result) {
    config[key].interval = Date.now();
  }

  return result;
}

export const groups = [
  ["A", "B", "C", "D", "E", "F"],
  ["G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X"],
  ["Y", "Z", "Ç", "Ã", ", ", "."],
  [" ", "apagar", "salvar", "falar"],
  ["limpar", "frases", "ir para", "..."],
];
