// ==================== app/api/auth/google/callback/route.js ====================
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '@/lib/auth';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(req) {
    console.log('Google OAuth callback received');
    
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        console.log('Callback params:', { 
            hasCode: !!code, 
            error: error, 
            state: state 
        });

        if (error) {
            console.error('Google OAuth error:', error);
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin?error=google_auth_failed&details=${error}`);
        }

        if (!code) {
            console.error('No authorization code received');
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin?error=no_code`);
        }

        // Optional: Verify state parameter for security
        if (state && state !== 'google_oauth_state') {
            console.error('Invalid state parameter:', state);
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin?error=invalid_state`);
        }

        // Get base URL
        const baseUrl = process.env.NEXTAUTH_URL || 
                       (process.env.NODE_ENV === 'production' 
                        ? 'https://banglavoice.ai' 
                        : 'http://localhost:3000');

        const redirectUri = `${baseUrl}/api/auth/google/callback`;

        console.log('Token exchange config:', {
            clientId: process.env.GOOGLE_CLIENT_ID ? 'Present' : 'Missing',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Present' : 'Missing',
            redirectUri: redirectUri
        });

        // Exchange code for token
        console.log('Exchanging authorization code for access token...');
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
            }),
        });

        const tokens = await tokenResponse.json();
        console.log('Token response status:', tokenResponse.status);
        console.log('Token response:', { 
            hasAccessToken: !!tokens.access_token,
            error: tokens.error,
            errorDescription: tokens.error_description
        });

        if (!tokens.access_token) {
            console.error('Token exchange failed:', tokens);
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin?error=token_exchange_failed&details=${tokens.error || 'unknown'}`);
        }

        // Get user info from Google
        console.log('Fetching user information from Google...');
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        const googleUser = await userResponse.json();
        console.log('Google user response:', { 
            status: userResponse.status,
            hasEmail: !!googleUser.email,
            hasName: !!googleUser.name,
            email: googleUser.email
        });

        if (!googleUser.email) {
            console.error('No user email received from Google');
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin?error=no_user_info`);
        }

        // Check if user exists in database
        console.log('Checking if user exists in database:', googleUser.email);
        let dbUser = await prisma.user.findUnique({
            where: { email: googleUser.email }
        });

        if (!dbUser) {
            // Create new Google user
            console.log('Creating new Google user:', googleUser.email);
            
            dbUser = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    name: googleUser.name || googleUser.email.split('@')[0],
                    image: googleUser.picture,
                    emailVerified: new Date(),
                    credits: 100,
                    subscriptionStatus: 'free',
                    isActive: true,
                    accountStatus: 'active',
                    preferences: {
                        emailNotifications: true,
                        autoDownload: false
                    },
                    generationHistory: [],
                    billingHistory: [],
                    signupIp: "google-oauth",
                    lastLoginAt: new Date(),
                    password: null
                }
            });
            
            console.log('Google user created successfully with ID:', dbUser.id);
        } else {
            // Update existing user
            console.log('Updating existing Google user:', dbUser.id);
            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    image: googleUser.picture || dbUser.image,
                    name: googleUser.name || dbUser.name,
                    lastLoginAt: new Date(),
                    emailVerified: dbUser.emailVerified || new Date()
                }
            });
            console.log('Google user updated successfully');
        }

        // Generate JWT token for localStorage
        console.log('Generating JWT token for user:', dbUser.id);
        const token = generateToken(dbUser.id);

        // Create user data for localStorage
        const userData = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
            credits: dbUser.credits,
            subscriptionStatus: dbUser.subscriptionStatus,
            isAdmin: dbUser.email === 'shoesizeconvert@gmail.com' || dbUser.email === 'banglavoiceai@gmail.com',
            authType: 'google'
        };

        console.log('User data prepared:', { 
            id: userData.id, 
            email: userData.email, 
            isAdmin: userData.isAdmin 
        });

        // Redirect to frontend with token and user data in URL params
        const redirectUrl = new URL(`${process.env.NEXTAUTH_URL}/signin`);
        redirectUrl.searchParams.set('token', token);
        redirectUrl.searchParams.set('userData', btoa(JSON.stringify(userData)));
        redirectUrl.searchParams.set('from', 'google');
        redirectUrl.searchParams.set('success', '1');

        console.log('Redirecting to frontend with auth data');
        console.log('Final redirect URL:', redirectUrl.toString());
        
        return NextResponse.redirect(redirectUrl.toString());

    } catch (error) {
        console.error('Google OAuth callback error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signin?error=oauth_callback_error&details=${encodeURIComponent(error.message)}`);
    } finally {
        if (process.env.NODE_ENV === 'production') {
            await prisma.$disconnect();
        }
    }
}

