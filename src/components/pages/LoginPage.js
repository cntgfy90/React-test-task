import React from 'react';
import { connect } from 'react-redux';
import Validator from 'validator';
import { login } from '../../actions/auth';
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
    if (Object.keys(errors).length === 0) {
      this.props.login(this.state.data).then((user) => {
        console.log(user);
      }).catch((err) => {
        console.log(err)
      })
    }
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
    const { data, errors } = this.state;
    const { didInvalidate } = this.props;
    return (
      <div className="container login">
        <LoginForm
          submitForm={this.submitForm}
          handleChange={this.handleChange}
          data={data}
          errors={errors}
          didInvalidate={didInvalidate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  didInvalidate: state.auth.didInvalidate
});

export default connect(mapStateToProps, { login })(LoginPage);
