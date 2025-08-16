import React, { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Divider,
  Image,
} from "@heroui/react";

import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useCart } from "@/context/CartContext";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CartDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { currentCartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    console.log(currentCartItems);
  }, [currentCartItems]);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="py-4 ps-4" classNames={
      {
        closeButton: "me-4 mt-2"
      }
    }>
      <DrawerContent>
        {(onClose) =>
          currentCartItems.filter((item) => item.quantity > 0).length === 0 ? (
            <>
              <div className="flex flex-col gap-2 justify-center items-center h-full">
                <ExclamationTriangleIcon className="w-12 h-12 text-warning-300" />
                <p className="text-default-500">Cart is empty</p>
              </div>
            </>
          ) : (
            <>
              <DrawerHeader className="flex flex-col gap-1 ms-2">
                <p>Cart</p>
              </DrawerHeader>
              <DrawerBody>
                {currentCartItems.map((item) => (
                  <div key={item.item.id} className="flex gap-2">
                    <Image
                      alt={item.item.name}
                      className="object-cover w-12 h-12"
                      radius="sm"
                      shadow="sm"
                      src={`/assets/images/${item.item.image}`}
                      loading="lazy"
                    />
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <p>{item.item.name}</p>
                        <p className="text-default-500">${item.item.price}</p>
                      </div>
                      <div className=" flex gap-2 items-center">
                        <Button
                          onPress={() => removeFromCart(item.item)}
                          isIconOnly
                          className="bg-transparent"
                        >
                          <MinusIcon className="text-secondary w-4 h-4" />
                        </Button>
                        <div>{item.quantity}</div>
                        <Button
                          onPress={() => addToCart(item.item)}
                          isIconOnly
                          className="bg-transparent"
                        >
                          <PlusIcon className="text-secondary w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Divider />
                <div className="flex justify-between">
                  <p className="font-bold">Total:</p>
                  <p className="text-default-500">
                    $
                    {currentCartItems.reduce(
                      (total, item) => total + item.item.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color="secondary"
                  className="rounded-sm text-white w-full"
                  onPress={onClose}
                >
                  Purchase
                </Button>
              </DrawerFooter>
            </>
          )
        }
      </DrawerContent>
    </Drawer>
  );
}
