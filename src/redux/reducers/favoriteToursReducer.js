import initialState from '../initialState';
import * as types from '../types';
import ls from 'localstorage';

const favoriteToursReducer = (state = initialState.favoriteTours, action) => {
    const storage = new ls('');
    let [error, favoriteTours] = storage.get('favoriteTours');
    if (error) {
        favoriteTours = [];
    }

    switch (action.type) {
        case types.GET_FAVORITE_TOURS: {
            return favoriteTours;
        }
        case types.SAVE_FAVORITE_TOUR: {
            const newFavoriteTours = [...favoriteTours, action.tour];
            storage.put('favoriteTours', newFavoriteTours);
            return newFavoriteTours;
        }
        case types.REMOVE_FAVORITE_TOUR_BY_ID: {
            const newFavoriteTours = favoriteTours.filter(
                ({ id }) => id != action.id
            );
            storage.put('favoriteTours', newFavoriteTours);
            return newFavoriteTours;
        }
        default:
            return state;
    }
};

export default favoriteToursReducer;
