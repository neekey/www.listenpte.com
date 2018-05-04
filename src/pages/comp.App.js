import React from 'react';
import PropTypes from 'prop-types';
import stateProvider from 'app/utils/stateProvider';
import history from 'app/history';
import {
  needToLogin,
  needInitialData,
  PATH_LOGIN,
  PATH_SIGNUP,
  PATH_HOME,
  pathnameMatchPath,
} from 'app/config/route';
import Loading from 'app/components/loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.pageCheckAndPrepare(this.props.location.pathname);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.pageCheckAndPrepare(newProps.location.pathname);
      this.scrollToTop();
    }

    if (newProps.store.data !== this.props.store.data) {
      this.pageCheckAndPrepare(newProps.location.pathname);
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  pageCheckAndPrepare(pName) {
    const pathname = pName || this.props.location.pathname;
    const isLoadingUser = this.props.store.selectIsLoadingUser();
    if (isLoadingUser) {
      return true;
    }
    const isUserCurrentlyLoggedIn = this.props.store.selectIsUserLogin();
    const needLogin = needToLogin(pathname);
    if (needLogin && !isUserCurrentlyLoggedIn) {
      return history.push(PATH_LOGIN);
    }
    if ((
        pathnameMatchPath(pathname, PATH_LOGIN) ||
        pathnameMatchPath(pathname, PATH_SIGNUP)
      ) && isUserCurrentlyLoggedIn) {
      return history.push(PATH_HOME);
    }

    if (needInitialData(pathname) && !this.props.store.selectInitialDataLoaded()) {
      this.loadingInitialData();
    }
    return true;
  }

  loadingInitialData() {
    const { store } = this.props;
    store.actionLoadInitialData();
  }

  isLoading() {
    const isLoadingUser = this.props.store.selectIsLoadingUser();
    const pathname = this.props.location.pathname;
    return isLoadingUser || (
      needInitialData(pathname) && !this.props.store.selectInitialDataLoaded()
    );
  }

  render() {
    const props = this.props;
    return this.isLoading() ? <Loading /> : props.children;
  }
}

App.propTypes = {
  store: PropTypes.object,
  location: PropTypes.object,
};

export default stateProvider(App);
