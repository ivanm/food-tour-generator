import initialState from '../initialState';
import { format, add } from 'date-fns';
import * as types from '../types';

const weatherReducer = (state = initialState.weather, action) => {
    switch (action.type) {
        case types.GET_WEATHER_BY_COORDINATES_SUCCESS: {
            return {
                coordinates: action.meta.coordinates,
                forecast: action.payload.daily.map(
                    ({ temp, weather }, index) => ({
                        date: format(add(new Date(), { days: index }), 'P'),
                        temp,
                        condition: weather[0]
                    })
                )
            };
        }
        default:
            return state;
    }
};

export default weatherReducer;
