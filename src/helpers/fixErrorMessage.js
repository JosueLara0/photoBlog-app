export const fixErrorMessage = (message) => {

    //* Login error messages
    if (message === 'Firebase: Error (auth/wrong-password).' || message === 'Firebase: Error (auth/user-not-found).') {
        return 'Wrong email or password, try again.';
    }

    if (message === 'Firebase: Error (auth/invalid-email).') {
        return 'Invalid email, try again.';
    }

    //* Register error messages
    if (message === 'Firebase: Error (auth/email-already-in-use).') {
        return 'There is already a user with this email, try with another one.';
    }

    return 'An error has occurred, please try again';
};

