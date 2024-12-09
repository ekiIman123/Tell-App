import PropTypes from 'prop-types';
import TalkItem from './TalkItem';
import React from 'react';

function TalkDetail({ talkDetail, authUser, vote, toggleTalkModal }) {
  return (
    <div className="talk-detail">
      <TalkItem {...talkDetail} authUser={authUser} vote={vote} toggleTalkModal={toggleTalkModal} ></TalkItem>
    </div>
  );
}

TalkDetail.propTypes = {
  talkDetail: PropTypes.shape({
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
    comments: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ),
  }),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  vote: PropTypes.func.isRequired,
  toggleTalkModal: PropTypes.func.isRequired,
};

export default TalkDetail;
