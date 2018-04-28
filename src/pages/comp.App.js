import React from 'react';
import PropTypes from 'prop-types';
import stateProvider from 'app/utils/stateProvider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkLogin(this.props.location.pathname);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.checkLogin(newProps.location.pathname);
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  checkLogin(path) {
    const isUserCurrentlyLoggedIn = true;
    const needLogin = needToLogin(path);
    if (needLogin && !isUserCurrentlyLoggedIn) {
      history.push('/signup');
    }
    if (path.includes('login') && path.includes('signup') && isUserCurrentlyLoggedIn) {
      history.push('/home');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadingInitialData();
  }

  loadingInitialData() {
    this.setState({
      isLoading: false,
    });
    /*
    Promise.all([
      this.props.stateAction.fetchActivities(),
      this.props.stateAction.loadUser(),
    ])
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
      */
  }

  render() {
    const props = this.props;
    return this.state.isLoading ? 'loading' : (
      <div>
        {props.children}
      </div>
    );
  }
}

App.propTypes = {
  stateData: PropTypes.object,
  stateAction: PropTypes.object,
};

export default stateProvider(App);
