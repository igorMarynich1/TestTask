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
- API integration with two-step signup flow
- Loading states, network error handling, and automatic retry on failure
- Responsive design with keyboard handling

### 3. My Account Screen
- Displays real account data fetched from the backend
- Account info card: type, number, balance, date added
- Recent transactions list with pagination (4 per page, animated transitions)
- Color-coded amounts (green for income, red for expenses)
- Pull-to-refresh to reload account data from the API
- Logout functionality (resets navigation to Sign Up)

## API Integration

The app implements a two-step signup flow:

1. **POST** `https://artjoms-spole.fly.dev/signup` — registers the user and returns Basic Auth credentials
2. **GET** `https://artjoms-spole.fly.dev/interview/account` — fetches account data using the credentials from step 1

### Step 1: Sign Up
- **Method**: POST
- **Payload**: `{ name, email, password }`
- **Response**: `{ message, nextStep, basicAuthCredentials: { username, password } }`

### Step 2: Fetch Account
- **Method**: GET
- **Auth**: Basic Auth with credentials from step 1
- **Response**: `{ accountType, accountNumber, availableBalance, currency, dateAdded, transactions }`

Both steps include automatic retry logic (up to 2 attempts) for network and 5xx errors.

## Technical Implementation

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v7 (Stack Navigator, typed routes)
- **Form Management**: react-hook-form + Zod validation
- **Storage**: AsyncStorage for onboarding persistence
- **HTTP Client**: Axios with Basic Auth and retry logic
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
│   └── MyAccountScreen/       # Account screen with real API data rendering
├── styles/
│   └── theme.ts               # Centralized theme (colors, typography, spacing, shadows)
├── types/
│   ├── index.ts               # Shared data types (SignUpFormData, AccountData, Transaction, etc.)
│   └── navigation.ts          # Type-safe navigation params
└── utils/
    ├── api.ts                 # Two-step API client with Basic Auth and retry logic
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

## Form Validation

- **Name**: Required, 2-50 characters, auto-trimmed
- **Email**: Valid email format required, auto-trimmed
- **Password**: Minimum 6 characters, must contain at least one letter and one number
- **Confirm Password**: Must match password
- **Terms**: Must be accepted before submission
