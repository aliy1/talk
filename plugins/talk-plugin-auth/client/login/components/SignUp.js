import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Spinner,
  Success,
  Alert,
} from 'plugin-api/beta/client/components/ui';
import { t } from 'plugin-api/beta/client/services';
import styles from './SignUp.css';
import External from './External';

class SignUp extends React.Component {
  handleSignInLink = e => {
    e.preventDefault();
    this.props.onSignInLink();
  };

  handleUsernameChange = e => this.props.onUsernameChange(e.target.value);
  handleEmailChange = e => this.props.onEmailChange(e.target.value);
  handlePasswordChange = e => this.props.onPasswordChange(e.target.value);
  handlePasswordRepeatChange = e =>
    this.props.onPasswordRepeatChange(e.target.value);

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const {
      username,
      email,
      password,
      passwordRepeat,
      usernameError,
      emailError,
      passwordError,
      passwordRepeatError,
      loading,
      errorMessage,
      requireEmailConfirmation,
      success,
    } = this.props;

    return (
      <div>
        <div className={styles.header}>
          <h1>{t('talk-plugin-auth.login.sign_up')}</h1>
        </div>

        {errorMessage && <Alert>{errorMessage}</Alert>}
        {!success && (
          <div>
            <External slot="authExternalSignUp" />
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                type="email"
                label={t('talk-plugin-auth.login.email')}
                value={email}
                style={{ fontSize: 16 }}
                showErrors={!!emailError}
                errorMsg={emailError}
                onChange={this.handleEmailChange}
              />
              <TextField
                id="username"
                type="text"
                label={t('talk-plugin-auth.login.username')}
                value={username}
                style={{ fontSize: 16 }}
                showErrors={!!usernameError}
                errorMsg={usernameError}
                onChange={this.handleUsernameChange}
              />
              <TextField
                id="password"
                type="password"
                label={t('talk-plugin-auth.login.password')}
                value={password}
                style={{ fontSize: 16 }}
                showErrors={!!passwordError}
                errorMsg={passwordError}
                onChange={this.handlePasswordChange}
                minLength="8"
              />
              {passwordError && (
                <span className={styles.hint}>
                  {' '}
                  Password must be at least 8 characters.{' '}
                </span>
              )}
              <TextField
                id="confirmPassword"
                type="password"
                label={t('talk-plugin-auth.login.confirm_password')}
                value={passwordRepeat}
                style={{ fontSize: 16 }}
                showErrors={!!passwordRepeatError}
                errorMsg={passwordRepeatError}
                onChange={this.handlePasswordRepeatChange}
                minLength="8"
              />
              <div className={styles.action}>
                <Button
                  type="submit"
                  cStyle="black"
                  id="coralSignUpButton"
                  className={styles.button}
                  full
                >
                  {t('talk-plugin-auth.login.sign_up')}
                </Button>
                {loading && <Spinner />}
              </div>
            </form>
          </div>
        )}
        {success && (
          <div>
            <Success />
            {requireEmailConfirmation && (
              <p>
                {t('talk-plugin-auth.login.verify_email')}
                <br />
                <br />
                {t('talk-plugin-auth.login.verify_email2')}
              </p>
            )}
          </div>
        )}
        <div className={styles.footer}>
          {t('talk-plugin-auth.login.already_have_an_account')}{' '}
          <a id="coralSignInViewTrigger" onClick={this.handleSignInLink}>
            {t('talk-plugin-auth.login.sign_in')}
          </a>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  loading: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  usernameError: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.string,
  passwordRepeat: PropTypes.string.isRequired,
  passwordRepeatError: PropTypes.string,
  onUsernameChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onPasswordRepeatChange: PropTypes.func.isRequired,
  onSignInLink: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  requireEmailConfirmation: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
};

export default SignUp;
