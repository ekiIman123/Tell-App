import PropTypes from 'prop-types';
import TalkContent from './TalkContent';
import TalkProfile from './TalkProfile';
import TalkVote from './TalkVote';
import React from 'react';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, vote }) {
  return (
    <div className='comment-item'>
      <TalkProfile owner={owner} />
      <TalkContent id={id} body={content} createdAt={createdAt} />
      <TalkVote id={id} authUser={authUser} upVotesBy={upVotesBy} downVotesBy={downVotesBy} vote={vote} isComment={true} />
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  vote: PropTypes.func.isRequired,
};

export default CommentItem;