// Also handle POST requests for manual callback processing
export async function POST(req) {
    console.log('Google OAuth POST callback received');
    
    try {
        const { code } = await req.json();
        console.log('POST callback with code:', !!code);

        if (!code) {
            return NextResponse.json({ error: 'Authorization code required' }, { status: 400 });
        }

        const baseUrl = process.env.NEXTAUTH_URL || 
                       (process.env.NODE_ENV === 'production' 
                        ? 'https://yourdomain.com' 
                        : 'http://localhost:3000');

        // Exchange code for token (same logic as GET)
        console.log('POST: Exchanging code for token...');
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `${baseUrl}/api/auth/google/callback`,
            }),
        });

        const tokens = await tokenResponse.json();
        console.log('POST: Token exchange result:', !!tokens.access_token);

        if (!tokens.access_token) {
            console.error('POST: Token exchange failed:', tokens);
            return NextResponse.json({ 
                error: 'Failed to exchange code for token',
                details: tokens.error_description 
            }, { status: 400 });
        }

        // Get user info from Google
        console.log('POST: Fetching user info...');
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        const googleUser = await userResponse.json();
        console.log('POST: Google user info received:', !!googleUser.email);

        if (!googleUser.email) {
            return NextResponse.json({ error: 'Failed to get user information' }, { status: 400 });
        }

        // Check if user exists in database
        let dbUser = await prisma.user.findUnique({
            where: { email: googleUser.email }
        });

        if (!dbUser) {
            // Create new Google user
            console.log('POST: Creating new user:', googleUser.email);
            dbUser = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    name: googleUser.name || googleUser.email.split('@')[0],
                    image: googleUser.picture,
                    emailVerified: new Date(),
                    credits: 100,
                    subscriptionStatus: 'free',
                    isActive: true,
                    accountStatus: 'active',
                    preferences: {
                        emailNotifications: true,
                        autoDownload: false
                    },
                    generationHistory: [],
                    billingHistory: [],
                    signupIp: "google-oauth",
                    lastLoginAt: new Date(),
                    password: null
                }
            });
        } else {
            // Update existing user
            console.log('POST: Updating existing user:', dbUser.id);
            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    image: googleUser.picture || dbUser.image,
                    name: googleUser.name || dbUser.name,
                    lastLoginAt: new Date(),
                    emailVerified: dbUser.emailVerified || new Date()
                }
            });
        }

        // Generate JWT token
        const token = generateToken(dbUser.id);
        
        // Remove sensitive data
        const { password, resetCode, resetCodeExpiry, verificationCode, verificationCodeExpiry, signupIp, ...userWithoutPassword } = dbUser;

        console.log('POST: Success, returning auth data');
        return NextResponse.json({
            message: 'Google authentication successful!',
            token,
            user: {
                ...userWithoutPassword,
                isAdmin: userWithoutPassword.email === 'shoesizeconvert@gmail.com' || userWithoutPassword.email === 'banglavoiceai@gmail.com'
            }
        });

    } catch (error) {
        console.error('Google OAuth POST callback error:', error);
        return NextResponse.json({ 
            error: 'Google authentication failed',
            details: error.message 
        }, { status: 500 });
    } finally {
        if (process.env.NODE_ENV === 'production') {
            await prisma.$disconnect();
        }
    }
}

