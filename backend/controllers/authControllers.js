import {admin, auth, db} from '../database-config/database-config.js';
import querystring from 'querystring';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { OAuth2Client } from 'google-auth-library';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid'

dotenv.config();

const fetchToken = async (code) => {
  const url = 'https://oauth2.googleapis.com/token';
  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,

    grant_type: 'authorization_code',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:   
 new URLSearchParams(body),
  });

  if (!response.ok) {
    throw new Error(`Error fetching token: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Included in the authRoutes.js as the helper function
async function verifyGoogleIdToken(idToken) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    return null;
  }
}


// Signup Controller
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Create user with Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      emailVerified: false, // Set to true if you have email verification
      disabled: false,
    });

    await db.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      name: name,
      username: '',
      contact: '',
      collegeMail: '',
      isAlumni: false,
      isDeleted: false,
      profileUrl: '',
      college: '',
      year: null,
      semester: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Generate JWT Access Token
    const accessToken = generateAccessToken(userRecord.uid);

    const refreshToken = generateRefreshToken(uuidv4());

    await db.collection('users').doc(userRecord.uid).collection('refreshTokens').doc(refreshToken).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Set JWT in HttpOnly, Secure cookie
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 3600000, // 1 hour in milliseconds
      sameSite: 'strict',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 604800000, // 7 days in milliseconds
      sameSite: 'strict',
    });

    res.status(201).json({
      message: 'User created successfully!',
      email: userRecord.email,
      // accessToken, // Optionally remove this for enhanced security
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Firebase Authentication REST API to sign in with email and password
    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY; // Add your Firebase API Key to .env

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const { idToken, localId } = data;

    // Generate JWT Access Token
    const accessToken = generateAccessToken(localId);

    const refreshToken = generateRefreshToken(uuidv4());

    await db.collection('users').doc(localId).collection('refreshTokens').doc(refreshToken).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Set JWT in HttpOnly, Secure cookie
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour in milliseconds
      sameSite: 'strict',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 604800000, // 7 days in milliseconds
      sameSite: 'strict',
    })

    res.status(200).json({
      message: 'User logged in successfully!',
      email: email,
      // accessToken, // Optionally remove this for enhanced security
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};

const googleLogin = (req, res) => {
  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' ');

  const params = {
    response_type: 'code',
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    scope: scope,
    access_type: 'offline',
    prompt: 'consent',
  };

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(params)}`;

  console.log('authUrl', authUrl);

  res.redirect(authUrl);
};

const googleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    // Exchange authorization code for access token and ID token
    const tokenResponse = await fetchToken(code);

    const { id_token } = tokenResponse;

    if (!id_token) {
      return res.status(400).json({ error: 'ID token not provided' });
    }

    // Verify ID token with Google
    const decodedToken = await verifyGoogleIdToken(id_token);

    if (!decodedToken) {
      return res.status(400).json({ error: 'Invalid ID token' });
    }

    const { email, name, picture } = decodedToken;

    // Check if user exists in Firestore using email, if not, create
    const userRef = db.collection('users').where('email', '==', email).limit(1);
    const userSnapshot = await userRef.get();

    let userId;
    if (userSnapshot.empty) {
      // Create new user
      const newUserRef = await db.collection('users').add({
        email: email,
        name: name,
        username: '',
        contact: '',
        collegeMail: '',
        isAlumni: false,
        isDeleted: false,
        profileUrl: picture,
        college: '',
        year: null,
        semester: null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      userId = newUserRef.id;
    } else {
      userId = userSnapshot.docs[0].id;
    }

    // Generate JWT Access Token
    const accessToken = generateAccessToken(userId);

    const refreshToken = generateRefreshToken(uuidv4());

    await db.collection('users').doc(userId).collection('refreshTokens').doc(refreshToken).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Set JWT in HttpOnly, Secure cookie
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 3600000, // 1 hour in milliseconds
      sameSite: 'strict',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 604800000, // 7 days in milliseconds
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Google login successful',
      name: name,
      email: email,
      // token: accessToken, // Optionally remove this for enhanced security
    });
  } catch (error) {
    console.error('Error during Google OAuth callback:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  const { uid } = req.user;
  const { refreshToken } = req.cookies;

  try {
    if (refreshToken) {
      // Remove the specific refresh token from Firestore
      await db.collection('users').doc(uid).collection('refreshTokens').doc(refreshToken).delete();
    }

    // Clear cookies
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'User logged out successfully!' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }

  try {
    // Find user by refresh token
    const userQuery = await db.collection('users')
      .where('refreshTokens', 'array-contains', refreshToken)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const userDoc = userQuery.docs[0];
    const uid = userDoc.id;

    const newAccessToken = generateAccessToken(uid);

    const newRefreshToken = generateRefreshToken(uuidv4());

    const userRef = db.collection('users').doc(uid).collection('refreshTokens').doc(refreshToken);
    const refreshTokenDoc = await userRef.get();

    if (!refreshTokenDoc.exists) {
      return res.status(403).json({ error: 'Refresh token not found' });
    }

    // Delete old refresh token
    await userRef.delete();

    // Add new refresh token
    await db.collection('users').doc(uid).collection('refreshTokens').doc(newRefreshToken).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Set new Access Token in cookie
    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      sameSite: 'strict',
    });

    // Set new Refresh Token in cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 3600000, // 7 days
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { signup, login, googleLogin, googleCallback, logout, refreshToken };
