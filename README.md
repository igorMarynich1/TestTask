# React Native Test App

A React Native application built with Expo that implements a 3-screen flow: Onboarding, Sign Up, and My Account.

## Features

### 1. Onboarding Screen
- Horizontal page view with 4 slides and swipe gestures
- Appears only on first app launch (persisted via AsyncStorage)
- Animated page indicators (height + color spring transitions)
- Skip button and Next/Finish navigation
- Per-slide placeholder illustrations

### 2. Sign Up Screen
- Form validation using Zod schema (name, email, password, confirm password, terms)
- Real-time error handling with react-hook-form
- API integration with two-step signup flow
- Loading states, network error handling, and automatic retry on failure
- Keyboard-aware scrolling with floating-label inputs

### 3. My Account Screen
- Data-driven rendering based on API response
- Account info card: type, number, balance, date added
- Recent transactions list with pagination (4 per page, animated transitions)
- Color-coded amounts (green for income, red for expenses)
- Pull-to-refresh to reload account data
- Logout with confirmation dialog

## API Integration

The app implements a two-step signup flow:

1. **POST** `https://artjoms-spole.fly.dev/signup` — registers the user and returns Basic Auth credentials
2. **GET** `https://artjoms-spole.fly.dev/interview/account` — fetches account data using the credentials from step 1

Both steps include automatic retry logic (up to 2 attempts) for network and 5xx errors.

## Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v7 (Stack Navigator, typed routes)
- **Form**: react-hook-form + Zod validation
- **Storage**: AsyncStorage for onboarding persistence
- **HTTP**: Axios with Basic Auth and retry logic
- **Testing**: Jest + @testing-library/react-native

## Project Structure

```
src/
├── components/
│   ├── icons/          # SVG icon components (Show, Hide, UserAvatar)
│   ├── Onboarding/     # SkipHeader, BottomCard, SlideContent, SlideActions
│   └── ui/             # Button, Input, Card, Checkbox, PaginationDots, SlideMedia
├── screens/
│   ├── Onboarding/     # Page view with slides and persistence
│   ├── SignUpScreen/    # Form with validation and API submission
│   └── MyAccountScreen/ # Data-driven account display
├── styles/
│   └── theme.ts        # Colors, typography, spacing, shadows
├── types/              # Shared interfaces and navigation params
└── utils/
    ├── api.ts          # Two-step API client with retry logic
    ├── storage.ts      # AsyncStorage helpers
    ├── validation.ts   # Zod schema
    └── __tests__/      # Unit tests
```

## Getting Started

```bash
npm install
npm start
```

Scan the QR code with Expo Go on your device.

## Running Tests

```bash
npm test
```

## Form Validation Rules

- **Name**: Required, 2-50 characters, auto-trimmed
- **Email**: Valid email format, auto-trimmed
- **Password**: Min 6 characters, must contain letter + number
- **Confirm Password**: Must match password
- **Terms**: Must be accepted
