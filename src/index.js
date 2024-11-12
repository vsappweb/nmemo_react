import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./i18n";
// import { CircularProgress } from "@mui/material";
import { Triangle } from "react-loader-spinner";

const root = ReactDOM.createRoot(document.getElementById("root"));

disableReactDevTools();

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Suspense
        fallback={
          <div
            className="loading"
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "30px",
            }}
          >
            {/* <CircularProgress color="inherit" /> */}
            <Triangle
              visible={true}
              height="40"
              width="40"
              strokeWidth="5"
              color="var(--cText)"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass="loadingTriangle"
            />
            Loading...
          </div>
        }
      >
        <App />
      </Suspense>
    </AuthContextProvider>
  </React.StrictMode>
);
