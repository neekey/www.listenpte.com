import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'app/components/layout/comp.Layout';
import Block from 'app/components/layout/comp.Block';
import stateProvider from 'app/utils/stateProvider';
import { Link } from 'react-router';

function Mistakes({ store }) {
  const mistakes = store.selectUserWFDMistakes();
  const list = Object.keys(mistakes).map(word => ({
    word,
    count: mistakes[word],
  })).sort((a, b) => (b.count - a.count));

  return (
    <Layout title="Mistakes" leftAction={{ label: <Link to="/wfd">WFD</Link> }}>
      <Block>
        {list.map(item => (
          <div key={item.word}>{item.word}: {item.count}</div>
        ))}
      </Block>
    </Layout>
  );
}

Mistakes.propTypes = {
  store: PropTypes.object,
};

export default stateProvider(Mistakes);
