"use client";

import React, {useEffect, useState} from "react";
import {useStore} from "@/store/store";
import {useRouter} from "next/navigation";

const NumberPicker = ({repeat = false} : {repeat? : boolean}) => {
    const { upperBound, setUpperBound, lowerBound, setLowerBound} = useStore();
    const [upper, setUpper] = useState<number | "">("");
    const [lower, setLower] = useState<number | "">("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, bound: "lower" | "upper") => {
        const value = e.target.value;
        switch (bound) {
            case "lower":
                setLower(value !== "" ? Number(value) : "");
                break;
            case "upper":
                setUpper(value !== "" ? Number(value) : "");
                break;
        }
    }

    useEffect(() => {
        if (window !== undefined) {
            if (upperBound !== "" && lowerBound !== "") {
                sessionStorage.setItem("bounds", JSON.stringify({
                    upper: upperBound as number,
                    lower: lowerBound as number
                }));
            }
        }
    }, [lowerBound, upperBound]);

    return (
        <div className="flex flex-col items-stretch lg:items-center gap-4 w-full">
            <div className="flex flex-col items-center justify-between gap-4 px-16 w-full lg:max-w-172">
                <div className="flex flex-col items-start gap-2 w-full">
                    <h3 className="font-bold font-nunito text-forest-green-300">Lower bound</h3>
                    <input placeholder={"Min."} type={"number"} min={1} max={100} value={lower}
                           onChange={(e) => handleChange(e, "lower")}
                           className="w-full border-b-2 border-b-forest-green-500 px-6 py-2 text-amber-100 placeholder:text-forest-green-500 transition-all duration-300 ease-in-out active:outline-0 active:ring-0"/>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <h3 className="font-bold font-nunito text-forest-green-300">Upper bound</h3>
                    <input placeholder={"Max."} type={"number"} min={1} max={100} value={upper}
                           onChange={(e) => handleChange(e, "upper")}
                           className="w-full border-b-2 border-b-forest-green-500 px-6 py-2 text-amber-100 placeholder:text-forest-green-500 transition-all duration-300 ease-in-out active:outline-0 active:ring-0"/>
                </div>
                {repeat ? (
                    <button
                        onClick={() => {
                            setUpperBound((upper as number ?? 0) + 1);
                            setLowerBound(lower);
                            router.push("/result");
                        }}
                        className="inline-flex items-center justify-center max-w-80 text-center font-bold cursor-pointer relative p-4 rounded-xl text-amber-100 border border-forest-green-400 text-lg font-barriecito transition-all duration-200 ease-in-out hover:bg-forest-green-400">
                        New range new number!
                    </button>
                ) : (
                    <button onClick={() => {
                        setUpperBound(upper);
                        setLowerBound(lower);
                        router.push("/result");
                    }}
                            className="inline-flex items-center justify-center max-w-80 text-center font-bold cursor-pointer relative p-4 rounded-xl text-amber-100 border border-forest-green-400 text-lg font-barriecito transition-all duration-200 ease-in-out hover:bg-forest-green-400">
                        Number, now! (Pretty please)
                    </button>
                )}
            </div>
        </div>
    );
}

export default NumberPicker;