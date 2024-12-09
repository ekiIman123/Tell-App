import PropTypes from 'prop-types';
import React from 'react';

function TalkProfile({ owner }) {
  return (
    <div className="talk-item__profile">
      <img src={owner.avatar} alt="" />
      <h3>{owner.name}</h3>
    </div>
  );
}

TalkProfile.propTypes = {
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TalkProfile;
