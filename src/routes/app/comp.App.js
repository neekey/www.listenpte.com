import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.App.scss';

export default function App(props) {
  return (<div className={style.container}>
    <div className={style.logo}>
      Listen PTE
    </div>
    {props.children}
  </div>);
}

App.propTypes = {
  children: PropTypes.any,
};
