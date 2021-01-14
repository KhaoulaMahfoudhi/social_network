import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AddComment } from '../../actions/post';
const CommentForm = ({ postId, AddComment }) => {
  const [text, setText] = useState('');
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        class="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          AddComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Leave a Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  AddComment: PropTypes.func.isRequired,
};

export default connect(null, { AddComment })(CommentForm);
