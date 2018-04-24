import React from 'react';
import Layout from 'app/components/layout/comp.Layout';
import stateProvider from 'app/utils/stateProvider';
import history from 'app/history';
import { Button } from 'antd-mobile';
import Block from 'app/components/layout/comp.Block';
import logoImg from './logo.png';
import style from './comp.Signup.scss';

class SignUp extends React.Component {
  onGoToLogin() {
    history.push('/login');
  }
  render() {
    return (
      <Layout>
        <Block className={style.container}>
          <img className={style.logo} src={logoImg} alt="logo" />
          <div className={style.actions}>
            <Button type="primary">Sign up</Button>
            <div className={style.loginAction}>or <span
              onClick={this.onGoToLogin}
              className={style.login}>log in</span></div>
          </div>
        </Block>
      </Layout>
    );
  }
}

SignUp.propTypes = {};

export default stateProvider(SignUp);
