import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'app/components/layout/comp.Layout';
import stateProvider from 'app/utils/stateProvider';
import { Input, Button, Form, Icon } from 'antd';
import Block from 'app/components/layout/comp.Block';
import history from 'app/history';
import { Link } from 'react-router';
import { PATH_HOME } from 'app/config/route';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogining: false,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLogining: true,
        });
        this.props.store.actionLogin(values.email, values.password).then(() => {
          this.setState({
            isLogining: false,
          });
          history.push(PATH_HOME);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout title="Log In">
        <Block>
          <Form onSubmit={this.onLogin} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input
                  type="email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button
                style={{ marginRight: 20 }}
                loading={this.state.isLogining}
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Log in
              </Button>
              <Link to="/signup">
                Sign Up
              </Link>
            </FormItem>
          </Form>
        </Block>
      </Layout>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  store: PropTypes.object,
  form: PropTypes.object,
};

export default stateProvider(Form.create()(Login));
