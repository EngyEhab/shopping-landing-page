import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody
} from "@heroui/react";
import Filters from "./Filters";

export default function FiltersModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
          <ModalBody>
            <Filters />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
