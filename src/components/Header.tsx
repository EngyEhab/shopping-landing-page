import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Badge,
} from "@heroui/react";

import { Button, useDisclosure } from "@heroui/react";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartDrawer from "./CartDrawer";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { searchProducts } = useProducts();
  const { currentCartItems } = useCart();

  return (
    <Navbar
      isBordered
      classNames={{
        base: "justify-between lg:px-20",
      }}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="flex items-center gap-1">
          <ShoppingBagIcon className="w-5 h-5" />
          <p className="font-bold pt-1">ENGY</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          onChange={(e) => searchProducts(e.target.value)}
        />
        <Badge color="secondary" className={`${currentCartItems.filter((item) => item.quantity > 0).length === 0 && "hidden"}`} content={currentCartItems.filter((item) => item.quantity > 0).reduce((total, item) => total + item.quantity, 0).toString()}>
          <Button
            aria-label="Cart"
            onPress={onOpen}
            isIconOnly
            className="bg-transparent"
          >
            <ShoppingCartIcon />
          </Button>
        </Badge>
        <CartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
      </NavbarContent>
    </Navbar>
  );
}
