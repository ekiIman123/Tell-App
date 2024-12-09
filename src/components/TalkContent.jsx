import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import TalkTitle from './TalkTitle';
import React from 'react';

function TalkContent({ id, title, body, createdAt }) {
  return (
    <div className="talk-item__content">
      {title && (
        <TalkTitle id={id} title={title} createdAt={createdAt} />
      )}
      <div className="talk-item__body">
        <div
          className="talk-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {!title && (
          <span>{postedAt(createdAt)}</span>
        )}
      </div>
    </div>
  );
}

TalkContent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default TalkContent;
