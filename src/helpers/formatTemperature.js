export const formatTemperature = (kelvinNumber, unit) => {
    switch (unit) {
        case 'C':
            return parseInt(kelvinNumber - 273.15);
        case 'F':
        default:
            return parseInt((kelvinNumber - 273.15) * 1.8 + 32);
    }
};
