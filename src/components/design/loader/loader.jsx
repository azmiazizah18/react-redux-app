import React from 'react';
import PropTypes from 'prop-types';
import { classname } from '@/utils';

export function Loader({ amount, gap, className, loaderWrapperClassName }) {
  return (
    <div
      style={{ gap }}
      className={classname('flex flex-col', loaderWrapperClassName)}
    >
      {new Array(amount).fill(null).map((item, i) => (
        <div
          key={i}
          role="presentation"
          className={classname('animate-pulse rounded-md bg-gray-200/60', className)}
        />
      ))}
    </div>
  );
}

Loader.propTypes = {
  amount: PropTypes.number,
  gap: PropTypes.number,
  className: PropTypes.string,
  loaderWrapperClassName: PropTypes.string,
};

Loader.defaultProps = {
  amount: 1,
  gap: 0,
  className: '',
  loaderWrapperClassName: '',
};
