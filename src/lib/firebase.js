// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';

// Replace these config values with your actual Firebase project config
const firebaseConfig = {
  YOUR_FIREBASE_KEY
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
export const auth = getAuth(app);

// Initialize Realtime Database service
export const db = getDatabase(app);

// Generate random operator ID
function generateOperatorId() {
  // Example: OP + 6 random digits
  return 'OP' + Math.floor(100000 + Math.random() * 900000);
}

// Sign up function (Realtime DB)
export async function signUp(email, password, name, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update user profile with display name
    await updateProfile(userCredential.user, { displayName: name });
    // Generate operatorId if role is operator
    let operatorId = null;
    if (role === 'operator') {
      operatorId = generateOperatorId();
    }
    // Store user role and operatorId in Realtime Database
    await set(ref(db, 'users/' + userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      name,
      role,
      id: operatorId, // Will be null for admin, set for operator
      numberOfTasksCompleted: 0, // New field for operator experience
      level: 1 // New field for operator experience
    });
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// Sign in function
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// Reset password function
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fetch user role by UID (Realtime DB)
export async function getUserRole(uid) {
  try {
    const snapshot = await get(child(ref(db), 'users/' + uid));
    if (snapshot.exists()) {
      return { role: snapshot.val().role, error: null };
    } else {
      return { role: null, error: 'User not found' };
    }
  } catch (error) {
    return { role: null, error: error.message };
  }
}

// Fetch user profile by UID (Realtime DB)
export async function getUserProfile(uid) {
  try {
    const snapshot = await get(child(ref(db), 'users/' + uid));
    if (snapshot.exists()) {
      return { profile: snapshot.val(), error: null };
    } else {
      return { profile: null, error: 'User not found' };
    }
  } catch (error) {
    return { profile: null, error: error.message };
  }
}

// Update operator level based on number of tasks completed
export async function updateOperatorLevel(uid, numberOfTasksCompleted) {
  let level = 1;
  if (numberOfTasksCompleted >= 15) level = 3;
  else if (numberOfTasksCompleted >= 10) level = 2;
  // else level = 1 (beginner)
  await update(ref(db, 'users/' + uid), {
    numberOfTasksCompleted,
    level
  });
}

// Logout function
export async function logout() {
  try {
    await auth.signOut();
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
