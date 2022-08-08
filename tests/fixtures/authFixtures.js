export const initialState = {
    status: "checking", // "checking" , "not-authenticated" , "authenticated"
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authenticatedState = {
    status: "authenticated",
    uid: '1234ffs',
    email: 'demo@email.com',
    displayName: 'demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null
};

export const notAuthenticatedState = {
    status: "not-authenticated",
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const demoUser = {
    uid: '1234ffs',
    email: 'demo@email.com',
    displayName: 'demo user',
    photoURL: 'https://demo.jpg',
};