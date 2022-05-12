import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/auth_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Link } from 'react-router-dom';

export const SignIn = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const res = await fetch('/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 201) {
      const result = await res.json();
      setAuthToken(result.token);
    } else {
      console.error('An issue occurred when logging in.');
    }
  };

  return (
    <div className="login-page">
      <div className="header">Welcome to Spotify Snaps!</div>
      <div className="sub-header">Sign in or sign up to continue</div>
      <div className="login">
        <Paper>
          <div>Email</div>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div>Password</div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex flex-row justify-end mt-2">
            <Link to={'/signup'}>
              <button className="login-button">Sign up</button>
            </Link>
            <div className="pl-2" />
            <Link to={'/'}>
              <button className="login-button" onClick={signIn}>
                Sign in
              </button>
            </Link>
          </div>
        </Paper>
      </div>
    </div>
  );
};
