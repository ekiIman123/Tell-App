import { useParams } from 'react-router-dom';
import TalkDetail from '../components/TalkDetail';
import TalkTrending from '../components/TalkTrending';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import CommentList from '../components/CommentList';
import PropTypes from 'prop-types';

function DetailPage({ toggleTalkModal }) {
  const { id } = useParams();
  const authUser = useSelector((state) => state.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onVoteThread = () => {
    // dispatch(asyncToogleVoteThreadDetail());
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="detailpage">
      <div className="detailpage-left">
        <TalkDetail talkDetail={threadDetail} authUser={authUser} vote={onVoteThread} toggleTalkModal={toggleTalkModal} />
        {threadDetail.comments && (
          <div className="detail-page__comment">
            <CommentList comments={threadDetail.comments} authUser={authUser} vote={onVoteThread} />
          </div>
        )}
      </div>
      <div className="detailpage-right">
        <TalkTrending></TalkTrending>
      </div>
    </div >
  );
}

DetailPage.propTypes = {
  toggleTalkModal: PropTypes.func.isRequired,
};

export default DetailPage;
