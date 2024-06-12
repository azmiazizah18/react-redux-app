import { toast } from '@/components/design/toast';
import React from 'react';
import { useSelector } from 'react-redux';

export function Async(selector, initiator) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const store = useSelector(selector);

  React.useEffect(() => {
    (async () => {
      if (!isInitialized) {
        try {
          await initiator?.();
          setIsInitialized(true);
        } catch (error) {
          toast.error(error.message);
        }
      }
    })();
  }, [initiator, isInitialized]);

  return [store, isInitialized];
}
