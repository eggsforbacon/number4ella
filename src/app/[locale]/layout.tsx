import type {Metadata} from "next";
import {Barriecito, Barrio, Nunito, Fleur_De_Leah} from "next/font/google";
import "./../globals.css";
import React from "react";
import {NextIntlClientProvider} from "next-intl";

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

const fleurDeLeah = Fleur_De_Leah({
    variable: "--font-fleur-de-leah",
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
    title: "Number4Ella",
    description: "A website I made for my girlfriend, aching with the terrifying prospect of not being able to be there at all times, and coming up with a way in which I can.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-US">
        <body
            className={`${nunito.variable} ${barrio.variable} ${barriecito.variable} ${fleurDeLeah.variable} antialiased`}
        >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </body>
        </html>
    );
}
