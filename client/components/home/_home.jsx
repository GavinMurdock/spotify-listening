import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    checkUrlParameters();
    setLoading(false);
  }, []);

  const checkUrlParameters = async () => {
    let hash = window.location.hash;
    if (hash.includes('?')) {
      console.log('Error');
      // TODO: CREATE ERROR MESSAGE BOX
    } else if (hash.includes('access_token')) {
      const accessToken = hash.split('&')[0].replace('#/access_token=', '');
      console.log('accessToken: ', accessToken);
      await api.post(`/snapshots/${accessToken}`);
      history.push('/snapshots');
    }
  };

  const getSpotifyToken = () => {
    const client_id = '3bcd6f51b2504ce79b775110f473e973';
    const redirect_uri = 'https://spotify-snaps.herokuapp.com/#/';
    const scope = 'user-top-read';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    window.location = url;
  };

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="header">Spotify Stats</div>
      <div className="sub-header">Create and view snapshots of your top 10 songs on Spotify from the last month</div>
      <div className="group">
        <button className="home-buttons" onClick={getSpotifyToken}>
          Create Snapshot
        </button>
        <Link to={'/snapshots'}>
          <button className="home-buttons">View Old Snapshots</button>
        </Link>
      </div>
      <Link to={'/signin'}>
        <button className="home-buttons" onClick={logout}>
          Logout
        </button>
      </Link>
    </div>
  );
};
