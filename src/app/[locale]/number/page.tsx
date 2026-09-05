"use client";

import {useTranslations} from "next-intl";
import NumberPicker from "@/components/number-picker";
import React from "react";

export default function Number() {
    const t = useTranslations("Number");
    const h = useTranslations("Home");

    return (
        <main
            className="flex-col gap-6 pt-[20vh] lg:pt-0 pb-6 text-center items-center justify-start lg:justify-center w-full min-h-screen">
            <h1 className="sticky z-30 pt-6 pb-2 top-0 bg-forest-green-800 w-full text-5xl font-barriecito text-amber-100">{h("title")}</h1>
            <h2 className="sticky pt-6 pb-2 top-0 bg-forest-green-800 w-full text-4xl font-barriecito text-amber-100">{t("title")}</h2>
            <p className="font-nunito text-white/80 px-6 max-w-172">{
                t.rich("copy", {
                    span: (chunks) => <span className="font-barriecito">{chunks}</span>
                })}
            </p>
            <p className="px-16 text-xs font-barrio text-amber-100/60 max-w-172">{t("note")}</p>
            <NumberPicker/>
        </main>
    );
}