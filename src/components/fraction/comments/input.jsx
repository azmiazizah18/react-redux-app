import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/design/button';
import { Card } from '@/components/design/card';
import { classname } from '@/utils';
import { Richtext } from '@/components/design/richtext';

export function CommentInput({ authUserId, className, onSubmit }) {
  const [newComment, setNewComment] = React.useState('');

  const handleCommentChange = (newInputComment) => {
    setNewComment(newInputComment === '<p><br></p>' ? '' : newInputComment);
  };

  const handleSubmit = () => {
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <Card className={classname(className)}>
      <h4 className="mb-2 text-black">Tulis Komentar</h4>

      {authUserId ? (
        <>
          <Richtext
            className="mb-4"
            value={newComment}
            onChange={handleCommentChange}
          />

          <Button
            disabled={!newComment}
            onClick={handleSubmit}
            pill
            withIcon
            className="w-full"
          >
            Kirim
          </Button>
        </>
      ) : (
        <div className="my-3 flex flex-col items-center">
          <h3 className="text-black">Masuk untuk menambahkan komentar!</h3>
          <p className="flex items-center text-royalblue">
            Anda bisa mengikuti ini{' '}
            <Button to="/login" variant="link" className="px-1 font-bold">
              Link
            </Button>
            untuk masuk.
          </p>
        </div>
      )}
    </Card>
  );
}

CommentInput.propTypes = {
  authUserId: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {
  authUserId: '',
  className: '',
};
