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
