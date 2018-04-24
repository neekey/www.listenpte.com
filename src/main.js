import React from 'react';
import PropTypes from 'prop-types';
import StateProvider from './app/cont.StateProvider';
import { needToLogin } from 'app/config/route';
import history from 'app/history';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
import App from './pages/comp.App';

export default class Main extends React.Component {
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

  render() {
    const props = this.props;
    return (
      <LocaleProvider locale={enUS}>
        <StateProvider>
          <App {...props} />
        </StateProvider>
      </LocaleProvider>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};
