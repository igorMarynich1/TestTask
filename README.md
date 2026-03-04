# React Native Test App

A React Native application built with Expo that implements a 3-screen flow: Onboarding, Sign Up, and My Account.

## Features

### 1. Onboarding Screen
- Page view with 3 slides and smooth animations
- Appears only on first app launch (uses AsyncStorage)
- Page indicators with animation
- Skip and navigation buttons

### 2. Sign Up Screen
- Form validation for name, email, and password
- Real-time error handling
- API integration with https://artjoms-spole.fly.dev/signup
- Loading states and network error handling
- Responsive design with keyboard handling

### 3. My Account Screen
- Dynamic content rendering based on API response
- Displays user information
- Flexible data structure handling
- Pull-to-refresh functionality
- Logout functionality

## Technical Implementation

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6 (Stack Navigator)
- **Storage**: AsyncStorage for persistence
- **HTTP Client**: Axios
- **Styling**: StyleSheet with modern iOS-inspired design

## Project Structure

```
src/
├── screens/
│   ├── OnboardingScreen.tsx
│   ├── SignUpScreen.tsx
│   └── MyAccountScreen.tsx
├── types/
│   └── index.ts
└── utils/
    ├── validation.ts
    └── api.ts
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

## API Integration

The app integrates with the provided backend endpoint:
- **URL**: https://artjoms-spole.fly.dev/signup
- **Method**: POST
- **Payload**: `{ name, email, password }`

## Form Validation

- **Name**: Required, 2-50 characters
- **Email**: Valid email format required
- **Password**: Minimum 6 characters, must contain at least one letter and one number

## Features Implemented

✅ Onboarding screen with page view and persistence  
✅ Form validation and error handling  
✅ API integration with proper error handling  
✅ Dynamic My Account screen based on API response  
✅ React Navigation setup  
✅ TypeScript implementation  
✅ Modern UI design  
✅ Loading states and user feedback  
✅ Keyboard handling  
✅ Pull-to-refresh functionality  

## Bonus Features

✅ TypeScript implementation  
✅ Smooth animations and transitions  
✅ Comprehensive error handling  
✅ Offline-friendly error messages  
✅ Clean, modular code architecture