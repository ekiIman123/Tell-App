/* eslint-disable no-unused-vars */
import TalkLeaderboard from '../components/TalkLeaderboard';
import TalkInput from '../components/TalkInput';
import TalksList from '../components/TalksList';
import TalkTrending from '../components/TalkTrending';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { asyncPopulateUsersAndTreads } from '../states/shared/action';
import PropTypes from 'prop-types';

function HomePage({ addThread, toggleTalkModal, modal }) {
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndTreads());
  }, [dispatch]);


  const onVote = (id, voteType) => {
    // dispatch(asyncToggleVoteThread(id, voteType));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div className="homepage">
      <div className="homepage-left">
        <TalkInput addThread={addThread} />
        <TalksList
          threads={threadList}
          vote={onVote}
          authUser={authUser}
          toggleTalkModal={toggleTalkModal}
          modal={modal}
        />
      </div>
      <div className="homepage-right">
        <TalkLeaderboard />
        <TalkTrending />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  addThread: PropTypes.func.isRequired,
  toggleTalkModal: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
};

export default HomePage;