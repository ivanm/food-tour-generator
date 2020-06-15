import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { add } from 'date-fns';

// Material-UI Core
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

// Redux
import { createLoadingSelector } from '../helpers/createLoadingSelector';

const useStyles = makeStyles({
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    h5: {
        textAlign: 'center'
    },
    dateInput: {
        marginTop: 16,
        marginBottom: 8,
        width: '100%'
    }
});
const RestaurantsSearch = ({
    isLoadingRestaurants,
    onFormValueChange,
    onSearchClick,
    formValues: { term, location, radius, date }
}) => {
    const classes = useStyles();
    const isSearchEnabled = location && radius;
    return (
        <Container maxWidth="sm" className={classes.searchContainer}>
            {!isLoadingRestaurants ? (
                <div>
                    <Typography
                        component="h1"
                        variant="h5"
                        className={classes.h5}>
                        Search Places
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        id="term"
                        label="Food"
                        placeholder="ie: Sushi, Ramen, Tacos"
                        name="term"
                        autoComplete="term"
                        autoFocus
                        value={term}
                        onChange={onFormValueChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        id="location"
                        label="Location"
                        placeholder="ie: Mexico City, New York"
                        name="location"
                        autoComplete="location"
                        autoFocus
                        value={location}
                        onChange={onFormValueChange}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.dateInput}
                            inputVariant="outlined"
                            label="Date"
                            name="date"
                            size="small"
                            clearable
                            value={date}
                            placeholder="(Optional)"
                            onChange={date =>
                                onFormValueChange({
                                    target: { name: 'date', value: date }
                                })
                            }
                            minDate={new Date()}
                            maxDate={add(new Date(), { days: 7 })}
                            format="MM/dd/yyyy"
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                        id="radius"
                        label="Radius (meters)"
                        placeholder="1000"
                        name="radius"
                        autoComplete="radius"
                        autoFocus
                        value={radius}
                        onChange={onFormValueChange}
                        type="number"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!isSearchEnabled}
                        onClick={onSearchClick}
                        className={classes.submit}>
                        Search
                    </Button>
                </div>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
};

RestaurantsSearch.propTypes = {
    isLoadingRestaurants: PropTypes.bool,
    onFormValueChange: PropTypes.func,
    onSearchClick: PropTypes.func,
    formValues: PropTypes.object
};

const mapStateToProps = ({ loading }) => ({
    isLoadingRestaurants: createLoadingSelector('SEARCH_RESTAURANTS', loading)
});

export default connect(mapStateToProps)(RestaurantsSearch);
export { RestaurantsSearch };
