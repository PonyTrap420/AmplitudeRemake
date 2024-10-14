import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import '@mantine/core/styles.css';

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import MainLayout from "./mainLayout";

export const metadata: Metadata = {
  title:'Amplitude',
  applicationName:'Amplitude',
  creator:'PonyTrap'
}

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const theme = createTheme({
  fontFamily:'roboto',
  primaryColor: 'dark',
  primaryShade:{dark:5}
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{height:'100%'}}>
      <head><ColorSchemeScript defaultColorScheme="dark"/></head>
      <body style={{minHeight:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <MantineProvider theme={theme} forceColorScheme="dark">
        <MainLayout>
         {children}
        </MainLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
