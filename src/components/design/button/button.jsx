import React from 'react';
import PropTypes from 'prop-types';
import { classname } from '@/utils';
import { Link } from 'react-router-dom';

export function Button({
  onClick,
  size,
  to,
  className,
  disabled,
  variant,
  children,
  icon,
  type,
  pill,
  square,
}) {
  const classNames = classname(
    'flex cursor-pointer items-center justify-center rounded-md transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    {
      'gap-3': icon !== null,
      'rounded-3xl': pill,
      'px-2 py-1 text-sm': size === 'small',
      'px-4 py-2': size === 'normal',
      'px-6 py-3': size === 'big',
      'aspect-square': square,
    },
    {
      'font-bold bg-transparant border border-royalblue hover:bg-teal-50 text-royalblue':
        variant === 'outline-primary',
      'font-bold bg-transparant border border-royalblue hover:bg-red-50 text-royalblue focus-within:ring-royalblue':
        variant === 'outline-danger',
      'font-bold bg-black text-white hover:bg-royalblue disabled:hover:bg-red-500 focus-within:ring-royalblue':
        variant === 'danger',
      'font-bold bg-transparant text-black hover:bg-royalblue disabled:hover:bg-royalblue':
        variant === 'primary',
      'text-royalblue decoration-royalblue underline-offset-4 hover:underline disabled:hover:underline':
        variant === 'link',
    },    
    className,
  );

  return to ? (
    <Link to={to} disabled={disabled} className={classNames}>
      {icon} {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames}
    >
      {icon}
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  pill: PropTypes.bool,
  square: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  to: undefined,
  type: 'button',
  variant: 'primary',
  pill: false,
  square: false,
  onClick: undefined,
  size: 'normal',
  icon: undefined,
  disabled: undefined,
};
