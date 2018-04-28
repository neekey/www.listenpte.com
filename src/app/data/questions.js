import db from './data';

export function loadQuestions() {
  return db.collection('questions')
    .get()
    .then(result => result.docs.map(item => item.data()));
}
