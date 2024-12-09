import { Link } from 'react-router-dom';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';
import React from 'react';

function TalkTitle({ id, title, createdAt }) {
  return (
    <div className="talk-item__title">
      <h2>
        <Link to={`/detail-talk/${id}`}>{title}</Link>
      </h2>

      <span>{postedAt(createdAt)}</span>
    </div >
  );
}

TalkTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default TalkTitle;
