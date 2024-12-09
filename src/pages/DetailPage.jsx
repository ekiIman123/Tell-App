import { useParams } from 'react-router-dom';
import TalkDetail from '../components/TalkDetail';
import TalkTrending from '../components/TalkTrending';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { asyncReceiveTalkDetail, asyncToogleVoteThreadDetail } from '../states/talkDetail/action';
import CommentList from '../components/CommentList';
import PropTypes from 'prop-types';

function DetailPage({ toggleTalkModal }) {
  const { id } = useParams();
  const authUser = useSelector((state) => state.authUser);
  const talkDetail = useSelector((state) => state.talkDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  const onVoteThread = () => {
    dispatch(asyncToogleVoteThreadDetail());
  };

  if (!talkDetail) {
    return null;
  }

  return (
    <div className="detailpage">
      <div className="detailpage-left">
        <TalkDetail talkDetail={talkDetail} authUser={authUser} vote={onVoteThread} toggleTalkModal={toggleTalkModal} />
        {talkDetail.comments && (
          <div className="detail-page__comment">
            <CommentList comments={talkDetail.comments} authUser={authUser} vote={onVoteThread} />
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
