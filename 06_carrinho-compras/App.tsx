import { RootSiblingParent } from "react-native-root-siblings";
import Routes from "./src/routes";
import React from "react";
import { UserProvider } from "./src/contexts/UserContext";
import { CartContextProvider } from "./src/contexts/CartContext";

export default function App() {
  return (
    <CartContextProvider>
      <RootSiblingParent>
        <UserProvider>
          <Routes />
        </UserProvider>
      </RootSiblingParent>
    </CartContextProvider>
  );
}
