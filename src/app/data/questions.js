import db from './data';

export function loadQuestions() {
  return db.collection('questions')
    .get()
    .then(result => result.docs.map(item => ({
      id: item.id,
      ...item.data(),
    })));
}

export function loadRSQuestions() {
  return db.collection('RSQuestions')
    .get()
    .then(result => result.docs.map(item => ({
      id: item.id,
      ...item.data(),
    })));
}
