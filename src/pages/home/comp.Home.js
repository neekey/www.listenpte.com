import React from 'react';
import { Link } from 'react-router';
import style from './comp.Home.scss';

export default function Home() {
  return (<div
    className={style.container}>
    <Link className={style.wfdButton} to="/wfd">WFD</Link>
    <Link className={style.rsButton} to="/rs">RS</Link>
  </div>);
}

Home.propTypes = {
};
