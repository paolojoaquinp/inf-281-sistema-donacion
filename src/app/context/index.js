'use client'
import { AuthProvider } from "./auth";
import { AlertProvider } from "./alert";
import { ModalProvider } from "./modal";
import { NotificationProvider } from "./chat/NotificationContext";
import { SocketProvider } from "./socketContext";

export function Providers({ children }) {
  return (
    <SocketProvider>
      <NotificationProvider>
        <AlertProvider>
          <ModalProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ModalProvider>
        </AlertProvider>
      </NotificationProvider>
    </SocketProvider>
  );
}