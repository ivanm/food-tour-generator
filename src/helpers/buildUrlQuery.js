// Builds a query string using an object
export const buildUrlQuery = (url, options) => {
    const newUrl = new URL(url);
    Object.keys(options).forEach(key => {
        if (options[key]) {
            newUrl.searchParams.append(key, options[key]);
        }
    });
    return newUrl.href;
};
