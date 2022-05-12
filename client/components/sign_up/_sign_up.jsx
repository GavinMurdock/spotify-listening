import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/auth_context';
import { ApiContext } from '../../utils/api_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signUp = async () => {
    if (email === '') {
      setErrorMessage('Email cannot be blank');
      return;
    }
    if (email !== emailConfirmation) {
      setErrorMessage('Email does not match.');
      return;
    }
    if (password === '') {
      setErrorMessage('Password cannot be blank');
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorMessage('Password does not match');
      return;
    }
    if (firstName === '') {
      setErrorMessage('First name cannot be blank.');
      return;
    }
    if (lastName === '') {
      setErrorMessage('Last name cannot be blank.');
      return;
    }

    const { token } = await api.post('/users', {
      firstName,
      lastName,
      email,
      password,
    });
    await setAuthToken(token);
  };

  return (
    <div className="login-page">
      <div className="header">Welcome to Spotify Snaps!</div>
      <div className="sub-header">Sign up to continue</div>
      <div className="login">
        <Paper>
          <div>First Name</div>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <div>Last Name</div>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <div>Email</div>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div>Confirm Email</div>
          <Input type="email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
          <div>Password</div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div>Confirm Password</div>
          <Input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="flex flex-row justify-end mt-2">
            <Link to={'/'}>
              <button className="login-button" onClick={signUp}>
                Sign up
              </button>
            </Link>
          </div>
          <div className="flex">{errorMessage}</div>
        </Paper>
      </div>
    </div>
  );
};
