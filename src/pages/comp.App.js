import React from 'react';
import PropTypes from 'prop-types';
import stateProvider from 'app/utils/stateProvider';

class App extends React.Component {
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
