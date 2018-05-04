import { Howl } from 'howler';

const VOICE_CACHE = {};
const EMPTY_FUNC = () => null;

export function playVoice(voiceURL, option = {}) {
  const onLoad = option.onLoad || EMPTY_FUNC;
  const onEnd = option.onEnd || EMPTY_FUNC;
  let sound = VOICE_CACHE[voiceURL];

  if (sound) {
    onLoad();
    sound.play();
  } else {
    sound = new Howl({
      src: [voiceURL],
    });
    VOICE_CACHE[voiceURL] = sound;

    sound.once('load', () => {
      onLoad();
      sound.play();
    });
  }

  sound.on('end', onEnd);
}
