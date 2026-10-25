"use client";

import { useLetters } from "@/store/letters";
import Image from "next/image";
import { LETTER_COUNT, LETTERS } from "@/const/letters";
import Envelope from "@/components/letters/envelope";

const Mailbox = () => {
  const {
    today,
    isMailboxOpen,
    isTodayBirthday,
    isTodayMagicversary,
    isTodayAnniversary,
    setMailboxOpen,
  } = useLetters();

  const stamps = [
    "OCT_11_2025.jpg",
    "NOV_9_2025.jpg",
    "NOV_11_2025.png",
    "FEB_9_2026.jpg",
    "SEP_5_2026.jpg",
  ];

  const addresses = [
    {
      street: "Cazadero Hwy. 5400",
      city: "95421, Cazadero",
    },
    {
      street: "E. Cotati Ave 1870, ML-5D ",
      city: "94951, Penngrove",
    },
    {
      street: "CA-116 28301",
      city: "95459, Jenner",
    },
    {
      street: "CA-116 28301",
      city: "95459, Jenner",
    },
    {
      street: "E. Cotati Ave 1870, ML-5D ",
      city: "94951, Penngrove",
    },
  ];

  return (
    <section
      className={`z-30 fixed lg:absolute top-1/2 -translate-y-1/2 left-0 backdrop-blur-2xl w-screen h-screen flex items-center justify-center overflow-x-clip px-2 py-6 lg:py-2 lg:px-16 transition-all duration-700 ease-in-out ${isMailboxOpen ? "opacity-100" : "select-none pointer-events-none opacity-0"}`}
    >
      <div
        className={`bg-neutral-800 h-[95vh] relative text-white text-3xl w-full flex flex-col items-stretch transition-all duration-500 ease-in-out`}
      >
        <Image
          src={"/images/textures/metal.png"}
          alt={"Metal texture."}
          width={2000}
          height={1500}
          quality={100}
          priority
          className="absolute top-0 left-0 opacity-50 brightness-50 select-none pointer-events-none h-[95vh] object-cover"
        />
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 gap-4">
          <h2 className="relative font-autour-one text-left text-5xl lg:text-7xl">
            Mailbox
          </h2>
          <button
            onClick={() => {
              setMailboxOpen(false);
            }}
            className="font-autour-one relative border-2 border-neutral-600 px-6 py-2 font-bold text-lg lg:text-2xl transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer"
          >
            Close Mailbox
          </button>
        </div>
        <div className="relative flex flex-col items-center lg:flex-wrap gap-8 h-full lg:items-start px-6 overflow-y-scroll">
          {LETTERS(
            isTodayBirthday,
            isTodayMagicversary,
            isTodayAnniversary,
            today,
          ).map((_, i) => {
            return (
              <Envelope
                key={i}
                index={i}
                address={addresses[i]}
                read={i === LETTER_COUNT - 1}
              >
                <Image
                  src={`/images/stamps/${stamps[i]}`}
                  alt={"A stamp"}
                  height={600}
                  width={600}
                  quality={100}
                  className="h-full absolute object-cover w-full"
                />
              </Envelope>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mailbox;
