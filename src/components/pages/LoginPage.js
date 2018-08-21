import React from 'react';
// Components
import LoginForm from '../forms/LoginForm';
// Styles
import '../../styles/components/pages/LoginPage.css';

class LoginPage extends React.Component {
  state = {
      email: '',
      password: ''
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  handleChange = (e) => {
    const target = e.target;
    this.setState(() => ({
      [target.name]: target.value
    }));
  }

  render() {
    return (
      <div className="container login">
        <LoginForm
          submitForm={this.submitForm}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default LoginPage;
