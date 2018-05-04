import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './comp.Block.scss';

export default function Block({ className, fullWidth, ...props }) {
  return (
    <div
      className={classnames(className, style.block, {
        [style.fullWidth]: fullWidth,
      })}
      {...props} />
  );
}

Block.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};
