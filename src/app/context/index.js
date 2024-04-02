'use client'
import { AuthProvider } from "./auth";
import { AlertProvider } from "./alert";
import { ModalProvider } from "./modal";


export function Providers({ children }) {
  return (
    <AlertProvider>
      <ModalProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ModalProvider>
    </AlertProvider>
  );
}