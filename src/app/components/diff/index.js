import React from 'react';
import PropTypes from 'prop-types';
import { diffWords, diffChars, diffSentences, diffJson } from 'diff';
import style from './index.scss';

const fnMap = {
  chars: diffChars,
  words: diffWords,
  sentences: diffSentences,
  json: diffJson,
};

export default function Diff(props) {
  const diff = fnMap[props.type](props.inputA, props.inputB);
  const result = diff.map((part, index) => {
    let backgroundColor = 'lightgrey';
    if (part.added) {
      backgroundColor = 'lightgreen';
    }
    if (part.removed) {
      backgroundColor = 'salmon';
    }
    const spanStyle = {
      backgroundColor,
    };
    return <span key={index} style={spanStyle}>{part.value}</span>;
  });
  return (
    <pre className={style.diff}>
      {result}
    </pre>
  );
}

Diff.propTypes = {
  inputA: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  inputB: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf([
    'chars',
    'words',
    'sentences',
    'json',
  ]),
};

Diff.defaultProps = {
  inputA: '',
  inputB: '',
  type: 'chars',
};
