export const BIRTHDAY = new Date(Date.parse("2004-11-10T00:00:00.000-08:00"));
export const MAGIC_VERSARY = new Date(Date.parse("2025-09-05T10:47:00.000-08:00"));
export const ANNIVERSARY = new Date(Date.parse("2025-10-22T21:17:00.000-08:00"));

export const GET_ORDINAL_YEAR = (today: Date, comparedYear: number) => {
    const year = today.getUTCFullYear() - comparedYear;
    const lastDigit = year % 10;
    if (lastDigit === 1) return `${year}st`;
    else if (lastDigit === 2) return `${year}nd`;
    else if (lastDigit === 3) return `${year}rd`;
    return `${year}th`;
}