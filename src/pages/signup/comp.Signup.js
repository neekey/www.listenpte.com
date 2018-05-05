import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'app/components/layout/comp.Layout';
import stateProvider from 'app/utils/stateProvider';
import Block from 'app/components/layout/comp.Block';
import history from 'app/history';
import { Input, Button, Form, Icon } from 'antd';
import { signUp } from 'app/data/user';
import { Link } from 'react-router';
import { PATH_HOME } from 'app/config/route';

const FormItem = Form.Item;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUping: false,
    };
    this.onSignup = this.onSignup.bind(this);
  }

  onSignup(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isSignUping: true,
        });
        signUp(values.email, values.password).then(() => {
          this.setState({
            isSignUping: false,
          });
          history.push(PATH_HOME);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout title="Sign Up">
        <Block>
          <Form onSubmit={this.onSignup} className="login-form">
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
                loading={this.state.isSignUping}
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Sign Up
              </Button>
              <Link to="/login">
                Log In
              </Link>
            </FormItem>
          </Form>
        </Block>
      </Layout>
    );
  }
}

Signup.propTypes = {
  form: PropTypes.object,
};

export default stateProvider(Form.create()(Signup));
