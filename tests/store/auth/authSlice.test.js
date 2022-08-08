//* store slices
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
//* fixtures
import { initialState, demoUser, authenticatedState } from "../../fixtures/authFixtures";

describe('Tests in authSlice', () => {
    test('should return initialState and it should have the name auth', () => {

        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('should realize the login', () => {

        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: "authenticated",
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('should realize the logout without arguments', () => {

        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual({
            status: "not-authenticated",
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('should realize the logout and return an error message', () => {

        const errorMessage = 'Invalid Credentials';

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));

        expect(state).toEqual({
            status: "not-authenticated",
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('should change state to checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });
});