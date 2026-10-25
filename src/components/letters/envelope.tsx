import { ReactNode } from "react";
import Image from "next/image";
import { useLetters } from "@/store/letters";
import { LETTERS } from "@/const/letters";

type _Props = {
  index: number;
  read?: boolean;
  children: ReactNode;
  address: { street: string; city: string };
  rotation?: number;
  translation?: { x: number; y: number };
};

const Envelope = ({
  index,
  read,
  children,
  address,
}: _Props) => {
  const {
    today,
    setActiveLetter,
    isTodayBirthday,
    isTodayAnniversary,
    isTodayMagicversary,
    setShowLetter,
  } = useLetters();
  const L = LETTERS(
    isTodayBirthday,
    isTodayMagicversary,
    isTodayAnniversary,
    today,
  );

  const transforms: string[] = [
    "top-14 lg:left-16 rotate-6",
    "top-54 lg:top-13 lg:left-66 -rotate-2",
    "top-94 lg:top-14 lg:left-144 rotate-3",
    "top-134 lg:top-13 lg:left-198 -rotate-6",
    "top-174 lg:top-14 lg:left-250 rotate-5",
    "top-214 lg:top-13 lg:left-304 rotate-2",
    "top-254 lg:top-14 lg:left-12 -rotate-3",
    "top-294 lg:top-13 lg:left-68 -rotate-4",
    "top-334 lg:top-14 lg:left-136 rotate-2",
    "top-374 lg:top-13 lg:left-188 -rotate-6",
  ]

  return (
    <div
      className={`w-72 lg:w-96 absolute bg-amber-100 aspect-6/4 text-black flex flex-col p-4 justify-between overflow-hidden rounded cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.1] hover:z-99 ${transforms[index]}`}
      onClick={() => {
        setActiveLetter({ date: L[index].date, letter: L[index].letter });
        setShowLetter(true);
      }}
    >
      <Image
        src={"/images/textures/envelope.jpg"}
        alt={"Envelope texture."}
        width={2000}
        height={1500}
        quality={100}
        priority
        className="absolute top-0 left-0 opacity-75 brightness-75 select-none pointer-events-none object-cover"
      />
      {read && (
        <span className="absolute right-2 top-2 bg-red-900 aspect-square w-4 rounded-full animate-bounce" />
      )}
      <div className="relative flex items-center justify-between gap-4 lg:gap-20">
        <div className="flex flex-col items-start justify-start text-start text-xs lg:text-sm text-shadow-xl">
          <p>Ella Weiss</p>
          <p>{address.street}</p>
          <p>{address.city}, California</p>
          <p>United States of America</p>
        </div>
        <div className="relative aspect-square overflow-clip h-10 lg:h-16 shadow-lg">
          {children}
        </div>
      </div>
      <p className="relative text-lg lg:text-xl font-cutive-mono">
        {new Date(Date.parse(L[index].date)).toDateString()}
      </p>
    </div>
  );
};

export default Envelope;
