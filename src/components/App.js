import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { isEmpty, omit } from 'ramda';
import { format } from 'date-fns';

// Material-UI Core
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import {
    searchRestaurants,
    clearRestaurants
} from '../redux/actions/restaurantsActions';
import { saveFavoriteTour } from '../redux/actions/favoriteToursActions';
import {
    getGeoLocationByCoordinates,
    getGeoLocationByPlaceName
} from '../redux/actions/geoLocationActions';
import { getWeatherByCoordinates } from '../redux/actions/weatherActions';

// Common
import Menu from './Menu';
import RestaurantsSearch from './RestaurantsSearch';
import RestaurantsResults from './RestaurantsResults';
import RestaurantsOrdering from './RestaurantsOrdering';
import RestaurantsTourDisplay from './RestaurantsTourDisplay';
import Favorites from './Favorites';

// Helpers
import { formatMeters } from '../helpers/formatMeters';

// Styles
const useStyles = makeStyles({
    content: {
        height: window.innerHeight
    },
    root: {
        display: 'flex'
    }
});

const App = ({
    weather,
    getWeatherByCoordinates,
    geoLocation,
    getGeoLocationByCoordinates,
    getGeoLocationByPlaceName,
    searchRestaurants,
    clearRestaurants,
    restaurants,
    saveFavoriteTour
}) => {
    // Hooks
    const classes = useStyles();
    const history = useHistory();
    const [formValues, setFormValues] = useState({
        term: '',
        location: '',
        radius: 4000,
        date: new Date()
    });
    const [selectedRestaurants, setSelectedRestaurants] = useState([]);
    const [tour, setTour] = useState({ restaurants: [] });
    const [finished, setFinished] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    useEffect(() => {
        window.addEventListener('resize', () => {
            resize();
        });
        navigator.geolocation.getCurrentPosition(function(position) {
            getGeoLocationByCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }, []);
    useEffect(() => {
        if (geoLocation.placeName) {
            setFormValues({ ...formValues, location: geoLocation.placeName });
        }
        if (!isEmpty(geoLocation.coordinates)) {
            getWeatherByCoordinates(geoLocation.coordinates);
        }
    }, [JSON.stringify(geoLocation)]);

    // Events
    const handleSearchClick = () => {
        searchRestaurants(formValues);
        if (
            isEmpty(geoLocation.coordinates) ||
            formValues.location != geoLocation.placeName
        ) {
            getGeoLocationByPlaceName({
                placeName: formValues.location
            });
        }
    };
    const handleSearchAgainClick = () => {
        clearRestaurants();
    };
    const handleOrderResultsClick = () => {
        setTour({ restaurants: selectedRestaurants });
    };
    const handleSelectionChange = restaurants => {
        setSelectedRestaurants(restaurants);
    };
    const handleFormValueChange = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const handleSelectAgainClick = () => {
        setTour({ restaurants: [] });
    };
    const handleCreateTourClick = newSelectedRestaurants => () => {
        setFinished(true);
        setTour({ restaurants: newSelectedRestaurants });
    };
    const handleFinishTourClick = () => {
        setFinished(false);
        setTour({ restaurants: [] });
        clearRestaurants();
    };
    const handleNewSearchClick = () => {
        history.push('/');
        setFinished(false);
        setTour({ restaurants: [] });
        clearRestaurants();
    };
    const handleFavoritesClick = () => {
        history.push('/favorites');
    };
    const handleBackToFavoritesClick = () => {
        history.push('/favorites');
    };
    const handleSaveNewFavoriteTour = restaurants => {
        saveFavoriteTour({
            name: `${formValues.term ? formValues.term : 'All Food'}, ${
                formValues.location
            }, ${formatMeters(formValues.radius)}`,
            restaurants,
            id: +new Date(),
            weatherForecast:
                formValues.date &&
                omit(
                    ['date'],
                    weather.forecast.find(
                        ({ date }) => date == format(formValues.date, 'P')
                    )
                ),
            date: formValues.date
        });
    };

    // Methods
    const resize = () => {
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu
                setIsDrawerOpen={setIsDrawerOpen}
                isDrawerOpen={isDrawerOpen}
                onNewSearchClick={handleNewSearchClick}
                onFavoritesClick={handleFavoritesClick}
            />
            <Grid
                container
                component="main"
                className={classes.content}
                style={{
                    height: windowSize.height
                }}>
                <Switch>
                    <Route exact path="/">
                        {!restaurants.length ? (
                            <RestaurantsSearch
                                onFormValueChange={handleFormValueChange}
                                onSearchClick={handleSearchClick}
                                formValues={formValues}
                            />
                        ) : !tour.restaurants.length ? (
                            <RestaurantsResults
                                onSelectionChange={handleSelectionChange}
                                onOrderResultsClick={handleOrderResultsClick}
                                onSearchAgainClick={handleSearchAgainClick}
                                selectedRestaurants={selectedRestaurants}
                            />
                        ) : !finished ? (
                            <RestaurantsOrdering
                                tourRestaurants={tour.restaurants}
                                onSelectAgainClick={handleSelectAgainClick}
                                onCreateTourClick={handleCreateTourClick}
                            />
                        ) : (
                            <RestaurantsTourDisplay
                                tourRestaurants={tour.restaurants}
                                onFinishTourClick={handleFinishTourClick}
                                onSaveNewFavoriteTour={
                                    handleSaveNewFavoriteTour
                                }
                                onBackToFavoritesClick={
                                    handleBackToFavoritesClick
                                }
                                formValues={formValues}
                                windowSize={windowSize}
                            />
                        )}
                    </Route>
                    <Route exact path="/favorites">
                        <Favorites />
                    </Route>
                    <Route
                        path="/favorites/:id"
                        render={props => (
                            <RestaurantsTourDisplay
                                {...props}
                                onFinishTourClick={handleFinishTourClick}
                                onSaveNewFavoriteTour={
                                    handleSaveNewFavoriteTour
                                }
                                onBackToFavoritesClick={
                                    handleBackToFavoritesClick
                                }
                                formValues={formValues}
                                windowSize={windowSize}
                            />
                        )}
                    />
                </Switch>
            </Grid>
        </div>
    );
};

App.propTypes = {
    weather: PropTypes.object,
    geoLocation: PropTypes.object,
    getGeoLocationByCoordinates: PropTypes.func,
    getGeoLocationByPlaceName: PropTypes.func,
    getWeatherByCoordinates: PropTypes.func,
    saveFavoriteTour: PropTypes.func,
    searchRestaurants: PropTypes.func,
    clearRestaurants: PropTypes.func,
    restaurants: PropTypes.array
};

const mapStateToProps = ({ restaurants, geoLocation, weather }) => ({
    weather,
    restaurants,
    geoLocation
});

const mapDispatchToProps = dispatch => ({
    getWeatherByCoordinates: bindActionCreators(
        getWeatherByCoordinates,
        dispatch
    ),
    getGeoLocationByCoordinates: bindActionCreators(
        getGeoLocationByCoordinates,
        dispatch
    ),
    getGeoLocationByPlaceName: bindActionCreators(
        getGeoLocationByPlaceName,
        dispatch
    ),
    saveFavoriteTour: bindActionCreators(saveFavoriteTour, dispatch),
    clearRestaurants: bindActionCreators(clearRestaurants, dispatch),
    searchRestaurants: bindActionCreators(searchRestaurants, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export { App };
