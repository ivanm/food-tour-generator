export const formatMeters = number => {
    if (number >= 1000) {
        return `${(parseInt(number) / 1000).toFixed(2).toLocaleString()} km`;
    } else {
        return `${parseInt(number).toFixed(2).toLocaleString()} m`;
    }
};
