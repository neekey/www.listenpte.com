export default {
  path: 'wfd',
  getComponent(nextState, done) {
    require.ensure([], require => {
      done(null, require('./cont.WFD').default);
    });
  },
};
