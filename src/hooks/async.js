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
          // Simulasi initiator yang selalu gagal
          await initiator(); // Penambahan await tanpa optional chaining ?
          setIsInitialized(true);
        } catch (error) {
          toast.error(error.message);
          setIsInitialized(true); // Pastikan isInitialized tetap true jika ada error
        }
      }
    })();
  }, [initiator, isInitialized]);

  return [store, isInitialized];
}
