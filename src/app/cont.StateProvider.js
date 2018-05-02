import React from 'react';
import PropTypes from 'prop-types';
const AppContext = React.createContext({});
const { Provider } = AppContext;
export const StateConsumer = AppContext.Consumer;
import firebase from 'app/data/firebase';
import { login, loadUserData, addUserAnswer } from 'app/data/user';
import { loadQuestions } from 'app/data/questions';

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

  selectQuestions() {
    return this.state.data.questions;
  }

  selectAnsers() {
    return this.state.data.answers;
  }

  selectInitialDataLoaded() {
    const { user, userData, questions } = this.state.data;
    return !!user && !!userData && !!questions;
  }

  actionAddUserAnswer(answer) {
    console.log('actionAddUserAnswer', answer);
    return addUserAnswer(answer).then(newAnswer => {
      const userData = this.state.data.userData || {};
      const answers = userData.answers || [];
      this.$setState({
        data: {
          ...this.state.data,
          userData: {
            ...(this.state.data.userData || {}),
            answers: [...answers, newAnswer],
          },
        },
      });
    });
  }

  actionLoadInitialData() {
    return Promise.all([
      this.actionLoadQuestions(),
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
