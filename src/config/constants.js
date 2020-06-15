export const YELP_API_URL =
    process.env.NODE_ENV == 'production'
        ? process.env.YELP_API_URL
        : 'http://localhost:3001';

export const MAPBOX_API_URL = process.env.MAPBOX_API_URL;
export const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

export const OWM_API_URL = process.env.OWM_API_URL;
export const OWM_API_KEY = process.env.OWM_API_KEY;
