import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Linking,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { UserAccountData } from '../types';
import { theme } from '../styles/theme';
import { Button, Card } from '../components/ui';

type MyAccountScreenRouteProp = RouteProp<RootStackParamList, 'MyAccount'>;
type MyAccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyAccount'
>;

const MyAccountScreen: React.FC = () => {
  const route = useRoute<MyAccountScreenRouteProp>();
  const navigation = useNavigation<MyAccountScreenNavigationProp>();
  const [accountData, setAccountData] = useState<UserAccountData>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (route.params?.userData) {
      setAccountData(route.params.userData);
    }
  }, [route.params]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh - in real app, you'd fetch updated data from API
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Onboarding' }],
            });
          },
        },
      ]
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const renderDynamicContent = () => {
    const content = [];

    // Render welcome message
    if (accountData.message) {
      content.push(
        <Card key="message" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💬</Text>
            <Text style={styles.sectionTitle}>Welcome Message</Text>
          </View>
          <Text style={styles.messageText}>{accountData.message}</Text>
        </Card>
      );
    }

    // Render instructions
    if (accountData.instructions) {
      content.push(
        <Card key="instructions" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📋</Text>
            <Text style={styles.sectionTitle}>Getting Started</Text>
          </View>
          <Text style={styles.instructionsText}>{accountData.instructions}</Text>
        </Card>
      );
    }

    // Render features list
    if (accountData.features && Array.isArray(accountData.features)) {
      content.push(
        <Card key="features" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>✨</Text>
            <Text style={styles.sectionTitle}>Available Features</Text>
          </View>
          <View style={styles.featuresGrid}>
            {accountData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Card>
      );
    }

    // Render links
    if (accountData.links && typeof accountData.links === 'object') {
      content.push(
        <Card key="links" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🔗</Text>
            <Text style={styles.sectionTitle}>Quick Links</Text>
          </View>
          <View style={styles.linksContainer}>
            {Object.entries(accountData.links).map(([label, url]) => (
              <TouchableOpacity
                key={label}
                style={styles.linkItem}
                onPress={() => handleLinkPress(url as string)}
              >
                <Text style={styles.linkText}>{label}</Text>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      );
    }

    // Render profile data
    if (accountData.profile && typeof accountData.profile === 'object') {
      content.push(
        <Card key="profile" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👤</Text>
            <Text style={styles.sectionTitle}>Profile Information</Text>
          </View>
          <View style={styles.profileGrid}>
            {Object.entries(accountData.profile).map(([key, value]) => (
              <View key={key} style={styles.profileItem}>
                <Text style={styles.profileLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.profileValue}>{String(value)}</Text>
              </View>
            ))}
          </View>
        </Card>
      );
    }

    // Render any other data as JSON (fallback)
    const otherData = { ...accountData };
    delete otherData.name;
    delete otherData.email;
    delete otherData.id;
    delete otherData.message;
    delete otherData.instructions;
    delete otherData.features;
    delete otherData.links;
    delete otherData.profile;

    if (Object.keys(otherData).length > 0) {
      content.push(
        <Card key="other" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📄</Text>
            <Text style={styles.sectionTitle}>Additional Information</Text>
          </View>
          <View style={styles.jsonContainer}>
            <Text style={styles.jsonText}>{JSON.stringify(otherData, null, 2)}</Text>
          </View>
        </Card>
      );
    }

    return content;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl 
          refreshing={isRefreshing} 
          onRefresh={handleRefresh}
          tintColor={theme.colors.primary[500]}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Account</Text>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="ghost"
          size="sm"
        />
      </View>

      {/* User Info Card */}
      <Card style={styles.userInfoCard}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(accountData.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{accountData.name || 'User'}</Text>
            <Text style={styles.userEmail}>{accountData.email || 'No email provided'}</Text>
            {accountData.id && (
              <View style={styles.userIdContainer}>
                <Text style={styles.userIdLabel}>ID:</Text>
                <Text style={styles.userId}>{accountData.id}</Text>
              </View>
            )}
          </View>
        </View>
      </Card>

      {/* Dynamic Content */}
      <View style={styles.dynamicContent}>
        {renderDynamicContent()}
      </View>

      {/* Default content if no dynamic content */}
      {Object.keys(accountData).length <= 3 && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎉</Text>
            <Text style={styles.sectionTitle}>Account Created Successfully!</Text>
          </View>
          <Text style={styles.messageText}>
            Welcome to our platform! Your account has been created and you can now access all features.
          </Text>
        </Card>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Edit Profile"
          onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon!')}
          variant="outline"
          fullWidth={true}
          style={styles.actionButton}
        />
        <Button
          title="Settings"
          onPress={() => Alert.alert('Coming Soon', 'Settings will be available soon!')}
          variant="secondary"
          fullWidth={true}
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  contentContainer: {
    paddingBottom: theme.spacing[10],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[16],
    paddingBottom: theme.spacing[6],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    fontSize: theme.typography.fontSizes['4xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  userInfoCard: {
    marginHorizontal: theme.spacing[6],
    marginTop: theme.spacing[6],
    marginBottom: theme.spacing[4],
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[4],
    ...theme.shadows.md,
  },
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  userEmail: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
  },
  userIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIdLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.fontWeights.medium,
    marginRight: theme.spacing[2],
  },
  userId: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    fontFamily: 'monospace',
  },
  dynamicContent: {
    paddingHorizontal: theme.spacing[6],
  },
  section: {
    marginBottom: theme.spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  sectionIcon: {
    fontSize: theme.sizes.iconMd,
    marginRight: theme.spacing[3],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
  },
  messageText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  instructionsText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  featuresGrid: {
    gap: theme.spacing[2],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureBullet: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeights.bold,
    marginRight: theme.spacing[2],
    marginTop: theme.spacing[1] / 2,
  },
  featureText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    flex: 1,
  },
  linksContainer: {
    gap: theme.spacing[1],
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing[2],
  },
  linkText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeights.medium,
  },
  linkArrow: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.tertiary,
  },
  profileGrid: {
    gap: theme.spacing[3],
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  profileLabel: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeights.medium,
  },
  profileValue: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'right',
    marginLeft: theme.spacing[4],
  },
  jsonContainer: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing[4],
  },
  jsonText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.primary,
    fontFamily: 'monospace',
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.sm,
  },
  actionButtons: {
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[4],
    gap: theme.spacing[3],
  },
  actionButton: {
    marginBottom: theme.spacing[2],
  },
});

export default MyAccountScreen;