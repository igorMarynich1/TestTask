import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SignUpFormData, ApiResponse } from '../types';
import { validateEmail, validatePassword, validateName } from '../utils/validation';
import { signUpUser } from '../utils/api';
import { theme } from '../styles/theme';
import { Button, Input, Card } from '../components/ui';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    // Validate name
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response: ApiResponse = await signUpUser(formData);
      
      if (response.success) {
        // Navigate to My Account screen with user data
        navigation.navigate('MyAccount', { userData: response.data });
      } else {
        Alert.alert('Sign Up Failed', response.message || 'Please try again later.');
      }
    } catch (error) {
      // Log error in development mode only
      if (__DEV__) {
        console.error('Sign up error:', error);
      }
      Alert.alert(
        'Network Error',
        'Unable to connect to server. Please check your internet connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => {
      if (__DEV__) {
        console.error('Failed to open URL:', err);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>✨</Text>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join thousands of users and start your journey with us today</Text>
        </View>

        <Card style={styles.formCard}>
          <View style={styles.form}>
            <Input
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your full name"
              autoCapitalize="words"
              autoCorrect={false}
              editable={!isLoading}
              error={errors.name}
              leftIcon={<Text style={styles.inputIcon}>👤</Text>}
            />

            <Input
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              error={errors.email}
              leftIcon={<Text style={styles.inputIcon}>✉️</Text>}
            />

            <Input
              label="Password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Create a secure password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              error={errors.password}
              showPasswordToggle={true}
              leftIcon={<Text style={styles.inputIcon}>🔒</Text>}
              hint="Must be at least 8 characters long"
            />

            <Button
              title="Create Account"
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isLoading}
              fullWidth={true}
              size="lg"
              style={styles.signUpButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Continue with Google"
              onPress={() => Alert.alert('Coming Soon', 'Google sign-in will be available soon!')}
              variant="outline"
              fullWidth={true}
              style={styles.socialButton}
            />
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.termsText}>
            By creating an account, you agree to our{' '}
            <Text
              style={styles.linkText}
              onPress={() => handleLinkPress('https://example.com')}
            >
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text
              style={styles.linkText}
              onPress={() => handleLinkPress('https://example.com')}
            >
              Privacy Policy
            </Text>
          </Text>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => handleLinkPress('https://example.com')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[16],
    paddingBottom: theme.spacing[8],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[8],
  },
  logoContainer: {
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
    ...theme.shadows.md,
  },
  logo: {
    fontSize: theme.sizes.iconLg,
  },
  title: {
    fontSize: theme.typography.fontSizes['4xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    paddingHorizontal: theme.spacing[4],
  },
  formCard: {
    marginBottom: theme.spacing[6],
  },
  form: {
    gap: theme.spacing[1],
  },
  inputIcon: {
    fontSize: theme.sizes.iconSm,
    color: theme.colors.text.tertiary,
  },
  signUpButton: {
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[4],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  dividerText: {
    marginHorizontal: theme.spacing[4],
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.fontWeights.medium,
  },
  socialButton: {
    marginBottom: theme.spacing[2],
  },
  footer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.sm,
    marginBottom: theme.spacing[6],
    paddingHorizontal: theme.spacing[4],
  },
  linkText: {
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeights.medium,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
  },
});

export default SignUpScreen;