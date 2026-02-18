export function getRandomInt(max : number, min?: number) {
    if (min === undefined) min = 0;
    return Math.floor(Math.random() * (max - min) + min);
}