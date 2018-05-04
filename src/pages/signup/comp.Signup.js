import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'app/components/layout/comp.Layout';
import stateProvider from 'app/utils/stateProvider';
import { List, InputItem, Button } from 'antd-mobile';
import Block from 'app/components/layout/comp.Block';
import { signUp } from 'app/data/user';
import style from './comp.Signup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onSignup = this.onSignup.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSignup(e) {
    e.preventDefault();
    signUp(this.state.email, this.state.password);
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
      <Layout title="Sign Up">
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
            <Button type="primary" onClick={this.onSignup}>Signup</Button>
          </div>
        </Block>
      </Layout>
    );
  }
}

Signup.propTypes = {
  onSignup: PropTypes.func,
  stateAction: PropTypes.object,
};

export default stateProvider(Signup);
