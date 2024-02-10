import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./services/AuthService/AuthContext.jsx";
import theme from "./chakra-theme.jsx"; // Import your custom theme

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
