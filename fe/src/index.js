import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./Context/AuthContext";
import { ColorModeScript } from '@chakra-ui/react'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthContextProvider>
      <ChakraProvider>
        <BrowserRouter>
        <ColorModeScript initialColorMode={"light"} />
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </AuthContextProvider>
  </>
);
