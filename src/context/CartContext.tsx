import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product } from "@/types/product";
import React, { createContext, useContext, useEffect, useState } from "react";
import { addToast } from "@heroui/toast";

type CartContextType = {
  currentCartItems: cartItem[];
  setCurrentCartItems: React.Dispatch<React.SetStateAction<cartItem[]>>;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
};

type cartItem = {
  item: Product;
  quantity: number;
};

const CartContext = createContext<CartContextType>({
  currentCartItems: [],
  setCurrentCartItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentCartItems, setCurrentCartItems] = useLocalStorage<cartItem[]>(
    "cartItems",
    []
  );

  const addToCart = (item: Product) => {
    const existingItem = currentCartItems.find(
      (cartItem) => cartItem.item.id === item.id
    );
    if (existingItem) {
      setCurrentCartItems([
        ...currentCartItems.filter((cartItem) => cartItem.item.id !== item.id),
        { item: { ...existingItem.item }, quantity: existingItem.quantity + 1 },
      ]);
    } else {
      setCurrentCartItems([...currentCartItems, { item, quantity: 1 }]);
    }
    addToast({
      title: "Product added to cart successfully",
    });
  };

  const removeFromCart = (item: Product) => {
    const existingItem = currentCartItems.find(
      (cartItem) => cartItem.item.id === item.id
    );
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCurrentCartItems(
          currentCartItems.filter((cartItem) => cartItem.item.id !== item.id)
        );
      } else {
        setCurrentCartItems([
          ...currentCartItems.filter(
            (cartItem) => cartItem.item.id !== item.id
          ),
          {
            item: { ...existingItem.item },
            quantity: existingItem.quantity - 1,
          },
        ]);
      }
    }
    addToast({
      title: "Product removed from cart successfully"
    });
  };

  return (
    <CartContext.Provider
      value={{
        currentCartItems,
        setCurrentCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
