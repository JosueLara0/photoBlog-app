//* libraries
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
//* fixtures
import { notAuthenticatedState } from "../../fixtures/authFixtures";
//* slices
import { authSlice } from "../../../src/store/auth/authSlice";
//* components
import { LoginPage } from "../../../src/auth/pages/LoginPage/LoginPage";

const mockStartGoogleSignIn = jest.fn();
const mockStartEmailPasswordLogIn = jest.fn();

jest.mock("../../../src/store/auth/thunk", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startEmailPasswordLogIn: ({ email, password }) => {
    return () => mockStartEmailPasswordLogIn({ email, password });
  },
}));

//* change functionality of dispatch in react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Tests in <LoginPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  // test("should render component", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <LoginPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  // });

  // test("Google button should call startGoogleSingIn", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <LoginPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const googleBtn = screen.getByLabelText("google-btn");
  //   fireEvent.click(googleBtn);
  //   expect(mockStartGoogleSignIn).toHaveBeenCalled();
  // });

  test("Form submit should call startLoginWithEmailPassword", () => {
    const email = "email@email.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "Email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "Password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect(mockStartEmailPasswordLogIn).toHaveBeenCalled();

    // expect(mockStartEmailPasswordLogIn).toHaveBeenCalledWith({
    //   email: email,
    //   password: password,
    // });
  });
});
