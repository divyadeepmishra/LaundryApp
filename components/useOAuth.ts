import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export function useOAuthFlow(provider: 'oauth_google' | 'oauth_apple') {
  const { startOAuthFlow } = useOAuth({ strategy: provider });
  const router = useRouter();

  const onSelectAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        // The user will be automatically redirected based on their role
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, [startOAuthFlow]);

  return { onSelectAuth };
}
