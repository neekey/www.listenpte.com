import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'app/components/layout/comp.Layout';
import stateProvider from 'app/utils/stateProvider';
import { List, InputItem, Button } from 'antd-mobile';
import Block from 'app/components/layout/comp.Block';
import history from 'app/history';
import { PATH_HOME } from 'app/config/route';
import style from './comp.Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onLogin = this.onLogin.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    this.props.store.actionLogin(this.state.email, this.state.password).then(() => {
      history.push(PATH_HOME);
    });
  }

  onEmailChange(value) {
    this.setState({
      email: value,
    });
  }

  onPasswordChange(value) {
    this.setState({
      password: value,
    });
  }

  render() {
    return (
      <Layout title="Log In">
        <Block>
          <List>
            <InputItem
              type="text"
              onChange={this.onEmailChange}
              placeholder="enter email">Email</InputItem>
            <InputItem
              type="password"
              onChange={this.onPasswordChange}
              placeholder="enter password">Password</InputItem>
          </List>
          <div className={style.actions}>
            <Button type="primary" onClick={this.onLogin}>Login</Button>
          </div>
        </Block>
      </Layout>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  store: PropTypes.object,
};

export default stateProvider(Login);
