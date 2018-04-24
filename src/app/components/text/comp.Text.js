import React from 'react';
import PropType from 'prop-types';
import classnames from 'classnames';
import style from './comp.Text.scss';

export default function Text({ className, ...props }) {
  return <div className={classnames(style.text, className)} {...props} />;
}

Text.propTypes = {
  className: PropType.string,
};
