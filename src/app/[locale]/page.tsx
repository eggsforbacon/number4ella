"use client";

import {useStore} from "@/store/store";
import {getRandomInt} from "@/utils";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import Mailbox from "@/components/letters/mailbox";
import Letter from "@/components/letters/letter";

export default function Home() {

    const {mailboxRead, setMailboxOpen} = useStore();
    const [term, setTerm] = useState<string>("");
    const t = useTranslations("Home");

    const randomEndearment = () => {
        const endearmentTerms = ["Love", "my Love",
            "Honey", "Bug", "my Bug", "Superman", "Lovely",
            "Sweetheart", "Baby", "my Baby", "Babe",
            "my Heart", "my Silly Billy", "Dear",
            "my Dear", "Vida", "mi Vida",
            "Corazón", "mi Corazón",
            "Corazoncito", "Amor", "mi Amor",
            "Amorcito", "Cariño", "Cariño mío",
            "mi Cariñito", "4 Words",
            "Light of my life"];
        return endearmentTerms[getRandomInt(endearmentTerms.length)];
    }

    useEffect(() => {
        if (window !== undefined && typeof window !== "undefined") {
            const selectedTerm = randomEndearment();
            setTerm(selectedTerm);
        }
    }, []);

return (
    <main
        className="relative flex-col gap-6 pt-[20vh] lg:pt-0 pb-6 text-center items-center justify-start lg:justify-center w-full min-h-screen">
        <div className="max-w-172 flex flex-col items-center justify-center gap-4">
            <h1 className="sticky z-30 pt-6 pb-2 top-0 bg-forest-green-800 w-full text-5xl font-barriecito text-amber-100">{t("title")}</h1>
            <p className="font-nunito text-white/80 px-6">{t("copy", {term})}<br/><br/>{t("cta")}
            </p>
            <div className="relative flex flex-col items-center justify-start">
                <span className="absolute inline-flex h-full w-full opacity-75"/>
                <span
                    className={`absolute left-1/2 -translate-x-1/2 bg-amber-100 h-6 w-3/4 ${mailboxRead ? "-bottom-1 transition-all duration-200 ease-in-out peer-hover:-translate-y-3" : "-bottom-6 animate-bounce"}`}/>
                <button
                    onClick={() => setMailboxOpen(true)}
                    className="font-bold peer cursor-pointer relative px-6 py-4 rounded-sm bg-neutral-300 text-crimson-300 text-xl font-barrio">{t("mailbox")}
                </button>
            </div>
            <Link href={"/number"}
                  className="mt-6 max-w-58 inline-flex items-center justify-center w-full text-center font-bold cursor-pointer relative p-4 rounded-xl text-amber-100 border border-forest-green-400 text-lg font-barriecito transition-all duration-200 ease-in-out hover:bg-forest-green-400">
                {t("number")}
            </Link>
        </div>
        <Link href="/sweden" className="text-sm absolute left-7 lg:left-auto bottom-17 lg:right-17 text-forest-green-700 rounded-full aspect-square h-6 border border-forest-green-700">17</Link>
        <Mailbox/>
        <Letter />
    </main>
);
}
