import initialState from '../initialState';
import * as types from '../types';

const geoLocationReducer = (state = initialState.geoLocation, action) => {
    switch (action.type) {
        case types.GET_GEO_LOCATION_BY_COORDINATES_SUCCESS: {
            return {
                coordinates: action.meta.coordinates,
                placeName: action.payload.features[0].place_name
            };
        }
        case types.GET_GEO_LOCATION_BY_PLACE_NAME_SUCCESS: {
            return {
                coordinates: {
                    longitude:
                        action.payload.features[0].geometry.coordinates[0],
                    latitude: action.payload.features[0].geometry.coordinates[1]
                },
                placeName: action.meta.placeName
            };
        }
        default:
            return state;
    }
};

export default geoLocationReducer;
