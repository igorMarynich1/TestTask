# React Native Test App

A React Native application built with Expo that implements a 3-screen flow: Onboarding, Sign Up, and My Account.

## Features

### 1. Onboarding Screen
- Page view with 4 slides, swipe gestures, and smooth animations
- Appears only on first app launch (persisted via AsyncStorage)
- Animated page indicators (height + color transitions)
- Skip and navigation buttons

### 2. Sign Up Screen
- Form validation using Zod schema (name, email, password, confirm password)
- Real-time error handling with react-hook-form
- API integration with https://artjoms-spole.fly.dev/signup
- Loading states, network error handling, and automatic retry on failure
- Responsive design with keyboard handling

### 3. My Account Screen
- Dynamic, data-driven content rendering based on API response
- Displays user information, features list, and quick links
- Flexible data structure handling for unknown response fields
- Pull-to-refresh functionality
- Logout functionality

## Technical Implementation

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v7 (Stack Navigator, typed routes)
- **Form Management**: react-hook-form + Zod validation
- **Storage**: AsyncStorage for onboarding persistence
- **HTTP Client**: Axios with retry logic
- **Styling**: StyleSheet with centralized theme system

## Project Structure

```
src/
├── assets/                    # Images and SVG icons
├── components/
│   ├── icons/                 # SVG icon components (ShowIcon, HideIcon, UserAvatarIcon)
│   ├── Onboarding/            # Onboarding sub-components (SkipHeader, SlideContent, etc.)
│   └── ui/                    # Reusable UI components (Button, Input, Card, Checkbox, PaginationDots)
├── screens/
│   ├── Onboarding/            # Onboarding screen with data, styles, types
│   ├── SignUpScreen/           # Sign up form with sub-components and validation
│   └── MyAccountScreen/       # Account screen with dynamic content rendering
├── styles/
│   └── theme.ts               # Centralized theme (colors, typography, spacing, shadows)
├── types/
│   ├── index.ts               # Shared data types (SignUpFormData, UserAccountData, ApiResponse)
│   └── navigation.ts          # Type-safe navigation params
└── utils/
    ├── api.ts                 # Axios client with retry logic and error handling
    ├── storage.ts             # AsyncStorage helpers for onboarding persistence
    ├── validation.ts          # Zod validation schema
    └── __tests__/             # Unit tests for api and validation
```

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Use Expo Go app to scan the QR code and run on your device

4. Run tests:
   ```bash
   npm test
   ```

## API Integration

The app integrates with the provided backend endpoint:
- **URL**: https://artjoms-spole.fly.dev/signup
- **Method**: POST
- **Payload**: `{ name, email, password }`
- **Retry**: Automatic retry (up to 2 attempts) on network and 5xx errors

## Form Validation

- **Name**: Required, 2-50 characters, auto-trimmed
- **Email**: Valid email format required, auto-trimmed
- **Password**: Minimum 6 characters, must contain at least one letter and one number
- **Confirm Password**: Must match password
- **Terms**: Must be accepted before submission
