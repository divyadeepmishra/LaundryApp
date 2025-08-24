// app/(auth)/Signup.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { Text, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';
import { useOAuthFlow } from '../../components/useOAuth';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // OAuth hooks
  const { onSelectAuth: onGooglePress } = useOAuthFlow('oauth_google');
  const { onSelectAuth: onApplePress } = useOAuthFlow('oauth_apple');

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({ emailAddress, password, firstName, lastName });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        // Router will handle redirection based on user role
      } else {
        Alert.alert('Verification Failed', 'Please check the code and try again.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Social Icons
  const GoogleIcon = () => (
    <Svg height={24} width={24} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.15 0 5.95 1.08 8.18 2.88l6.1-6.1C34.64 2.9 29.68 1 24 1 14.64 1 6.7 6.76 3.34 15.02l7.42 5.77C12.38 14.5 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.44-4.74H24v9h12.7c-.56 2.91-2.25 5.37-4.78 7.05l7.42 5.77C43.84 37.02 46.5 30.97 46.5 24z" />
      <Path fill="#FBBC05" d="M10.76 28.25c-.5-1.46-.76-3.01-.76-4.65s.26-3.19.76-4.65l-7.42-5.77C1.15 16.19 0 19.95 0 23.6c0 3.65 1.15 7.41 3.34 10.42l7.42-5.77z" />
      <Path fill="#34A853" d="M24 47c6.48 0 11.92-2.14 15.9-5.83l-7.42-5.77c-2.06 1.38-4.7 2.2-8.48 2.2-6.26 0-11.62-5-13.24-11.29l-7.42 5.77C6.7 41.24 14.64 47 24 47z" />
    </Svg>
  );

  const AppleIcon = () => (
    <Svg height={24} width={24} viewBox="0 0 24 24" fill={COLORS.text}>
      <Path d="M16.5 1.5c-1.2.08-2.6.84-3.42 1.83-.74.9-1.34 2.22-1.1 3.52 1.3.1 2.62-.67 3.44-1.68.76-.94 1.32-2.28 1.08-3.67zM21 17.56c-.42.98-.62 1.42-1.16 2.28-.9 1.36-2.18 3.06-3.76 3.07-1.4.01-1.76-.91-3.66-.9-1.9.01-2.29.91-3.7.9-1.58-.01-2.79-1.55-3.7-2.91-2.53-3.79-2.79-8.24-1.23-10.6 1.1-1.68 2.86-2.68 4.5-2.68 1.68 0 2.74.91 4.13.91 1.35 0 2.17-.91 4.13-.91 1.4 0 2.9.77 4 2.09-3.5 1.94-2.93 7.01.45 8.75z" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!pendingVerification ? (
            <>
              <View style={styles.header}>
                <Ionicons name="person-add-outline" size={80} color={COLORS.primary} />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Get started with your laundry service</Text>
              </View>

              {/* Social Logins */}
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
                  <View style={styles.socialButtonContent}>
                    <GoogleIcon />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={onApplePress}>
                  <View style={styles.socialButtonContent}>
                    <AppleIcon />
                    <Text style={styles.socialButtonText}>Continue with Apple</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.dividerText}>OR</Text>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
                  <TextInput
                    value={firstName}
                    placeholder="First Name"
                    placeholderTextColor={COLORS.textSecondary}
                    onChangeText={setFirstName}
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
                  <TextInput
                    value={lastName}
                    placeholder="Last Name"
                    placeholderTextColor={COLORS.textSecondary}
                    onChangeText={setLastName}
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
                  <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Email Address"
                    placeholderTextColor={COLORS.textSecondary}
                    onChangeText={setEmailAddress}
                    style={styles.input}
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
                  <TextInput
                    value={password}
                    placeholder="Password"
                    placeholderTextColor={COLORS.textSecondary}
                    secureTextEntry
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={onSignUpPress} disabled={loading}>
                  {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Continue</Text>}
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <Link href="/(auth)/Signin" asChild>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </>
          ) : (
            <>
              <View style={styles.header}>
                <Ionicons name="shield-checkmark-outline" size={80} color={COLORS.primary} />
                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.subtitle}>A verification code has been sent to {emailAddress}</Text>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons name="keypad-outline" size={22} color={COLORS.textSecondary} style={styles.icon} />
                  <TextInput
                    value={code}
                    placeholder="Verification Code"
                    placeholderTextColor={COLORS.textSecondary}
                    onChangeText={setCode}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={onVerifyPress} disabled={loading}>
                  {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Verify</Text>}
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  keyboardAvoidingView: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginTop: 20 },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center', paddingHorizontal: 20 },
  socialContainer: { flexDirection: 'column', justifyContent: 'center', gap: 20, marginBottom: 20 },
  socialButton: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  socialButtonContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  socialButtonText: { fontSize: 16, color: COLORS.text, fontWeight: '500' },
  dividerText: { textAlign: 'center', color: COLORS.textLight, marginBottom: 20 },
  formContainer: { width: '100%' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, marginBottom: 16 },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 56, fontSize: 16, color: COLORS.text },
  button: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { fontSize: 14, color: COLORS.textSecondary },
  linkText: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
  scrollContent: { flexGrow: 1, justifyContent: 'center'},
});
