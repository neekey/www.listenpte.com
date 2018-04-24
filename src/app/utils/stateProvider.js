import { StateConsumer } from 'app/cont.StateProvider';
import React from 'react';

export default function stateProvider(Component) {
  return function stateProvideredComponent(props) {
    return (
      <StateConsumer>
        {state => (
          <Component
            stateData={state.data}
            stateAction={state.actions}
            {...props} />)}
      </StateConsumer>
    );
  };
}
