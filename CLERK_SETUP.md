# Clerk Authentication Setup Guide

## Step 1: Create a Clerk Account

1. Go to [clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application
3. Choose "React Native" as your framework

## Step 2: Configure Your Application

1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Add it to your `.env` file:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

## Step 3: Configure OAuth Providers

### Google OAuth Setup

1. Go to **User & Authentication** > **Social Connections**
2. Enable **Google**
3. Create a Google OAuth application:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to **Credentials** > **Create Credentials** > **OAuth 2.0 Client IDs**
   - Set application type to **Web application**
   - Add authorized redirect URIs from Clerk dashboard
4. Copy the **Client ID** and **Client Secret** to Clerk

### Apple OAuth Setup

1. In Clerk dashboard, enable **Apple**
2. Create an Apple Developer account if you don't have one
3. Create an App ID and configure Sign in with Apple
4. Add the credentials to Clerk

## Step 4: Configure Allowed Origins

1. In Clerk dashboard, go to **User & Authentication** > **Email, Phone, Username**
2. Add your development URLs:
   - `exp://localhost:8081`
   - `exp://192.168.x.x:8081` (your local IP)
   - `http://localhost:3000` (for web)

## Step 5: Set Up User Roles

1. Go to **User & Authentication** > **User Management**
2. Create custom user attributes for roles:
   - Add a **Public metadata** field called `role`
   - Set possible values: `customer`, `admin`, `delivery`

## Step 6: Test Authentication

1. Start your app: `npm start`
2. Try signing up with email/password
3. Test Google and Apple OAuth
4. Check that users are created in Clerk dashboard

## Common Issues and Solutions

### Issue: "Clerk has been loaded with development keys"
**Solution**: This is just a warning. Make sure you're using the correct publishable key.

### Issue: "Session has pending tasks but no handling is configured"
**Solution**: This warning appears when Clerk has incomplete flows. The app should still work, but you can configure task URLs in the ClerkProvider if needed.

### Issue: Users not appearing in Clerk dashboard
**Solution**: 
1. Check your publishable key is correct
2. Ensure you're using the right environment (test vs live)
3. Check network connectivity
4. Verify OAuth redirect URIs are correct

### Issue: OAuth not working
**Solution**:
1. Verify OAuth credentials are correct
2. Check redirect URIs match exactly
3. Ensure OAuth providers are enabled in Clerk dashboard
4. Test with a fresh browser session

## Environment Variables

Make sure your `.env` file has:

```env
# Clerk Configuration
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/laundryapp"

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

## Testing Authentication Flow

1. **Sign Up Flow**:
   - Create account with email/password
   - Verify email
   - Should redirect to customer dashboard

2. **Sign In Flow**:
   - Sign in with existing credentials
   - Should redirect based on user role

3. **OAuth Flow**:
   - Click Google/Apple buttons
   - Complete OAuth flow
   - Should redirect to appropriate dashboard

## Role-Based Routing

The app automatically routes users based on their role:

- **Customer**: `/(customer)/`
- **Admin**: `/(admin)/`
- **Delivery**: `/(delivery)/`

To set a user's role, update their public metadata in Clerk dashboard or via API.

## Next Steps

1. Set up your backend API
2. Configure webhooks for user synchronization
3. Set up Razorpay for payments
4. Deploy to production with live Clerk keys
