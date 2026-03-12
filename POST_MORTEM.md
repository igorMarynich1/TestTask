# Post-Mortem: React Native Test Task Feedback

This document summarizes the feedback received, identifies likely root causes, and outlines fixes and improvements.

---

## Feedback Summary

| Concern | Interpretation |
|--------|----------------|
| Significant bugs impacting both platforms | Cross-platform issues causing crashes or incorrect behavior |
| One of three screens was not functional | A screen crashes, shows nothing, or fails to work as expected |
| Insufficient testing prior to submission | Manual testing on both iOS and Android was incomplete |
| Code structure doesn't align with engineering standards | Architecture, patterns, or conventions fell short |

---

## Identified Issues

### 1. **CRITICAL: Missing Onboarding Image (likely "one screen not functional")**

**Problem:** The Onboarding screen requires `src/assets/img/Onboarding.png`:

```tsx
const ONBOARDING_IMAGE = require("../../assets/img/Onboarding.png");
```

The `assets/img/` folder does not exist, and there is no `Onboarding.png` file. Metro bundler resolves `require()` at build time; a missing asset can cause:

- Build failure
- Runtime crash when the Onboarding screen loads
- Red/yellow error screen on both iOS and Android

**Fix:** Create `src/assets/img/` and add a valid placeholder image, or use a remote placeholder until the design asset is available.

---

### 2. **MyAccount Screen: Missing Guard for Invalid Navigation**

**Problem:** If the user reaches MyAccount without valid `userData` (e.g., deep link, back navigation, or bug), the screen can:

- Render with empty/undefined data
- Crash when `accountData` is expected in child components
- Show a broken or confusing layout

**Fix:** Add a guard to redirect to SignUp when `userData` is missing, and ensure all child components handle undefined safely.

---

### 3. **API Response Assumptions**

**Problem:** The task states: *"The API will return instructions or data to render this screen. Your implementation should be flexible and data-driven."*

The implementation assumes a specific flow:

1. `POST /signup` returns `basicAuthCredentials: { username, password }`
2. `GET /interview/account` returns account data with Basic Auth

If the real API returns a different structure (e.g., account data directly in the signup response, or different field names), the app will fail when:

- Destructuring `basicAuthCredentials` from the signup response
- Calling `fetchAccountData` with credentials
- Rendering `DynamicContent` with the expected `AccountData` shape

**Fix:** Validate the API response shape before use, handle missing or unexpected fields, and avoid hard dependencies on specific field names.

---

### 4. **Form Fields vs. Task Requirements**

**Task:** Name, Email, Password (3 fields)  
**Implementation:** Name, Email, Password, Confirm Password, Accept Terms (5 fields)

The extra fields improve UX and validation but deviate from the spec. Some evaluators may expect strict adherence. Not necessarily a bug, but worth noting.

---

### 5. **Testing Gaps**

- Unit tests exist for `api.ts` and `validation.ts`
- No integration tests for screen flows
- No E2E tests
- Likely no manual testing on both platforms before submission

**Fix:** Add a pre-submission checklist: run on both Expo Go (iOS + Android), walk through all three screens, verify signup → MyAccount flow, and test error cases.

---

## Evaluation Criteria vs. Implementation

| Criterion | Points | Status |
|-----------|--------|--------|
| Architecture & Code Quality | 25 | Good structure, some improvements possible |
| Expo Usage & Compatibility | 10 | Expo Go compatible, but missing asset breaks onboarding |
| Onboarding Screen | 10 | Logic and persistence correct; missing image causes failure |
| Form Implementation | 10 | Solid validation and UX |
| API Integration | 15 | Two-step flow works with correct API; fragile if API differs |
| My Account Screen | 10 | Depends on API response; no guard for missing data |
| Navigation | 5 | Correct use of React Navigation |
| Styling | 5 | Theme and layout in place |
| State Management | 5 | `useState`, context used appropriately |

---

## Recommended Fixes (Priority Order)

1. **Fix Onboarding screen** – Add a valid `Onboarding.png` or make the image optional with a safe fallback.
2. **Guard MyAccount screen** – Redirect to SignUp when `userData` is missing.
3. **Harden API handling** – Validate response shape and handle unexpected structures.
4. **Pre-submission checklist** – Run on both platforms, test all flows, verify assets.
5. **Add README notes** – Document assumptions about the API and any setup steps.

---

## Lessons for Future Submissions

1. **Verify all assets** – Ensure every `require()` path points to an existing file.
2. **Test on both platforms** – iOS and Android before submitting.
3. **Design defensively** – Handle missing data, invalid navigation, and API changes.
4. **Align with spec** – Stick to required fields unless spec allows extensions.
5. **Match “flexible, data-driven”** – Avoid hard-coded assumptions about API responses.
