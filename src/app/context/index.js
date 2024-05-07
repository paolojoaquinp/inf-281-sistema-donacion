'use client'
import { AuthProvider } from "./auth";
import { AlertProvider } from "./alert";
import { ModalProvider } from "./modal";
import { CartProvider } from "./cart";
export function Providers({ children }) {
  return (
    <CartProvider>      
      <AlertProvider>
        <ModalProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ModalProvider>
      </AlertProvider>
    </CartProvider>
  );
}