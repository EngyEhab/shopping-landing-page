import { Product } from "@/types/product";
import React, { createContext, useContext, useState } from "react";
import products from "../data/products.json";

type ProductsContextType = {
	currentProducts: Product[];
	setCurrentProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	searchProducts: (searchTerm: string) => void;
	filterProducts: (category: string[], price: number[]) => void;
};

const ProductsContext = createContext<ProductsContextType>({
	currentProducts: [],
	setCurrentProducts: () => {},
	searchProducts: () => {},
	filterProducts: () => {},
});

export const useProducts = () => useContext(ProductsContext);

export default function ProductsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

	const searchProducts = (searchTerm: string) => {
		const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setCurrentProducts(filteredProducts);
	};

	const filterProducts = (category: string[], price: number[]) => {
		console.log(category);
		if (category.length > 0) {
		const filteredProducts = products.filter(
			(product) =>
			category.includes(product.category) &&
			product.price >= price[0] &&
			product.price <= price[1]
		);
		setCurrentProducts(filteredProducts);
		} else {
		const filteredProducts = products.filter(
			(product) => product.price >= price[0] && product.price <= price[1]
		);
		setCurrentProducts(filteredProducts);
		}
	};

	return (
		<ProductsContext.Provider
			value={{
				currentProducts,
				setCurrentProducts,
				searchProducts,
				filterProducts,
			}}
		>
		{children}
		</ProductsContext.Provider>
	);
}
