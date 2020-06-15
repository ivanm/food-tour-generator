import * as types from '../types';

export const getFavoriteTours = () => ({
    type: types.GET_FAVORITE_TOURS
});

export const saveFavoriteTour = tour => ({
    tour,
    type: types.SAVE_FAVORITE_TOUR
});

export const removeFavoriteTourById = id => ({
    id,
    type: types.REMOVE_FAVORITE_TOUR_BY_ID
});
