import { classname } from '@/utils';
import PropTypes from 'prop-types';

export function Card({ children, className }) {
  return (
    <div
      className={classname(
        'rounded-md border border-royalblue bg-gray-50 p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  className: '',
};
