# User Onboarding and Authentication

## Overview
The system provides comprehensive user onboarding, authentication via SSO, and settings management. Users can sign in with Email/OTP, Google OAuth, or GitHub OAuth, then proceed through a 4-step onboarding flow.

## Database Schema

### Table: `user_profiles`
- **Field**: `onboarded_steps` (TEXT)
  - Stores JSON array of completed steps
  - Default value: `["models"]` for new users
  - Example: `["models", "profile", "connects", "credits"]`

## Step Definition

```typescript
const ONBOARDING_STEPS = ['profile', 'connects', 'models', 'credits'] as const;
type OnboardingStep = typeof ONBOARDING_STEPS[number];
```

### Steps
1. **profile**: Email verification and basic profile setup
2. **connects**: GitHub app installation and repository access
3. **models**: AI model preferences (optional, pre-populated)
4. **credits**: Initial credits purchase

## API Endpoints

### GET /api/user/onboarding
Returns current onboarding status:
```json
{
  "isOnboardingComplete": false,
  "completedSteps": ["models", "profile"],
  "currentStep": "connects"
}
```

### POST /api/user/onboarding
Updates completed steps:
```json
{
  "completedStep": "connects"
}
```

### GET /api/user/data
Includes onboarding in user data response:
```json
{
  "profile": { ... },
  "githubConnection": { ... },
  "credits": 1000,
  "modelPreferences": [],
  "onboarded_steps": ["models", "profile", "connects", "credits"],
  "isOnboardingComplete": true
}
```

## Frontend Implementation

### Orbitals Experience Architecture

**Purpose**: Account management, settings, and configuration hub

**Location**: Modal overlay accessed via nav or programmatically
- **Path**: `/app/orbitals/components/index.tsx`
- **Entry Point**: User avatar menu or "Login" button in nav

**Key Panes**:
- **Profile** (`OrbitalsProfilePane`): User account settings and preferences
- **Connects** (`OrbitalsConnectsPane`): VCS integrations (GitHub, GitLab, Bitbucket)
- **Credits** (`OrbitalsCreditsPane`): Usage tracking and billing management
- **Models** (`OrbitalsModelsPane`): LLM provider selection and configuration

**Key Components**:
- `Orbital`: Main container with orbital ring animation
- `OrbitalsProvider`: Global state management for orbital open/close
- `OrbitalsContent`: Content router for different panes
- `OrbitalRings`: Visual orbital animation system (GPU-accelerated)
- `OrbitalsLoginPane`: Authentication flow

**Visual Design**:
- Orbital ring animation system with GPU acceleration
- Dark modal overlay with blur backdrop
- Smooth pane transitions (Framer Motion)
- Consistent form styling across all panes
- Lazy-loaded pane components for performance

**Features**:
- Instant loading with React Query cache
- Prefetch on hover for instant open
- Dynamic imports for code splitting
- Organization management support

### State Management
The `Orbital` component (`/app/orbitals/components/index.tsx`) manages:
- Per-step completion states to prevent race conditions
- Sequential step unlocking (except models, always available)
- Auto-progression when steps become completable

```typescript
const [stepCompletionStates, setStepCompletionStates] = useState<Record<OrbitalPane, boolean>>({ 
  'profile': false,
  'connects': false,
  'models': true, // Always completable (optional)
  'credits': false
});
```

### Available Steps Logic
```typescript
const availableSteps = useMemo(() => {
  const available: OrbitalPane[] = ['models']; // Always available
  if (!completedSteps.includes('profile')) {
    available.push('profile');
  } else {
    available.push('profile', 'connects');
    if (completedSteps.includes('connects')) {
      available.push('credits');
    }
  }
  return available;
}, [completedSteps]);
```

### UI Components
- **OrbitalContent**: Displays step indicators and content
- **AfterOnboardingOverlay**: Disables features until onboarding complete
- **OnboardingInfoBox**: Shows contextual help per step

## Step Completion Triggers

### Profile Step
Completed when email is verified:
```typescript
useEffect(() => {
  onCompletionStatusChange(isVerified);
}, [isVerified, onCompletionStatusChange]);
```

### Connects Step
Completed when GitHub is connected:
```typescript
useEffect(() => {
  onCompletionStatusChange(githubConnected);
}, [githubConnected, onCompletionStatusChange]);
```

### Models Step
Pre-populated, always considered available:
- User can customize preferences but not required
- Step included by default in `onboarded_steps`

