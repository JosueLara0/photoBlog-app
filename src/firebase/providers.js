//* libraries
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
//* firebase
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };

    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
};


export const signInWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, uid } = result.user;

        // Update displayName user in firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };

    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
};


export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, uid, displayName } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };
    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
};


export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};