import { Link } from 'react-router-dom';

export const Snap = ({ children, to }) => {
  if (to) {
    return (
      <Link className="snapshot" to={to}>
        {children}
      </Link>
    );
  } else {
    return <button className="snapshot">{children}</button>;
  }
};
