import React from 'react';
import PropTypes from 'prop-types';
const AppContext = React.createContext({});
const { Provider } = AppContext;
export const StateConsumer = AppContext.Consumer;
import firebase from 'app/data/firebase';
import {
  login,
  loadUserData,
  addUserAnswer,
  updateUserQuestionStats,
  updateUserRSQuestionStats,
} from 'app/data/user';
import { loadQuestions, loadRSQuestions } from 'app/data/questions';
import { getAnswerErrorCount, getAnswerMistakes } from 'app/utils/question';
import shuffleArray from 'app/utils/shuffleArray';

export default class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    // this is the app state
    const stateFns = this.getStateFns();
    this.state = {
      isLoadingUser: true,
      data: {
        user: null,
        userData: null,
        questions: [],
      },
      ...stateFns,
    };
  }

  componentDidMount() {
    this.initUserAuth();
  }

  getStateFns() {
    const fns = {};
    const proto = Object.getPrototypeOf(this);
    Object.keys(Object.getOwnPropertyDescriptors(proto)).forEach(key => {
      if (key.startsWith('action') || key.startsWith('select')) {
        fns[key] = this[key].bind(this);
      }
    });
    return fns;
  }

  initUserAuth() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isLoadingUser: false,
        data: {
          ...this.state.data,
          user,
        },
      });
    });
  }

  $setState(state, fn) {
    console.log('before update state', state); // eslint-disable-line
    this.setState(state, () => {
      console.log('after update state', this.state); // eslint-disable-line
      if (fn) {
        fn();
      }
    });
  }

  selectCurrentUser() {
    return this.state.data.user;
  }

  selectIsLoadingUser() {
    return this.state.isLoadingUser;
  }

  selectIsUserLogin() {
    return !!this.state.data.user;
  }

  selectQuestion(questionId) {
    return this.state.data.questions.find(item => item.id === questionId);
  }

  selectQuestions() {
    return this.state.data.questions;
  }

  selectAnswersForQuestion(questionId) {
    return this.state.data.userData.answers.filter(
      item => item.questionId === questionId);
  }

  selectAnsers() {
    return this.state.data.answers;
  }

  selectWeightedSortedQuestions() {
    const questionStats = this.state.data.userData.questionStats;
    const questions = shuffleArray(this.state.data.questions);
    return questions.map(question => {
      const ret = { ...question, weight: 100 };
      const questionStat = questionStats[question.id];
      if (questionStat) {
        ret.weight += (questionStat.errorCount - questionStat.count * 15);
      }
      return ret;
    }).sort((a, b) => b.weight - a.weight);
  }

  selectWeightedSortedRSQuestions() {
    const questionStats = this.state.data.userData.RSQuestionStats;
    const questions = shuffleArray(this.state.data.RSQuestions);
    return questions.map(question => {
      const ret = { ...question, weight: 100 };
      const questionStat = questionStats[question.id];
      if (questionStat) {
        ret.weight += (questionStat.errorCount - questionStat.count * 15);
      }
      return ret;
    }).sort((a, b) => b.weight - a.weight);
  }

  selectUserWFDMistakes() {
    const answers = this.state.data.userData.answers;
    const result = {};
    answers.forEach(answer => {
      const question = this.selectQuestion(answer.questionId);
      const mistakes = getAnswerMistakes(question.sentence, answer.answer);
      Object.keys(mistakes).forEach(word => {
        if (word in result) {
          result[word] = result[word] + mistakes[word];
        } else {
          result[word] = mistakes[word];
        }
      });
    });
    return result;
  }

  selectWeightedQuestions() {
    const questionStats = this.state.data.userData.questionStats;
    const questions = this.state.data.questions;
    return questions.map(question => {
      const ret = { ...question, weight: 100 };
      const questionStat = questionStats[question.id];
      if (questionStat) {
        ret.weight += (questionStat.errorCount - questionStat.count * 15);
      }
      return ret;
    });
  }

  selectWeightedRSQuestions() {
    const questionStats = this.state.data.userData.RSQuestionStats;
    const questions = this.state.data.RSQuestions;
    return questions.map(question => {
      const ret = { ...question, weight: 100 };
      const questionStat = questionStats[question.id];
      if (questionStat) {
        ret.weight += (questionStat.errorCount - questionStat.count * 15);
      }
      return ret;
    });
  }

  selectInitialDataLoaded() {
    const { user, userData, questions } = this.state.data;
    return !!user && !!userData && !!questions;
  }

  actionRecordUserAnswer(questionId, answer) {
    const stateData = this.state.data;
    const question = stateData.questions.find(item => item.id === questionId);
    const errorCount = answer ?
      getAnswerErrorCount(question.sentence, answer.answer) : 0;
    const questionStats = stateData.userData.questionStats;
    const questionStat = questionStats[questionId] || {};
    questionStat.count = questionStat.count ? ++questionStat.count : 1;
    const currentErrorCount = questionStat.errorCount || 0;
    questionStat.errorCount = currentErrorCount + errorCount;
    const tasks = [
      updateUserQuestionStats(questionId, questionStat).then(() => {
        this.$setState({
          data: {
            ...stateData,
            userData: {
              ...(stateData.userData || {}),
              questionStats: {
                ...questionStats,
                [questionId]: questionStat,
              },
            },
          },
        });
      }),
    ];
    if (answer) {
      tasks.push(
        addUserAnswer(answer).then(newAnswer => {
          const userData = this.state.data.userData || {};
          const answers = userData.answers || [];
          this.$setState({
            data: {
              ...this.state.data,
              userData: {
                ...(userData || {}),
                answers: [...answers, newAnswer],
              },
            },
          });
        })
      );
    }
    return Promise.all(tasks);
  }

  actionRecordUserRSAnswer(questionId, answer = {}) {
    const stateData = this.state.data;
    const errorCount = answer.known ? 0 : 4;
    const questionStats = stateData.userData.RSQuestionStats;
    const questionStat = questionStats[questionId] || {};
    questionStat.count = questionStat.count ? ++questionStat.count : 1;
    const currentErrorCount = questionStat.errorCount || 0;
    questionStat.errorCount = currentErrorCount + errorCount;
    const tasks = [
      updateUserRSQuestionStats(questionId, questionStat).then(() => {
        this.$setState({
          data: {
            ...stateData,
            userData: {
              ...(stateData.userData || {}),
              RSQuestionStats: {
                ...questionStats,
                [questionId]: questionStat,
              },
            },
          },
        });
      }),
    ];
    if (answer) {
      tasks.push(
        addUserAnswer(answer).then(newAnswer => {
          const userData = this.state.data.userData || {};
          const answers = userData.answers || [];
          this.$setState({
            data: {
              ...this.state.data,
              userData: {
                ...(userData || {}),
                answers: [...answers, newAnswer],
              },
            },
          });
        })
      );
    }
    return Promise.all(tasks);
  }

  actionLoadInitialData() {
    return Promise.all([
      this.actionLoadQuestions(),
      this.actionLoadRSQuestions(),
      this.actionLoadUserData(),
    ]);
  }

  actionLoadQuestions() {
    return loadQuestions().then(questions => {
      this.$setState({
        data: {
          ...this.state.data,
          questions,
        },
      });
    });
  }

  actionLoadRSQuestions() {
    return loadRSQuestions().then(RSQuestions => {
      this.$setState({
        data: {
          ...this.state.data,
          RSQuestions,
        },
      });
    });
  }

  actionLoadUserData() {
    return loadUserData().then(userData => {
      this.$setState({
        data: {
          ...this.state.data,
          userData,
        },
      });
    });
  }

  actionLogin(email, password) {
    return login(email, password);
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

StateProvider.propTypes = {
  children: PropTypes.any,
};
