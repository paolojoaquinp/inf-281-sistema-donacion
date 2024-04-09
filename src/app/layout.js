'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
            <AnimatePresence>
              {children}
            </AnimatePresence>
        </Layout>
      <footer className='footer'>
          <div style={{ backgroundColor: '#282c34', color: 'white', padding: '10px' }}>
              <h1>Sistema de donaciones</h1>
              <p>© 2024 Sistema de donaciones</p>
              <p>
                  Follow us on:
                  <a href="https://www.facebook.com/yourcompany" style={{ color: 'white', marginLeft: '10px' }}>Facebook</a>,
                  <a href="https://www.twitter.com/yourcompany" style={{ color: 'white', marginLeft: '10px' }}>Twitter</a>,
                  <a href="https://www.instagram.com/yourcompany" style={{ color: 'white', marginLeft: '10px' }}>Instagram</a>
              </p>
          </div>
      </footer>
      </body>
    </html>
  );
}
