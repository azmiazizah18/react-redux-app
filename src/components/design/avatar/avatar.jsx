import PropTypes from 'prop-types';
import React from 'react';
import { classname } from '@/utils';

export function Avatar({ className, image, name }) {
  return (
    <img
      className={classname(
        'size-5 rounded-full ring-[1px] ring-royalblue ring-offset-2',
        className,
      )}
      src={image}
      alt={name}
    />
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  className: '',
};
