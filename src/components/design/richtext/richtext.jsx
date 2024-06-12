/* eslint */
import { classname } from '@/utils';
import PropTypes from 'prop-types';
import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function Richtext({ className, value, onChange }) {
  return (
    <>
      <style>
        {`.ql-container, .ql-toolbar {
            border: none !important;
          }
          
          .ql-toolbar {
            z-index: 10;
            background-color: #4169E1;
            border-bottom: 1px solid #4169E1 !important;
            position: sticky;
            top: 0;
          }`}
      </style>
      <ReactQuill
        value={value}
        onChange={onChange}
        className={classname(
          'max-h-72 overflow-auto rounded-md bg-gray-200/50 text-black transition duration-200',
 
          '[&[placeholder]]:empty:before:text-gray-400 [&[placeholder]]:empty:before:content-[attr(placeholder)]',
          className,
        )}
      />
    </>
  );
}

Richtext.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Richtext.defaultProps = {
  className: '',
};