import React from 'react';
import PropTypes from 'prop-types';
const AppContext = React.createContext({});
const { Provider } = AppContext;
export const StateConsumer = AppContext.Consumer;

export default class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    // this is the app state
    this.state = {
      data: {
        user: null,
        itineraries: [],
        activities: [],
      },
      actions: {
      },
    };
  }

  $setState(state, fn) {
    console.log('before update state', state);
    this.setState(state, () => {
      console.log('after update state', this.state);
      if (fn) {
        fn();
      }
    });
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
