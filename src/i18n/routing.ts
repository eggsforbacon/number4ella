import {defineRouting} from 'next-intl/routing';

export const PATHS = ["/", "/sweden", "/gallery", "/number", "/number/result", ] as const;
export type Path = (typeof PATHS)[number];
export const LOCALES = ['en', 'es',]

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: 'en',
    domains: [
        {
            domain: "en.number4ella.com",
            defaultLocale: "en",
            locales: ["en"]
        },
        {
            domain: "co.number4ella.com",
            defaultLocale: "es",
            locales: ["es"]
        },
    ],
    pathnames: {
        "/": "/",
        "/sweden": "/sweden",
        "/number": {
            "en": "/number",
            "es": "/numero",
        },
        "/number/result": {
            "en": "/number/result",
            "es": "/numero/resultado",
        }
    }
});