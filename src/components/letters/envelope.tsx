import {ReactNode} from "react";
import Image from "next/image";
import {useStore} from "@/store/store";
import {LETTERS} from "@/const/letters";

type _Props = {
    index: number;
    read?: boolean;
    children: ReactNode;
    address: { street: string, city: string };
};

const Envelope = ({index, read = false, children, address}: _Props) => {
    const {today, setActiveLetter, isTodayBirthday, isTodayAnniversary, isTodayMagicversary, setShowLetter} = useStore();
    const L = LETTERS(isTodayBirthday, isTodayMagicversary, isTodayAnniversary, today);

    return (
        <div
            className="relative bg-amber-100 aspect-6/4 text-black flex flex-col p-4 justify-between overflow-clip rounded cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.1]"
            onClick={() => {
                setActiveLetter({date: L[index].date, letter: L[index].letter});
                setShowLetter(true);
            }}>
            <Image src={"/images/textures/envelope.jpg"} alt={"Envelope texture."} width={2000}
                   height={1500} quality={100} priority
                   className="absolute top-0 left-0 opacity-75 brightness-75 select-none pointer-events-none object-cover"/>
            <div className="relative flex items-center justify-between gap-20">
                <div className="flex flex-col items-start justify-start text-start text-sm text-shadow-xl">
                    <p>Ella Weiss</p>
                    <p>{address.street}</p>
                    <p>{address.city}, California</p>
                    <p>United States of America</p>
                </div>
                <div className="relative aspect-square overflow-clip h-16 shadow-lg">
                    {children}
                </div>
            </div>
            <p className="relative text-xl font-fleur-de-leah">{new Date(Date.parse(L[index].date)).toDateString()}</p>
        </div>
    );
}

export default Envelope;