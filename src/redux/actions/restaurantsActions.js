import { createAction } from 'redux-api-middleware';
import * as types from '../types';
import { buildUrlQuery } from '../../helpers/buildUrlQuery';
import { YELP_API_URL } from '../../config/constants';

export const searchRestaurants = ({ term, location, radius }) =>
    createAction({
        types: [
            types.SEARCH_RESTAURANTS_REQUEST,
            types.SEARCH_RESTAURANTS_SUCCESS,
            types.SEARCH_RESTAURANTS_FAILURE
        ],
        endpoint: buildUrlQuery(`${YELP_API_URL}/search`, {
            term,
            location,
            radius,
            sort_by: 'rating',
            limit: '20'
        }),
        method: 'GET',
    });

export const clearRestaurants = () => ({
    type: types.CLEAR_RESTAURANTS
});
