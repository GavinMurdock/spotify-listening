export const Artist = ({ artist, number, total }) => {
  if (total === 1 || number === total - 1) {
    return <div className="artist">{artist.name}</div>;
  } else {
    return <div className="artist">{artist.name},&nbsp;</div>;
  }
};
