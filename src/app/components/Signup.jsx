import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';

const SignupComponent = ({ requestCreateUserAccount, authenticated }) => {
  return (
    <div className='card p-3 col-6 d-flex flex-column'>
      <form onSubmit={requestCreateUserAccount} className='d-flex flex-column'>
        <label>
          <span>Почта</span>
          <input
            type='email'
            placeholder='Почта'
            name='username'
            className='form-control'
            required
          />
        </label>
        <label>
          <span>Пароль</span>
          <input
            type='password'
            placeholder='Пароль'
            name='password'
            className='form-control'
            required
          />
        </label>

        {authenticated == mutations.USERNAME_RESERVED ? (
          <p>Пользователь с такой почтой уже зарегистрирован</p>
        ) : null}
        <button type='submit' className='form-control mt-2 btn btn-primary'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  requestCreateUserAccount(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    console.log('Creating!', username, password);
    dispatch(mutations.requestCreateUserAccount(username, password));
  },
});

export const ConnectedSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupComponent);
