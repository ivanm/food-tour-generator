import React from 'react';
import PropTypes from 'prop-types';
import { MAPBOX_API_URL, MAPBOX_API_KEY } from '../config/constants';

const Map = ({ markerCoordinates, classes }) => {
    const coordinatesUrl = markerCoordinates
        .map(
            (item, index) => `pin-s-${index + 1}+4255be(${item[0]},${item[1]})`
        )
        .join(',');
    return (
        <img
            className={classes.mapContainer}
            src={`${MAPBOX_API_URL}/styles/v1/mapbox/streets-v11/static/${coordinatesUrl}/auto/500x300?access_token=${MAPBOX_API_KEY}`}
        />
    );
};

Map.propTypes = {
    markerCoordinates: PropTypes.array,
    classes: PropTypes.object
};

export default Map;
