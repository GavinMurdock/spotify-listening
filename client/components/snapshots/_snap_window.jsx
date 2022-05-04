import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Track } from './_track';

export const SnapWindow = ({ id }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState(null);
  const api = useContext(ApiContext);

  useEffect(async () => {
    setLoading(true);
    const { tracks } = await api.get(`/tracks/${id}`);
    setTracks(tracks);
    const { snapshot } = await api.get(`/snapshots/${id}`);
    setSnapshot(snapshot);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snap-window">
      <div className="date">{'Your top songs captured on ' + snapshot.date}</div>
      <div className="tracks">
        {[...tracks].reverse().map((track) => (
          <Track key={track.id} track={track} number={Math.abs(tracks.indexOf(track) - 10)} />
        ))}
      </div>
    </div>
  );
};
