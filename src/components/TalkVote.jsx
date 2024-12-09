import PropTypes from 'prop-types';
import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function TalkVote({ id, authUser, upVotesBy, downVotesBy, totalComments, comments, vote, toggleTalkModal, isComment = false }) {

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    vote(id, 1);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    vote(id, -1);
  };

  const onNeutralVoteClick = (event) => {
    event.stopPropagation();
    vote(id, 0);
  };

  function getCommentsLength(data) {
    if (data && Array.isArray(comments)) {
      return comments.length;
    }
    return 0;
  }

  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  return (
    <div className="talk-item__vote">
      {!isComment && (
        <div className="talk-comment">
          <a onClick={() => toggleTalkModal(id)}>
            <FaRegComment />
          </a>
          <span>{totalComments || getCommentsLength(comments)}</span>
        </div>
      )}
      <div className="vote-up">
        <button
          type="button"
          aria-label="like"
          onClick={isUpVoted ? onNeutralVoteClick : onUpVoteClick}
        >
          {isUpVoted ? <IoIosArrowUp style={{ color: 'red' }} /> : <IoIosArrowUp />}
        </button>
        {' '}
        {upVotesBy.length}
      </div>
      <div className="vote-down">
        <button
          type="button"
          aria-label="dislike"
          onClick={isDownVoted ? onNeutralVoteClick : onDownVoteClick}
        >
          {isDownVoted ? <IoIosArrowDown style={{ color: 'red' }} /> : <IoIosArrowDown />}
        </button>
        {' '}
        {downVotesBy.length}
      </div>
    </div>
  );
}

TalkVote.propTypes = {
  id: PropTypes.string.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    })
  ),
  vote: PropTypes.func.isRequired,
  toggleTalkModal: PropTypes.func,
  isComment: PropTypes.bool,
};

export default TalkVote;
