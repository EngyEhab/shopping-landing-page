"use client";

import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFilters";
import { Button } from "@heroui/react";
import { ExclamationTriangleIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useDisclosure } from "@heroui/react";
import FiltersModal from "@/components/FiltersModal";
import { useProducts } from "@/context/ProductsContext";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { currentProducts } = useProducts();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-4 lg:mx-28">
        <div className="hidden lg:block lg:col-span-1">
          <h1 className="text-2xl font-bold col-span-full">Filters</h1>
          <div className="m-2">
            <SidebarFilters />
          </div>
        </div>
        <div className="col-span-full lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">Products</h1>
            <Button
              onPress={onOpen}
              className="lg:hidden rounded-sm"
              variant="bordered"
              color="default"
            >
              <p>Filters</p>
              <FunnelIcon className="w-5 h-5" />
            </Button>
          </div>
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <>
              <div className="col-span-full flex flex-col gap-2 justify-center items-center h-[calc(100vh-10rem)]">
                <ExclamationTriangleIcon className="w-12 h-12 text-warning-300" />
                <p className="text-default-500">No products found</p>
              </div>
            </>
          )}
        </div>
      </div>
      {isOpen && <FiltersModal isOpen={isOpen} onOpenChange={onOpenChange} />}
    </>
  );
}
