"use client";

import React, {useState} from "react";
import {Link, useRouter} from "@/i18n/navigation";
import {useLetters} from "@/store/letters";
import {useTranslations} from "next-intl";

export default function Sweden () {
    const [password, setPassword] = useState<string>("");
    const [hint, setHint] = useState<string>("");
    const router = useRouter();
    const {today} = useLetters();
    const t = useTranslations("Sweden");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (hint !== "") setHint("");
        setPassword(e.target.value);
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_SWEDEN_P) {
            router.push("/gallery");
        } else {
            setPassword("");
            setHint(t("hint"));
        }
    }

    return (
        <main className="relative flex-col gap-6 pt-[20vh] lg:pt-0 pb-6 text-center items-center justify-start lg:justify-center w-full min-h-screen bg-black">
            <form className="flex flex-col items-center justify-center gap-6" onSubmit={e => handleSubmit(e)}>
                <input placeholder={"18. Aug. 1990"} type={"password"} value={password}
                       onChange={(e) => handleChange(e)}
                       className="w-full border-b-2 border-b-neutral-500 px-6 py-2 text-amber-100 placeholder:text-neutral-500 transition-all duration-300 ease-in-out active:outline-0 active:ring-0"/>
                <p className="text-red-500 text-sm">{hint}</p>
                <input type={"submit"} value={t("confirm")} className="text-amber-100 rounded border border-amber-100 px-6 py-2 w-full transition-all duration-200 ease-in-out hover:bg-amber-100 hover:font-bold hover:text-black cursor-pointer"/>
                <Link href={"/"} className="text-neutral-300 rounded border border-neutral-600 px-6 py-2 w-full transition-all duration-200 ease-in-out hover:bg-neutral-300 hover:font-bold hover:text-black cursor-pointer">{t("back")}</Link>
            </form>
        </main>
    );
}