### Credits Step
Completed when credits balance > 0:
```typescript
useEffect(() => {
  onCompletionStatusChange(currentCredits > 0);
}, [currentCredits, onCompletionStatusChange]);
```

## Completion Check

Simple and consistent:
```typescript
const isComplete = onboardedSteps.length === 4;
```

## AfterOnboardingOverlay Behavior

During onboarding, only essential features are available:
- **GitHub**: Available during connects step (essential)
- **All other integrations**: Disabled until onboarding complete
- **API Keys**: Disabled until onboarding complete
- **Team features**: Disabled until onboarding complete

## Testing

### Unit Tests
- `/tests/userDataRoute.test.ts` - API response structure
- Component tests verify step progression

### E2E Tests
- `/tests/e2e/onboarding-first-step.spec.ts`
- `/tests/e2e/onboarding-full-flow.spec.ts`

## Key Improvements

1. **Single Source of Truth**: `onboarded_steps` array eliminates dual-system complexity
2. **Race Condition Prevention**: Per-step completion states prevent cross-pane interference
3. **Models Optional**: Pre-populated in array, always available but not blocking
4. **Clean Architecture**: No legacy fields, consistent naming, simple completion check
5. **Consistent UI**: All non-essential features use same `AfterOnboardingOverlay` logic

---

## SSO (Single Sign-On) Implementation

### Overview
Engi uses Supabase Auth for all authentication, including SSO with Google and GitHub OAuth providers. NextAuth has been completely removed as it was dead code.

### Authentication Flow
```
User → Login Page → Social Login Button → Supabase OAuth → Provider → Callback → Session
```

### Key Components
- **LoginForm.tsx**: Email/OTP authentication (unchanged, working)
- **SocialLoginButton.tsx**: OAuth provider buttons (Google & GitHub enabled)
- **AuthProvider.tsx**: Supabase session management
- **LoginCallbackClient.tsx**: OAuth callback handler

### OAuth Providers

#### Google SSO
- **Status**: ✅ Enabled
- **Flow**: Direct Supabase OAuth
- **Callback**: `/tps/supabase/callback`
- **Requirements**: Google OAuth app with Supabase credentials

#### GitHub SSO  
- **Status**: ✅ Enabled
- **Flow**: Direct Supabase OAuth
- **Callback**: `/tps/supabase/callback`
- **Requirements**: GitHub OAuth app (NOT the GitHub App)

### Important Distinctions

#### GitHub OAuth vs GitHub App
1. **GitHub OAuth** (for SSO):
   - Used for user authentication
   - Allows "Sign in with GitHub"
   - Managed by Supabase Auth
   - Creates user session

2. **GitHub App** (for repository access):
   - Used for repository integration
   - Requires installation from marketplace
   - Provides webhook integration
   - Uses verification code flow
   - Stores in `user_connections` table

### Configuration

#### Supabase Dashboard
1. Enable Google provider with OAuth credentials
2. Enable GitHub provider with OAuth credentials
3. Set callback URLs to `<your-domain>/tps/supabase/callback`

#### Environment Variables
See `DEPLOYMENT.md` for complete environment variable documentation.

### Testing Authentication Flows

#### Email/OTP Login (✅ Unchanged)
1. Enter email address
2. Receive OTP code
3. Verify code
4. Session established

#### Google SSO
1. Click "Continue with Google"
2. Authenticate with Google
3. Return to `/tps/supabase/callback`
4. Session established

#### GitHub SSO
1. Click "Continue with GitHub"  
2. Authorize with GitHub
3. Return to `/tps/supabase/callback`
4. Session established

#### GitHub App Installation (✅ Unchanged)
1. Install from marketplace
2. Get verification code
3. Enter in connects-pane
4. Connection saved

### Zero Regressions Confirmation

✅ **Email/OTP login**: Completely untouched, using same Supabase `signInWithOtp` and `verifyOtp`
✅ **GitHub App installation**: Verification code flow unchanged, POST to `/api/user/connections/github` intact
✅ **Session management**: AuthProvider continues using Supabase client
✅ **User data**: All user profiles, connections, credits unchanged

### Migration Notes

For existing deployments:
1. Add GitHub OAuth app in GitHub settings
2. Configure Supabase dashboard with OAuth credentials
3. Update environment variables (see DEPLOYMENT.md)
4. No database migrations required
5. No user data affected
