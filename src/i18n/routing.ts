import {defineRouting} from 'next-intl/routing';

export const PATHS = ["/", "/sweden", "/number", "/number/result", ] as const;
export type Path = (typeof PATHS)[number];
export const LOCALES = ['en', 'es',]

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: 'en',
    domains: [
        {
            domain: "number4ella.com",
            defaultLocale: "en",
            locales: ["en"]
        },
        {
            domain: "co.number4ella.com",
            defaultLocale: "es",
            locales: ["es"]
        },
    ],
    // pathnames: {
    //     "/": "/",
    //     "/software": {
    //         "es": "/desarrollo",
    //         "de": "/entwicklung",
    //     },
    //     "/music": {
    //         "es": "/música",
    //         "de": "/musik",
    //     },
    //     "/contact": {
    //         "es": "/contacto",
    //         "de": "/kontakt",
    //     },
    //     "/about": {
    //         "es": "/acerca",
    //         "de": "/über",
    //     },
    // }
});