import React from "react";

import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ item }: { item: Product }) {
    const { addToCart } = useCart();
    return (
    <Card
      key={item.id}
      shadow="sm"
    >
      <CardBody className="overflow-visible p-3">
        <Image
          alt={item.name}
          className="w-full object-cover h-52"
          radius="lg"
          shadow="sm"
          src={`/assets/images/${item.image}`}
          width="100%"
          loading="lazy"
        />
      </CardBody>
      <CardFooter className="text-small justify-between flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <b>{item.name}</b>
          <p className="text-default-500">${item.price}</p>
        </div>
        <Button onPress={() => addToCart(item)} color="secondary" className="w-full rounded-sm text-white">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
