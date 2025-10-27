# Google OAuth Setup Instructions

## Prerequisites
1. A Google Cloud Platform account
2. Node.js and npm installed

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: External (for testing) or Internal (for organization use)
   - Fill in app name, user support email, and developer contact
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if using External type
6. For Application type, select **Web application**
7. Add Authorized JavaScript origins:
   - `http://localhost:5173` (for local development)
   - Your production domain (e.g., `https://yourdomain.com`)
8. Add Authorized redirect URIs:
   - `http://localhost:5173` (for local development)
   - Your production domain
9. Click **Create**
10. Copy the **Client ID**

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root of your project (if not already created)
2. Add your Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```
3. Replace `your-client-id-here` with your actual Client ID

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Application

```bash
npm run dev
```

## Testing Google OAuth

1. Navigate to `http://localhost:5173`
2. Click on Login or Sign Up
3. Click the "Sign in with Google" button
4. Select your Google account
5. Grant permissions
6. You should be redirected to the app dashboard

## Security Notes

- **NEVER** commit the `.env` file to version control
- The `.env` file is already in `.gitignore`
- For production, add your production domain to Google Cloud Console
- Keep your Client ID secure
- Use environment variables in your deployment platform (Vercel, Netlify, etc.)

## Deployment to Vercel

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `VITE_GOOGLE_CLIENT_ID` with your Client ID as the value
4. Make sure to add your Vercel deployment URL to Google Cloud Console's authorized origins and redirect URIs

## Troubleshooting

### "Invalid Client" Error
- Verify your Client ID is correct in `.env`
- Check that your domain is in the authorized JavaScript origins

### "redirect_uri_mismatch" Error
- Add your current URL to the authorized redirect URIs in Google Cloud Console

### Google Sign-In Button Not Showing
- Check browser console for errors
- Verify `VITE_GOOGLE_CLIENT_ID` is set correctly
- Ensure you're running the app (npm run dev)

## User Data Stored

After successful login, the following user data is stored in localStorage:
- Email
- Name
- Profile picture URL
- Google User ID (sub)
- JWT token

This data persists across sessions and is automatically loaded on app refresh.
