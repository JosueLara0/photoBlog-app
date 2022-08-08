//* providers
import { loginWithEmailPassword, signInWithGoogle, signInWithEmailPassword, logoutFirebase } from "../../../src/firebase/providers";
//* slices
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
//* thunks
import { checkingAuthentication, startEmailPasswordLogIn, startGoogleSignIn, startEmailPasswordSignIn, startLogout } from "../../../src/store/auth/thunk";
//* fixtures
import { demoUser } from "../../fixtures/authFixtures";

//* get firebase config and functions
jest.mock("../../../src/firebase/providers");

describe('Tests in checkingCredentials', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should call checkingCredentials', async () => {

        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn should call checkingCredentials and login - success', async () => {

        const loginData = { ok: true, ...demoUser };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn should call checkingCredentials and logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'Google error' };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    });

    test('startEmailPasswordSignIn should call checkingCredentials and login - success', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '2342', displayName: demoUser.displayName };

        await signInWithEmailPassword.mockResolvedValue(loginData);

        await startEmailPasswordSignIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startEmailPasswordSignIn should call checkingCredentials and logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'Google error' };
        const formData = { email: demoUser.email, password: '2342', displayName: demoUser.displayName };

        await signInWithEmailPassword.mockResolvedValue(loginData);

        await startEmailPasswordSignIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    });

    test('startEmailPasswordLogIn should call checkingCredentials and login - success', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '2342' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startEmailPasswordLogIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startEmailPasswordLogIn should call checkingCredentials and logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'Google error' };
        const formData = { email: demoUser.email, password: '2342' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startEmailPasswordLogIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));

    });

    test('startLogout should call logoutFirebase, clearNotes and logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});