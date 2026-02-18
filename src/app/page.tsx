"use client";

import Letter from "@/components/letter";
import {useStore} from "@/store/store";
import Gallery from "@/components/gallery";
import {getRandomInt} from "@/utils";
import {useEffect, useState} from "react";
import NumberPicker from "@/components/number-picker";

export default function Home() {

  const {letterRead, setIsLetterOpen} = useStore();
  const [term, setTerm] = useState<string>("");

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
    if (window !== undefined) {
      const selectedTerm = randomEndearment();
      setTerm(selectedTerm);
    }
  }, [])

  return (
      <main className="flex-col gap-6 pt-[20vh] lg:pt-0 pb-6 text-center items-center justify-start lg:justify-center w-full min-h-screen">
        <h1 className="sticky z-30 pt-6 pb-2 top-0 bg-forest-green-800 w-full text-5xl font-barriecito text-amber-100">Number
          for Ella</h1>
        <p className="font-nunito text-white/80 px-6 max-w-172">I don&#39;t know what the numbers are for, {term},
          but I know you want them, and that&#39;s all convincing I need. I can&#39;t always be there, but I want
          to, so this is another way of me trying to compensate.<br/><br/>And down here, a letter, for when you
          long.
        </p>
        <div className="relative flex flex-col items-center justify-start">
          <span className="absolute inline-flex h-full w-full opacity-75"/>
          <span
              className={`absolute left-1/2 -translate-x-1/2 bg-amber-100 h-6 w-3/4 ${letterRead ? "-bottom-1 transition-all duration-200 ease-in-out peer-hover:-translate-y-3" : "-bottom-6 animate-bounce"}`}/>
          <button
              onClick={() => setIsLetterOpen(true)}
              className="font-bold peer cursor-pointer relative px-6 py-4 rounded-sm bg-neutral-300 text-crimson-300 text-xl font-barrio">Check
            Mailbox
          </button>
        </div>
        <h2 className="sticky pt-6 pb-2 top-0 bg-forest-green-800 w-full text-4xl font-barriecito text-amber-100">How
          does this work?</h2>
        <p className="font-nunito text-white/80 px-6 max-w-172">You want two numbers from two ranges. These boxes down here
          are fully customizable. Set a lower bound, set an upper bound, and take it for a spin! Once you get your
          number - <span className="font-barriecito">and what comes with it *:) </span> - you can take it for a
          spin again, with the same bounds, higher, or lower ones!
        </p>
        <p className="px-16 text-xs font-barrio text-amber-100/60 max-w-172">Note: the full effect of this will be better felt if
          you keep your upper bound below 25 or so, but there <span className="font-bold italic">is</span> still
          something more than just the number for you if you ever need to go higher. I love you Bug!</p>
        <Letter/>
        <Gallery/>
        <NumberPicker />
      </main>
  );
}
