//* libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
//* redux store
import { store } from "./store";
//* apps
import { BlogApp } from "./BlogApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BlogApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
