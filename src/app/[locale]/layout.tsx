import type { Metadata } from "next";
import {
  Barriecito,
  Barrio,
  Nunito,
  Explora,
  Autour_One,
  Cutive_Mono,
} from "next/font/google";
import "./../globals.css";
import React from "react";
import { NextIntlClientProvider } from "next-intl";

const cutiveMono = Cutive_Mono({
  weight: "400",
  variable: "--font-cutive-mono",
});

const autourOne = Autour_One({
  weight: "400",
  variable: "--font-autour-one",
});

const explora = Explora({
  weight: ["400"],
  variable: "--font-explora",
});

const barriecito = Barriecito({
  variable: "--font-barriecito",
  subsets: ["latin"],
  weight: "400",
});

const barrio = Barrio({
  variable: "--font-barrio",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Number4Ella",
  description:
    "A website I made for my girlfriend, aching with the terrifying prospect of not being able to be there at all times, and coming up with a way in which I can.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`${nunito.variable} ${barriecito.variable} ${explora.variable} ${barrio.variable} ${autourOne.variable} ${cutiveMono.variable} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
