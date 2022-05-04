import { ApiContext } from '../../utils/api_context';
import { useEffect, useState, useContext } from 'react';
import { Snaps } from './_snaps';
import { Snap } from './_snap';
import { Link } from 'react-router-dom';
import { SnapWindow } from './_snap_window';
import { useParams } from 'react-router-dom';

export const SnapshotsHome = () => {
  const api = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState([]);
  const { id } = useParams();

  useEffect(async () => {
    if (id) {
      console.log('id= ', id);
    }
    const { snapshots } = await api.get('/snapshots');
    setSnapshots(snapshots);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (id) {
    return (
      <div className="snapshots-container">
        <Snaps>
          <Link to={'/'}>
            <Snap>Home</Snap>
          </Link>
          {snapshots.map((snap) => {
            return (
              <Snap key={snap.id} to={`/snapshots/${snap.id}`}>
                {snap.date}
              </Snap>
            );
          })}
        </Snaps>
        <div className="snap-window">
          <SnapWindow id={id} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="snapshots-container">
        <Snaps>
          <Link to={'/'}>
            <Snap>Home</Snap>
          </Link>
          {snapshots.map((snap) => {
            return (
              <Snap key={snap.id} to={`/snapshots/${snap.id}`}>
                {snap.date}
              </Snap>
            );
          })}
        </Snaps>
        <div className="snap-window">
          <div className="header">select a snap to start</div>
        </div>
      </div>
    );
  }
};
