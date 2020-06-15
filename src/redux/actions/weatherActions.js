import { createAction } from 'redux-api-middleware';
import * as types from '../types';
import { OWM_API_URL, OWM_API_KEY } from '../../config/constants';

export const getWeatherByCoordinates = ({ latitude, longitude }) =>
    createAction({
        types: [
            types.GET_WEATHER_BY_COORDINATES_REQUEST,
            {
                type: types.GET_WEATHER_BY_COORDINATES_SUCCESS,
                meta: { coordinates: { latitude, longitude } }
            },
            types.GET_WEATHER_BY_COORDINATES_FAILURE
        ],
        endpoint: `${OWM_API_URL}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}`,
        method: 'GET'
    });
