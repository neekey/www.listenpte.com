import { diffWords } from 'diff';

export function getAnswerErrorCount(sentence, answer) {
  if (sentence === answer) {
    return 0;
  }
  const ret = diffWords(sentence, answer);
  return ret.reduce((count, item) => {
    if (item.added || item.removed) {
      return (count + 1);
    }
    return count;
  }, 0);
}

export function getAnswerMistakes(sentence, answer) {
  const mistakes = {};
  if (sentence === answer) {
    return mistakes;
  }
  const ret = diffWords(sentence, answer);
  ret.forEach(item => {
    const value = item.value.trim().toLowerCase();
    if (item.removed && /^[a-zA-Z]+$/.test(value)) {
      const count = value in mistakes ? mistakes[value] : 0;
      mistakes[value] = count + 1;
    }
  });
  return mistakes;
}
