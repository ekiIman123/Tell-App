import PropTypes from 'prop-types';
import TalksInput from './TalkInput';
import React from 'react';

function TalkModal({ addThread, addComment }) {
  return (
    <div className="talk-modal">
      <TalksInput addThread={addThread} addComment={addComment} />
    </div>
  );
}

TalkModal.propTypes = {
  addThread: PropTypes.func,
  addComment: PropTypes.func,
};

export default TalkModal;
