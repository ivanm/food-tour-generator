import initialState from '../initialState';
import * as types from '../types';

const restaurantsReducer = (state = initialState.restaurants, action) => {
    switch (action.type) {
        case types.SEARCH_RESTAURANTS_SUCCESS: {
            return action.payload.businesses.sort(
                (a, b) => b.rating - a.rating
            );
        }
        case types.CLEAR_RESTAURANTS: {
            return [];
        }
        default:
            return state;
    }
};

export default restaurantsReducer;
