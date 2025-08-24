// // app/_layout.tsx
// import React, { useEffect } from 'react';
// import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
// import { Slot, useRouter, useSegments } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import * as SecureStore from 'expo-secure-store';
// import { useFonts } from 'expo-font';
// import FontAwesome from '@expo/vector-icons/FontAwesome';

// // Your Clerk Publishable Key
// const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// // Cache the Clerk JWT
// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
//       <InitialLayout />
//     </ClerkProvider>
//   );
// }

// function InitialLayout() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const { user } = useUser();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const inAuthGroup = segments.includes('(auth)');

//     // Check user role from Clerk's metadata
//     // You must set this in your Clerk Dashboard: publicMetadata: { role: 'customer' | 'admin' | 'delivery' }
//     const role = user?.publicMetadata?.role || 'customer';

//     if (isSignedIn && !inAuthGroup) {
//       // User is signed in, redirect based on role
//       if (role === 'admin') {
//         router.replace('/(admin)'); // Corrected path
//       } else if (role === 'delivery') {
//         router.replace('/(delivery)'); // Corrected path
//       } else {
//         router.replace('/(customer)'); // Corrected path
//       }
//     } else if (!isSignedIn) {
//       // User is not signed in, redirect to login
//       router.replace('/(auth)/Signin'); // Corrected path
//     }
//   }, [isLoaded, isSignedIn, user]);

//   return <Slot />;
// }


// app/_layout.tsx
import React, { useEffect } from 'react';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Your Clerk Publishable Key - Replace with your actual key
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_your_key_here';

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY} 
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // Hide the splash screen now that we are ready to render.
    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === '(auth)';
    
    // Get user role from Clerk metadata, default to customer
    const role = user?.publicMetadata?.role || 'customer';

    console.log('🔐 Auth Debug:', { 
      isSignedIn, 
      inAuthGroup, 
      role, 
      segments, 
      userId: user?.id,
      userEmail: user?.emailAddresses?.[0]?.emailAddress,
      publicMetadata: user?.publicMetadata
    });

    if (isSignedIn) {
      // User is signed in - redirect based on role
      console.log('✅ User signed in, redirecting to:', role);
      
      if (role === 'admin') {
        router.replace('/(admin)');
      } else if (role === 'delivery') {
        router.replace('/(delivery)');
      } else {
        // Default to customer for all users without a specific role
        router.replace('/(customer)');
      }
    } else if (!isSignedIn && !inAuthGroup) {
      // User is not signed in and not in auth flow, redirect to login
      console.log('❌ User not signed in, redirecting to signin');
      router.replace('/(auth)/Signin');
    }
  }, [isLoaded, isSignedIn, user, segments]);

  // While Clerk is loading, we render nothing, so the splash screen remains visible.
  if (!isLoaded) {
    return null;
  }
  
  // Once loaded, the Slot will render the correct screen based on the redirects above.
  return <Slot />;
}