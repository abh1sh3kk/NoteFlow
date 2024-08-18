import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import "./redux/store"
import { store } from "./redux/store";
import RootLayout from "./layouts/RootLayout/RootLayout";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <Provider store={store}>
    <RootLayout />
  </Provider>
);
