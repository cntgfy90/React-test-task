import React from 'react';
// Styles
import '../../styles/components/forms/LoginForm.css';

const LoginForm = (props) => {
  return (
    <form className="login-form" onSubmit={props.submitForm}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          className="form-control"
          placeholder="example@gmail.com"
          name="email"
          onChange={props.handleChange}
          value={props.data.email}
        />
        {
          props.errors.email && (
            <div className="alert alert-danger" role="alert">{props.errors.email}</div>
          )
        }
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          name="password"
          placeholder="your password"
          onChange={props.handleChange}
          value={props.data.password}
        />
        {
          props.errors.password && (
            <div className="alert alert-danger" role="alert">{props.errors.password}</div>
          )
        }
        {
          props.didInvalidate && (
            <div className="alert alert-danger" role="alert">{props.didInvalidate}</div>
          )
        }
      </div>
      <button
        className="btn"
        type="submit"
        >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
