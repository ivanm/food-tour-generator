import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import restaurantsReducer from './reducers/restaurantsReducer';
import favoriteToursReducer from './reducers/favoriteToursReducer';
import geoLocationReducer from './reducers/geoLocationReducer';
import weatherReducer from './reducers/weatherReducer';
import loadingReducer from './reducers/loadingReducer';
import { apiMiddleware } from 'redux-api-middleware';

const configureStore = initialState => {
    const store = createStore(
        combineReducers({
            restaurants: restaurantsReducer,
            favoriteTours: favoriteToursReducer,
            geoLocation: geoLocationReducer,
            weather: weatherReducer,
            loading: loadingReducer
        }),
        initialState,
        compose(
            applyMiddleware(...[apiMiddleware]),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
};

export default configureStore;
