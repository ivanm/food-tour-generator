import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Material-UI Core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Helpers
import { formatTemperature } from '../helpers/formatTemperature';

const TEMP_UNIT = 'F';

// Styles
const useStyles = makeStyles(theme => ({
    weatherDisplayContainer: {
        marginLeft: 28,
        marginRight: 21,
        marginBottom: 14,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            marginRight: 0
        }
    },
    icon: {
        fontSize: 37,
        color: '#3f51b5',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20
        }
    },
    weatherTemps: {
        borderLeft: '1px solid #bfbdbd',
        marginLeft: 11,
        paddingLeft: 7
    },
    weatherText: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 10
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 6
        }
    },
    dateText: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 10
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 7,
            marginTop: 3
        }
    }
}));

const WeatherDisplay = ({ forecast, dateText }) => {
    const classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            className={classes.weatherDisplayContainer}>
            <Grid container item justify="flex-end" xs={7}>
                <Grid container item xs={3} justify="flex-end">
                    <Grid item>
                        <i
                            className={`${classes.icon} wi wi-owm-${forecast.condition.id}`}
                        />
                    </Grid>
                </Grid>
                <Grid
                    className={classes.weatherTemps}
                    container
                    item
                    direction="column"
                    xs>
                    <Grid item>
                        <Typography
                            className={classes.weatherText}
                            variant="overline">
                            {forecast.condition.main}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="overline"
                            className={classes.weatherText}>
                            {`Max: ${formatTemperature(
                                forecast.temp.max,
                                TEMP_UNIT
                            )}° ${TEMP_UNIT} / Min: ${formatTemperature(
                                forecast.temp.min,
                                TEMP_UNIT
                            )}° ${TEMP_UNIT}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                className={classes.dateText}
                container
                item
                direction="column"
                alignItems="flex-end"
                xs>
                <Typography variant="button" className={classes.dateText}>
                    {dateText}
                </Typography>
            </Grid>
        </Grid>
    );
};

WeatherDisplay.propTypes = {
    forecast: PropTypes.object,
    dateText: PropTypes.string
};

export default WeatherDisplay;
