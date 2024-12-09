import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Navigation from './components/Navigation.jsx';
import DetailPage from './pages/DetailPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import { asyncUnsetAuthUser } from './states/authUser/action.js';
import { asyncAddThread } from './states/talks/action.js';
import TalkModal from './components/TalkModal.jsx';
import { asyncAddTalkDetailComment } from './states/talkDetail/action.js';
import Loading from './components/Loading.jsx';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const [modal, setModal] = useState(false);
  const [idThread, setIdThread] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  function onToggleTalkModal(id) {
    setModal((prevsetModal) => !prevsetModal);
    if (typeof id === 'string' && id.trim() !== '') {
      navigate(`/detail-talk/${id}`);
      setIdThread(id);
    } else {
      setIdThread(null);
    }
  }

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    setModal((prevsetModal) => !prevsetModal);
  };

  const onAddComment = (content) => {
    dispatch(asyncAddTalkDetailComment({ threadId: idThread, content }));
    setModal((prevsetModal) => !prevsetModal);
  };

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const modalProps = !idThread
    ? { addThread: onAddThread }
    : { addComment: onAddComment };
  console.log(modalProps);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <div className="app-container">
      <header>
        <Navigation signOut={onSignOut} toggleTalkModal={onToggleTalkModal} />
      </header>
      <main>
        <Loading />
        <Routes>
          <Route path="/" element={<HomePage addThread={onAddThread} toggleTalkModal={onToggleTalkModal} modal={modal} />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/detail-talk/:id" element={<DetailPage toggleTalkModal={onToggleTalkModal} />} />
        </Routes>
        {modal && (
          <>
            <div className="overlay" onClick={() => onToggleTalkModal()}></div>
            <TalkModal {...modalProps} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
