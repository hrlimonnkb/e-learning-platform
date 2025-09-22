// ==================== app/api/auth/google/route.js ====================
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('Google OAuth initiation started');
    
    const googleAuthURL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    
    // Get base URL dynamically
    const baseUrl = process.env.NEXTAUTH_URL || 
                   (process.env.NODE_ENV === 'production' 
                    ? 'https://yourdomain.com' 
                    : 'http://localhost:3000');
    
    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    
    console.log('Google OAuth Config:', {
        clientId: process.env.GOOGLE_CLIENT_ID ? 'Present' : 'Missing',
        redirectUri: redirectUri,
        baseUrl: baseUrl
    });
    
    googleAuthURL.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID);
    googleAuthURL.searchParams.set('redirect_uri', redirectUri);
    googleAuthURL.searchParams.set('response_type', 'code');
    googleAuthURL.searchParams.set('scope', 'openid email profile');
    googleAuthURL.searchParams.set('access_type', 'offline');
    googleAuthURL.searchParams.set('prompt', 'consent');
    googleAuthURL.searchParams.set('state', 'google_oauth_state'); // Security state

    console.log('Redirecting to Google OAuth URL:', googleAuthURL.toString());
    return NextResponse.redirect(googleAuthURL.toString());
}

