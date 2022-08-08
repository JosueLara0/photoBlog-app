//* firebase
import { signInWithGoogle, signInWithEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase';
//* slices
import { checkingCredentials, logout, login } from './authSlice';
import { clearNoteLogout } from '../journal';
//* helpers
import { fixErrorMessage } from '../../helpers';

export const checkingAuthentication = () => {
    return async (dispatch) => dispatch(checkingCredentials());
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        if (!result.ok) {
            result.errorMessage = fixErrorMessage(result.errorMessage);
            return dispatch(logout(result));
        }

        dispatch(login(result));
    };
};

export const startEmailPasswordSignIn = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithEmailPassword({ email, password, displayName });

        if (!result.ok) {
            result.errorMessage = fixErrorMessage(result.errorMessage);
            return dispatch(logout(result));
        }

        dispatch(login(result));
    };
};

export const startEmailPasswordLogIn = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });

        if (!result.ok) {
            result.errorMessage = fixErrorMessage(result.errorMessage);
            return dispatch(logout(result));
        }

        dispatch(login(result));
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNoteLogout());
        dispatch(logout());
    };
};