import {admin, auth, db} from '../database-config/database-config.js';
import redisClient from '../database-config/redis-client.js';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

// Helper function to generate JWT
const generateAccessToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Ensure you set JWT_SECRET in .env
};

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

    // Add additional user data to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      name: name,
      profileUrl: '', // Placeholder for future use
      college: '', // Placeholder for future use
      year: null, // Placeholder for future use
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Generate JWT Access Token
    const accessToken = generateAccessToken(userRecord.uid);

    // Store access token in Redis with expiration (matching JWT)
    await redisClient.setEx(userRecord.uid, 3600, accessToken); // 3600 seconds = 1 hour

    res.status(201).json({
      message: 'User created successfully!',
      email: userRecord.email,
      uid: userRecord.uid,
      accessToken,
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

    // Store access token in Redis with expiration
    await redisClient.setEx(localId, 3600, accessToken); // 1 hour

    res.status(200).json({
      message: 'User logged in successfully!',
      email: email,
      uid: localId,
      accessToken,
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

    console.log('code', code);
    

    const tokenResponse = await fetchToken(code);

    console.log('tokenResponse', tokenResponse);

    const { id_token } = tokenResponse;

    if (!id_token) {
      return res.status(400).json({ error: 'ID token not provided' });
    }

    // Verify ID token with Firebase Admin SDK
    const decodedToken = await verifyGoogleIdToken(id_token);

    if (!decodedToken) {
      return res.status(400).json({ error: 'Invalid ID token' });
    }

    console.log('decodedToken', decodedToken);  
    const { email, name, picture } = decodedToken;

    // Check if user exists in Firestore, if not, create
    const userRef = db.collection('users').where('email', '==', email).limit(1);
    let userDoc = await userRef.get();

    if (!userDoc.exists) {
      userDoc = await db.collection('users').add({
        email,
        name,
        profileUrl: picture,
        college: '',
        year: null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // Generate your own JWT for session management
    const customToken = generateAccessToken(userDoc.uid);

    res.status(200).json({ 
      message: 'Google login successful',
      name: name,
      email: email,
      token: customToken 
    });
  } catch (error) {
    console.error('Error during Google OAuth callback:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export { signup, login, googleLogin, googleCallback };
