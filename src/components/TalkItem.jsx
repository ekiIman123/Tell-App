import TalkProfile from './TalkProfile';
import TalkContent from './TalkContent';
import TalkVote from './TalkVote';
import PropTypes from 'prop-types';
import React from 'react';

function TalkItem({ id, title, body, category, createdAt, owner, upVotesBy, downVotesBy, totalComments, comments, authUser, vote, toggleTalkModal }) {
  return (
    <div className="talk-item">
      <TalkProfile owner={owner} />
      <TalkContent id={id} title={title} body={body} category={category} createdAt={createdAt} />
      <TalkVote id={id} authUser={authUser} upVotesBy={upVotesBy} downVotesBy={downVotesBy} totalComments={totalComments} comments={comments} vote={vote} toggleTalkModal={toggleTalkModal} />
    </div>
  );
}

TalkItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  vote: PropTypes.func.isRequired,
  toggleTalkModal: PropTypes.func.isRequired,
};

export default TalkItem;
