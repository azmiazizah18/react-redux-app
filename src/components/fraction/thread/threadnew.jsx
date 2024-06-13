import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/design/button';
import { Richtext } from '@/components/design/richtext';
import { Input } from '@/components/design/input';
import { Card } from '@/components/design/card';
import { classname } from '@/utils';

export function NewThread({ onSubmit, className }) {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [category, setCategory] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory.slice(0, 20));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await onSubmit({ title, body, category });

    setIsSubmitting(false);
  };

  return (
    <Card className={classname(className)}>
      <h3>Thread Baru</h3>

      <div className="my-4 flex flex-col gap-2">
        <Input
          type="text"
          pill={false}
          value={title}
          className="w-full"
          placeholder="Judul"
          onChange={setTitle}
        />
        <Input
          type="text"
          pill={false}
          value={category}
          className="w-full"
          placeholder="kategori"
          onChange={handleCategoryChange}
        />
        <Richtext value={body} className="basis-full" onChange={setBody} />
      </div>

      <Button
        className="w-full"
        pill
        // @ts-ignore
        withIcon
        disabled={!title || !body || isSubmitting}
        onClick={handleSubmit}
      >
        Kirim
      </Button>
    </Card>
  );
}

NewThread.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
