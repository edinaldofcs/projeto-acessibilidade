export const config = {
  dois_olhos: {
    fechado: 0.012,
    aberto: 1,
    intervalo: Date.now(),
  },
  olho_esquerdo: {
    fechado: 0.012,
    aberto: 1,
    intervalo: Date.now(),
  },
  olho_direito: {
    fechado: 0.012,
    aberto: 1,
    intervalo: Date.now(),
  },
  boca:{
    aberta: 0.06,
    intervalo: Date.now(),
  },
  intervalo: Date.now(),
};

export function destravar_contador() {
  const result = Date.now() - config.intervalo > 1000;
  if (result) {
    config.intervalo = Date.now();
    return true;
  }
  return false;
}

export const grupos = [
  ["A", "B", "C", "D", "E", "F"],
  ["G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", 'R'],
  ["S", "T", "U", "V", "W", "X"],
  ["Y", "Z", "Ç", "SS", "RR", "."],
  ["ESPAÇO", "APAGAR", "SALVAR", "FALAR"],
  ["LIMPAR", "FRASES", "IR PARA", "..."]
];
