import React from 'react';
import PropType from 'prop-types';
import classnames from 'classnames';
import style from './comp.Title.scss';

export default function Title({ className, ...props }) {
  return <div className={classnames(style.title, className)} {...props} />;
}

Title.propTypes = {
  className: PropType.string,
};
