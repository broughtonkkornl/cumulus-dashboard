'use strict';
import React from 'react';
import { login } from '../../actions';
import { window } from '../../utils/browser';
import { set as setToken } from '../../utils/auth';

import Text from '../form/text';

var LoginModal = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    api: React.PropTypes.object,
    location: React.PropTypes.object,
    router: React.PropTypes.object,
    show: React.PropTypes.bool
  },

  getInitialState: function () {
    return {
      user: '',
      pass: '',
      token: null
    };
  },

  componentWillReceiveProps: function (newProps) {
    // delay-close the modal if it's open
    if (newProps.api.authenticated && this.props.show) {
      setToken(this.state.token);
      const { pathname } = this.props.location;
      if (pathname !== '/login' && window.location && window.location.reload) {
        setTimeout(() => window.location.reload(), 1500);
      } else if (pathname === '/login') {
        setTimeout(() => this.props.router.push('/'), 1500);
      }
    }
  },

  onSubmit: function () {
    if (this.props.api.authenticated) return false;
    const { user, pass } = this.state;
    const token = new Buffer(`${user}:${pass}`).toString('base64');
    const { dispatch } = this.props;
    this.setState({ token }, () => dispatch(login(token)));
  },

  render: function () {
    const { authenticated, inflight } = this.props.api;
    const { show } = this.props;

    return (
      <div>
        { show ? <div className='modal__cover'></div> : null }
        <div className={ show ? 'login login__onscreen' : 'login' }>
          { show ? (
            <div className='modal'>
              <div className='modal__internal'>
                <p>{ authenticated ? <strong>Success!</strong> : 'Enter your username and password' }</p>
                <form>
                  <div className='form__multistep form__login'>
                    <Text label={'Username'}
                      value={this.state.user}
                      id={'login-user'}
                      onChange={(id, value) => this.setState({user: value})} />
                    <Text label={'Password'}
                      value={this.state.pass}
                      id={'login-pass'}
                      type={'password'}
                      onChange={(id, value) => this.setState({pass: value})} />
                    <span className='button form-group__element--left button__animation--md button__arrow button__arrow--md button__animation button__arrow--white'>
                      <input
                        type='submit'
                        value={inflight ? 'Loading...' : 'Submit'}
                        onClick={this.onSubmit}
                        readOnly={true}
                      />
                    </span>
                  </div>
                </form>
              </div>
            </div>
          ) : null }
        </div>
      </div>
    );
  }
});

export default LoginModal;
