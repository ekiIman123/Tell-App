import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdLeaderboard } from 'react-icons/md';
import { TbLogout2 } from 'react-icons/tb';
import { TiHome } from 'react-icons/ti';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ signOut, toggleTalkModal }) {
  const [currentPath, setCurrentPath] = useState('');

  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <nav>
      <div className="nav-btn">
        <Link to="/">
          <button className={currentPath === '/' ? 'btn-active' : ''}>
            <TiHome /> Home
          </button>
        </Link>
        <Link to="/leaderboard">
          <button
            className={currentPath === '/leaderboard' ? 'btn-active' : ''}
          >
            <MdLeaderboard /> Leaderboard
          </button>
        </Link>
        <button onClick={toggleTalkModal}>Talk</button>
      </div>
      <button type="button" onClick={signOut}>
        <TbLogout2 /> Sign out
      </button>
    </nav>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  toggleTalkModal: PropTypes.func.isRequired
};

export default Navigation;
