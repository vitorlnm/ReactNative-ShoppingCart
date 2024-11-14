// CartContext.tsx

import { ReactNode, createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICartItem, ProductDTO } from "../types/Product";
import { showError } from "../utils/Toast";

type CartContextProps = {
  cart: ICartItem[];
  getCart: () => void;
  addProduct: (product: ProductDTO, quantity?: number) => void;
  removeProduct: (id: number) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const storeCart = async (value: ICartItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue);
    } catch (error) {
      showError("Não foi possível salvar o carrinho");
    }
  };

  const getCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart");
      const cartData = jsonValue !== null ? JSON.parse(jsonValue) : [];
      setCart(cartData);
    } catch (error) {
      showError("Não foi possível recuperar o carrinho");
    }
  };

  const addProduct = (product: ProductDTO, quantity: number = 1) => {
    const existingProduct = cart.find(({ product: p }) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      storeCart(updatedCart);
    } else {
      const updatedCart = [...cart, { product, quantity }];
      setCart(updatedCart);
      storeCart(updatedCart);
    }
  };

  const removeProduct = (id: number) => {
    const updatedCart = cart.filter((c) => c.product.id !== id);
    setCart(updatedCart);
    storeCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, getCart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};
