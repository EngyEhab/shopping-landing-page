import React, { useState } from "react";

import { Form, Button, Slider, Divider } from "@heroui/react";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import products from "../data/products.json";
import { Product } from "@/types/product";
import { useProducts } from "@/context/ProductsContext";

export default function Filters() {
  const { filterProducts } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [value, setValue] = useState<number[]>([100, 300]);

  const handleCheckboxChange = (values: string[]) => {
    setSelectedCategories(values);
  };

  const handleSliderChange = (newValue: number | number[]) => {
    setValue(Array.isArray(newValue) ? newValue : [newValue]);
  };
  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected categories:", selectedCategories);
    console.log("Selected price range:", value);
    filterProducts(selectedCategories, value);
  };

  const categories = [
    ...new Set(products?.map((product: Product) => product.category)),
  ];

  return (
    <Form className="w-full max-w-xs mt-4" onSubmit={onSubmit}>
      <CheckboxGroup
        label="Categories"
        color="secondary"
        value={selectedCategories}
        onChange={handleCheckboxChange}
        classNames={{
          label: "text-black font-bold",
        }}
      >
        {categories?.map((category) => (
          <Checkbox key={category} value={category}>
            {category}
          </Checkbox>
        ))}
      </CheckboxGroup>

      <Divider className="my-4" />

      <Slider
        className="max-w-md"
        color="secondary"
        formatOptions={{ style: "currency", currency: "USD" }}
        label="Price Range"
        maxValue={1000}
        minValue={0}
        step={10}
        name="price"
        value={value}
        onChange={handleSliderChange}
        classNames={{
          label: "text-black font-bold",
        }}
      />

      <Button type="submit" color="secondary" className="w-1/2 rounded-sm text-white mt-4">
        Apply
      </Button>
    </Form>
  );
}
