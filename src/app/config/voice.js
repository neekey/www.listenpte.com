export function getVoiceURLForWFD(sentIndex, accentIndex) {
  return `//voice.listenpte.com/wfd/${sentIndex}_${accentIndex}.mp3`;
}

export function getRandomAccentIndex() {
  return Math.ceil(15 * Math.random());
}
