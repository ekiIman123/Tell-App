import PropTypes from 'prop-types';
import TalkItem from './TalkItem.jsx';
import React from 'react';

function TalksList({ threads, vote, toggleTalkModal, authUser, modal }) {
  return (
    <div className="talks-list">
      {threads.map((thread) => (
        <TalkItem key={thread.id} {...thread} vote={vote} toggleTalkModal={toggleTalkModal} authUser={authUser} modal={modal} />
      ))}
    </div>
  );
}

TalksList.propTypes = {
  threads: PropTypes.array.isRequired,
  vote: PropTypes.func,
  toggleTalkModal: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  modal: PropTypes.bool.isRequired
};

export default TalksList;
