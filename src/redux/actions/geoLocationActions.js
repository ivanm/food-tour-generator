import { createAction } from 'redux-api-middleware';
import * as types from '../types';
import { MAPBOX_API_URL, MAPBOX_API_KEY } from '../../config/constants';

export const getGeoLocationByCoordinates = ({ latitude, longitude }) =>
    createAction({
        types: [
            types.GET_GEO_LOCATION_BY_COORDINATES_REQUEST,
            {
                type: types.GET_GEO_LOCATION_BY_COORDINATES_SUCCESS,
                meta: { coordinates: { latitude, longitude } }
            },
            types.GET_GEO_LOCATION_BY_COORDINATES_FAILURE
        ],
        endpoint: `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`,
        method: 'GET'
    });

export const getGeoLocationByPlaceName = ({ placeName }) =>
    createAction({
        types: [
            types.GET_GEO_LOCATION_BY_PLACE_NAME_REQUEST,
            {
                type: types.GET_GEO_LOCATION_BY_PLACE_NAME_SUCCESS,
                meta: { placeName }
            },
            types.GET_GEO_LOCATION_BY_PLACE_NAME_FAILURE
        ],
        endpoint: `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${placeName}.json?access_token=${MAPBOX_API_KEY}`,
        method: 'GET'
    });
