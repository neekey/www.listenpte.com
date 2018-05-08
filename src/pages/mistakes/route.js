export default {
  path: 'mistakes',
  getComponent(nextState, done) {
    require.ensure([], require => {
      done(null, require('./comp.Mistakes').default);
    });
  },
};
