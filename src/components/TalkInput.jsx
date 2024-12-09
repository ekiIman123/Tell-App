import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import React from 'react';

function TalksInput({ addThread, addComment }) {
  const [title, handleTitleChange, setTitle] = useInput('');
  const [body, handleBodyChange, setBody] = useInput('');
  // const [category, handleCategoryChange] = useInput('');

  const handleLimitedBodyChange = (event) => {
    if (event.target.value.length <= 320) {
      handleBodyChange(event);
    }
  };

  const adjustTextAreaHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addThread && title.trim() !== '') {
      addThread({ title, body });
      setTitle('');
      setBody('');
    } else if (addComment) {
      addComment(body);
      setBody('');
    } else {
      console.error('Neither addThread nor addComment was provided or valid.');
    }
  };

  return (
    <div className="talk-input">
      {addThread && (
        <textarea
          type="text"
          placeholder="Input your thread title"
          value={title}
          onChange={handleTitleChange}
          onInput={adjustTextAreaHeight}
          className="auto-expand"
          rows={1}
        />
      )}
      <textarea
        type="text"
        placeholder={addComment ? 'Give your comment' : 'Input your thread content'}
        value={body}
        onChange={handleLimitedBodyChange}
        onInput={adjustTextAreaHeight}
        className="auto-expand"
        rows={1}
      />
      <hr />
      <div className="talk-input__action">
        <p className="talk-input__char-left">
          <strong>{body.length}</strong>
          /320
        </p>
        <button type="submit" onClick={handleSubmit}>Talk</button>
      </div>
    </div>
  );
}

TalksInput.propTypes = {
  addThread: PropTypes.func,
  addComment: PropTypes.func
};

export default TalksInput;
