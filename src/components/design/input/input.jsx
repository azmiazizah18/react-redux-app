import PropTypes from 'prop-types';
import React from 'react';
import { classname } from '@/utils'; // Kembali menggunakan 'classname' daripada 'cn'

export function Input({
  className,
  pill,
  id,
  value,
  onChange,
  type,
  placeholder,
}) {
  const handleSearchChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={handleSearchChange}
      placeholder={placeholder}
      className={classname( // Kembali menggunakan 'classname' daripada 'cn'
        'bg-gray-100 px-4 py-2 text-gray-600 transition duration-200 placeholder:text-gray-400 focus-within:outline-none',
        pill ? 'rounded-3xl' : 'rounded-md',
        className,
      )}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  pill: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  pill: true,
  id: undefined,
  placeholder: undefined,
};
