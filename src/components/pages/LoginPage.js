import React from 'react';
import Validator from 'validator';
// Components
import LoginForm from '../forms/LoginForm';
// Styles
import '../../styles/components/pages/LoginPage.css';

class LoginPage extends React.Component {
  state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
  };

  submitForm = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState(() => ({ errors }));
  }

  handleChange = (e) => {
    const target = e.target;
    this.setState(() => ({
      data: {...this.state.data, [target.name]: target.value}
    }));
  }

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Email format isn\'t correct.';
    if (!data.password) errors.password = 'Password can\'t be empty';
    return errors;
  }

  render() {
    const { data } = this.state;
    return (
      <div className="container login">
        <LoginForm
          submitForm={this.submitForm}
          handleChange={this.handleChange}
          data={data}
        />
      </div>
    );
  }
}

export default LoginPage;
