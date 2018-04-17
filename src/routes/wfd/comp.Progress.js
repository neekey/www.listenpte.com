import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.Progress.scss';

export default function Progress({ known, unknown, all }) {
  const knownPer = known / all;
  const unknownPer = unknown / all;
  return (<div className={style.container}>
    <div className={style.known} style={{ width: `${knownPer * 100}%` }} />
    <div className={style.unknown} style={{ width: `${unknownPer * 100}%` }} />
  </div>);
}

Progress.propTypes = {
  known: PropTypes.number,
  unknown: PropTypes.number,
  all: PropTypes.number,
};
