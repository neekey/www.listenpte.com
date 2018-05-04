import { StateConsumer } from 'app/cont.StateProvider';
import React from 'react';

export default function stateProvider(Component) {
  return function stateProvidedComponent(props) {
    return (
      <StateConsumer>
        {state => (
          <Component
            store={state}
            {...props} />)}
      </StateConsumer>
    );
  };
}
