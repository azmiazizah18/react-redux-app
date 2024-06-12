import React from 'react';
import PropTypes from 'prop-types';
import { classname } from '@/utils';
import { useDropdownContext } from './usecontext';

export function DropdownTrigger({ className, children }) {
  const { handleToggle } = useDropdownContext();

  return (
    <div
      className={classname(className)}
      role="button"
      onClick={handleToggle}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

DropdownTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DropdownTrigger.defaultProps = {
  className: '',
};
