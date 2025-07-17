import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./compnonents/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
    {/* <ScrollToTop/> */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </StrictMode>,
);
