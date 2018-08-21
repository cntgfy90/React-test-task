import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
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

  submitForm = async (e) => {
    try {
      e.preventDefault();
      const errors = this.validate(this.state.data);
      this.setState(() => ({ errors }));
      if (_.isEmpty(errors)) {
        const user = await this.props.login(this.state.data);
        history.push('/calendar');
      }
    } catch(err) {
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
    const { auth } = this.props;
    return (
      <div className="container login">
        <LoginForm
          submitForm={this.submitForm}
          handleChange={this.handleChange}
          data={data}
          errors={errors}
          didInvalidate={auth.didInvalidate && auth.didInvalidate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(LoginPage);
