export const timeFormat = (ms) => {
    const milliseconds = parseInt(ms % 1000);
    const seconds = Math.floor(ms / 1000)
    return [`${seconds}s ${milliseconds}ms`,`${seconds}.${milliseconds}`];
}