import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import style from './index.scss';

export default function Loading(props) {
  return (
    <div className={`${style.container} ${props.className}`}>
      <Icon className={style.icon} type="loading" />
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
};
