import React from 'react';
import PropTypes from 'prop-types';
const AppContext = React.createContext({});
const { Provider } = AppContext;
export const StateConsumer = AppContext.Consumer;
import firebase from 'app/data/firebase';
import { getUser } from 'app/data/user';
import { loadQuestions } from 'app/data/questions';

export default class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    // this is the app state
    this.state = {
      data: {
        user: getUser(),
        answers: [],
        questions: [],
      },
    };
  }

  componentDidMount() {
    this.initUserAuth();
  }

  getActions() {
    const actions = {};
    Object.keys(this).forEach(key => {
      if (key.startsWith('action')) {
        actions[]
      }
    })
  }

  initUserAuth() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user,
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

  selectIsUserLogin() {
    return !!this.state.data.user;
  }

  selectQuestions() {
    return this.state.data.questions;
  }

  selectAnsers() {
    return this.state.data.answers;
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

  actionLoadAnsers() {}

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
