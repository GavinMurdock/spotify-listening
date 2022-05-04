import { ApiContext } from '../../utils/api_context';
import { useContext, useEffect, useState } from 'react';
import { Artist } from './_artist';

export const Track = ({ track, number }) => {
  const api = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  useEffect(async () => {
    const { artists } = await api.get(`/artists/${track.id}`);
    setArtists(artists);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tracks-container">
      <div className="track">
        {number + '. '}
        {track.title}
        <div className="artist">(</div>
        {[...artists].map((artist) => (
          <Artist key={artist.id} artist={artist} number={artists.indexOf(artist)} total={artists.length} />
        ))}
        <div className="artist">)</div>
      </div>
    </div>
  );
};
