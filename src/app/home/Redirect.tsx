'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

const Redirect = memo(() => {
  const router = useRouter();

  useEffect(() => {
    useSessionStore.persist.onFinishHydration(() => {
      const store = useSessionStore.getState();
      const hasSession = sessionSelectors.hasSessionList(store);

      if (hasSession) {
        router.push('/chat');
        store.switchSession();
      } else {
        router.push('/welcome');
      }
    });
  }, []);

  return null;
});

export default Redirect;
