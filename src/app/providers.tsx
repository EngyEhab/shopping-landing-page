"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider
        toastProps={{
          color: "success",
          variant: "flat",
          hideIcon: true,
          classNames: {
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />
      {children}
    </HeroUIProvider>
  );
}
