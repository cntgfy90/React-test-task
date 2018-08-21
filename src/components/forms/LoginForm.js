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
        />
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
        />
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