import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/design/button';
import {
  useOutletContext as useMainLayoutOutletContext,
  useParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from '@/components/design/card';
import { Loader } from '@/components/design/loader';

export function CategoryList({ className }) {
  const { category: activeCategory } = useParams();

  const threads = useSelector((state) => state.threads);
  const { isInitialized } = useMainLayoutOutletContext();

  const categories = React.useMemo(
    () =>
      [...(new Set(threads?.map((thread) => thread.category)) ?? [])].slice(
        0,
        6,
      ),
    [threads],
  );

  return (
    <Card className={className}>
      <header className="mb-2">
        <h4>Kategori Teratas</h4>
      </header>

      <ul className="flex flex-wrap items-center gap-2">
        {isInitialized ? (
          categories.map((category) => (
            <li key={category} className="duration-300 animate-in fade-in">
              <Button
                size="small"
                to={activeCategory === category ? '/' : `/nr/${category}`}
                variant={
                  activeCategory === category ? 'primary' : 'outline-primary'
                }
              >
                {`nr/${category}`}
              </Button>
            </li>
          ))
        ) : (
          <Loader
            amount={5}
            className="m-1 h-8 w-20 grow"
            loaderWrapperClassName="flex-wrap flex-row"
          />
        )}
      </ul>
    </Card>
  );
}

CategoryList.propTypes = {
  className: PropTypes.string,
};

CategoryList.defaultProps = {
  className: '',
};
