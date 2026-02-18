"use client";

import {useStore} from "@/store/store";
import {BIRTHDAY} from "@/const/common";
import Image from "next/image";

const Letter = () => {
    const {
        isLetterOpen,
        setIsLetterOpen,
        today,
        isTodayBirthday,
        setLetterRead,
        toggleGalleryLetter,
        galleryLetter
    } = useStore();

    const getOrdinalYear = () => {
        const year = today.getUTCFullYear() - BIRTHDAY.getUTCFullYear();
        const lastDigit = year % 10;
        if (lastDigit === 1) return `${year}st`;
        else if (lastDigit === 2) return `${year}nd`;
        else if (lastDigit === 3) return `${year}rd`;
        return `${year}th`;
    }

    return (
        <>
            <div
                className={`z-50 fixed top-1/2 -translate-y-1/2 left-0 backdrop-blur-2xl w-screen h-screen flex overflow-clip px-2 py-6 lg:py-2 transition-all duration-700 ease-in-out ${isLetterOpen ? "opacity-100" : "select-none pointer-events-none opacity-0"}`}>
                <div
                    className={`bg-amber-100 h-[95vh] relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 left-1/2 text-black text-3xl font-fleur-de-leah max-w-172 flex transition-all duration-500 ease-in-out ${galleryLetter ? "opacity-0 select-none pointer-events-none lg:pointer-events-auto lg:select-auto lg:opacity-100 -translate-x-1/2 lg:-translate-x-[135%]" : "-translate-x-1/2"}`}>
                    <Image src={"/images/old-paper-texture.jpg"} alt={"Old coffee stained paper texture."} width={2000}
                           height={2000} quality={100} priority
                           className="absolute top-0 left-0 opacity-50 select-none pointer-events-none w-170 lg:w-172 h-[95vh]"/>
                    <div className="relative overflow-y-scroll flex flex-col items-center justify-start gap-12 p-8">
                        <h2 className="relative font-bold text-5xl">To my lovely
                            Ella{isTodayBirthday && `, on her ${getOrdinalYear()} birthday`}:</h2>
                        <p className="relative">I don&#39;t know what every little thing means. I don&#39;t need to know
                            what every little
                            thing means, as much as I would give anything to do so. I can&#39;t always be there, I
                            can&#39;t stop the earth from spinning just for <strong>You</strong>, as much as I so
                            decidedly want to do so. I am only human, and I am only me. But you are the passion of all
                            the suns in the universe combined roaring. And when you quiet—still—the echo of your roar
                            trembles throughout time and space. There is not a single equation, not a set of them, not a
                            singular concept in our corner of the universe, not a thing to be discovered, or invented,
                            or imagined, that could possibly be equated with your existence.<br/><br/>
                            I see You naked, not in body but in Soul, and I see everything: the infinite beauty, the
                            turmoil, the typhoons, the deepest trench in the deepest ocean, the violent tide, the far
                            away shore, the Redwoods standing tall and the full moon shining on the clearing. The little
                            girl who, even surrounded by all the magic and all the whimsy, was forced to grow up too
                            fast. The little girl, crying in a gown that doesn&#39;t yet fit Her—and Her, the owner of
                            my Heart, piercing into my dark black eyes with her determined, bloodshot, honey-brown eyes.
                            Looking at me in disbelief. Looking at me with caution, but eagerness. With gratitude, but
                            with fear. And I see You naked, not in body but in Being. <br/><br/>
                            And I see the little girl crying, and You holding back tears, placing your body before Her,
                            in tired armor, to protect the gown that now fits You. And all I want is to hold your center
                            mass with the most tender embrace my body enables me for. <br/><br/>
                            I want to show you infinity, undo the knots in your throat, hold the water still, sink with
                            you to the bottom of the ocean, ride the wave pushing you in every direction, swim ashore
                            with you, cover your six in the clearing with moonlight over us—while You cover the little
                            girl—until She, too, can wear Her gown. And your battered armor is set to hang forever in
                            the cabin in the middle of the Redwoods, and you get all the seams and the wrinkles You
                            deserve your beautiful laughter to give You. I want to rip that laughter off your lungs as
                            many times as my imagination can conjure the words to do so.<br/><br/>
                            For I will put a part of my Love for You in a bottle, and hook it to a piece of string in
                            your favorite color, so You keep close the light I want to give You—because I want to give
                            You the world, Ella.<br/><br/>
                            You are <strong>Beauty</strong>, you are <strong>Talent</strong>, you
                            are <strong>Strength</strong>, you are <strong>Softness</strong>, you
                            are <strong>Friend</strong>, you are <strong>Tears</strong>, you
                            are <strong>Laughter</strong>, you are <strong>Daughter</strong>, you are <strong>Eldest
                                Sister</strong>, you are <strong>Academic Weapon</strong>, you are <strong>Love</strong>,
                            you are <strong>Seasons</strong>, you are <strong>A Hug</strong>, you are <strong>A
                                Kiss</strong>, you are <strong>Embrace</strong>, you are <strong>Curiosity</strong>, you
                            are <strong>Knowledge</strong>, you are <strong>Passion</strong>, you
                            are <strong>Weakness</strong>, you are <strong>Yearning</strong>.<br/><br/>
                            I once asked myself: &#34;do trees in the forest fall at all if there&#39;s no one too
                            witness them fall?&#34;<br/><br/>
                            I want to see your tree fall, Ella. I want to witness You. I don&#39;t need to understand
                            You. I don&#39;t need to be able to define You. <br/><br/>
                            Ella—today{isTodayBirthday && ", on Your birthday"}, and every day moving forward—<strong>I
                                just want to experience You.</strong></p>
                        <div className="flex flex-col items-stretch gap-2">
                            <button
                                onClick={() => {
                                    setLetterRead(true);
                                    setIsLetterOpen(false);
                                }}
                                className="relative border border-neutral-600 px-6 py-2 font-bold text-2xl transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer">Close
                                Letter
                            </button>
                            <button
                                onClick={() => toggleGalleryLetter()}
                                className="relative border border-neutral-600 px-6 py-2 font-bold text-2xl transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer">
                                {galleryLetter ? "Hide" : "Show"} Yourself {galleryLetter &&
                                <span className="font-nunito text-lg">&nbsp;&nbsp;*:(</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Letter;