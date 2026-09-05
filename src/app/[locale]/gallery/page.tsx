import FilmStrip from "@/components/film-strip";

export default function Gallery() {
    return (
        <main
            className="bg-forest-green-600 w-screen h-screen text-white font-barriecito flex flex-col items-start justify-start py-16">
            <h1 className="font-black text-7xl px-6">Over the seas</h1>
            <section className="relative flex items-center justify-start gap-16">
                <FilmStrip source={"/videos/gallery/USA-DEC/20251217_comp.webm"} caption={"Hello hi I'm a caption"}
                           date={new Date(Date.parse("2025-12-17T00:00:00.000-08:00"))}
                           position={{lane: 1, rotation: "rotate-6", vertical: true}}/>
            </section>
        </main>
    );
}