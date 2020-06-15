import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

// Material-UI Core
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

// Material-UI Icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PinDropIcon from '@material-ui/icons/PinDrop';
import ImageIcon from '@material-ui/icons/Image';

// Helpers
import { formatMeters } from '../helpers/formatMeters';
import { formatRating } from '../helpers/formatRating';

const GOOGLE_MAPS_LOCATION_URL =
    'https://www.google.com/maps/@?api=1&map_action=map&basemap=satellite&zoom=18&center=';

// Styles
const useStyles = makeStyles(theme => ({
    results: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    nameRow: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    nameText: {
        display: 'flex',
        alignItems: 'center'
    },
    nameAndAddress: {
        paddingLeft: 16,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 105,
            paddingLeft: 0
        }
    },
    nameImage: {
        display: 'flex',
        width: 50,
        height: 50,
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20
        }
    },
    nameEmptyImage: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    location: {
        display: 'flex'
    },
    locationText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            fontSize: 9,
            maxWidth: 232
        }
    },
    buttons: {
        width: '100%',
        marginTop: 16,
        justifyContent: 'space-evenly',
        display: 'flex',
        marginBottom: 20
    },
    pinIcon: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    pageTitle: {
        textAlign: 'center',
        marginTop: 20
    },
    pageSubtitle: {
        marginBottom: 6
    }
}));

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const RestaurantsResults = ({
    restaurants,
    selectedRestaurants,
    onSelectionChange,
    onSearchAgainClick,
    onOrderResultsClick
}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column">
            <Grid item component={Toolbar} />
            <Grid
                item
                container
                alignItems="center"
                justify="center"
                direction="column">
                <Typography variant="h5" className={classes.pageTitle}>
                    Best Rated Food Places
                </Typography>
                <Typography
                    variant="subtitle1"
                    className={classes.pageSubtitle}>
                    Select the items to be added to the tour
                </Typography>
            </Grid>
            <Grid item container alignItems="center" xs>
                <Container className={classes.results} id="restaurantsResults">
                    {!!restaurants.length && (
                        <MaterialTable
                            icons={tableIcons}
                            onSelectionChange={onSelectionChange}
                            columns={[
                                {
                                    title: 'Name',
                                    width: 100,
                                    field: 'name',
                                    render: rowData => (
                                        <div className={classes.nameRow}>
                                            {rowData.image_url ? (
                                                <img
                                                    className={
                                                        classes.nameImage
                                                    }
                                                    src={rowData.image_url}
                                                />
                                            ) : (
                                                <div
                                                    className={
                                                        classes.nameEmptyImage
                                                    }>
                                                    <ImageIcon />
                                                </div>
                                            )}
                                            <div
                                                className={
                                                    classes.nameAndAddress
                                                }>
                                                <Link
                                                    className={classes.nameText}
                                                    href={rowData.url}
                                                    target="_blank">
                                                    {rowData.name}
                                                </Link>
                                                <div
                                                    className={
                                                        classes.location
                                                    }>
                                                    <Link
                                                        href={`${GOOGLE_MAPS_LOCATION_URL}${rowData.coordinates.latitude},${rowData.coordinates.longitude}`}
                                                        target="_blank">
                                                        <PinDropIcon
                                                            fontSize="small"
                                                            color="secondary"
                                                            className={
                                                                classes.pinIcon
                                                            }
                                                        />
                                                    </Link>
                                                    <Typography
                                                        variant="caption"
                                                        className={
                                                            classes.locationText
                                                        }>
                                                        {rowData.location.display_address.join(
                                                            ', '
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    title: 'Distance',
                                    field: 'distance',
                                    type: 'numeric',
                                    width: 20,
                                    render: rowData =>
                                        formatMeters(rowData.distance)
                                },
                                {
                                    title: 'Rating',
                                    field: 'rating',
                                    type: 'numeric',
                                    width: 50,
                                    defaultSort: 'desc',
                                    render: rowData =>
                                        formatRating(rowData.rating, classes)
                                }
                            ]}
                            title={`${restaurants.length} results:`}
                            data={restaurants}
                            options={{
                                selection: true,
                                paging: false,
                                sorting: true,
                                pageSizeOptions: [],
                                paginationType: 'stepped',
                                padding: 'dense'
                            }}
                            localization={{
                                toolbar: {
                                    nRowsSelected: '{0} restaurant(s) selected'
                                }
                            }}
                            style={{
                                minWidth: '80%'
                            }}
                        />
                    )}
                </Container>
            </Grid>
            <Grid item>
                <div className={classes.buttons}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onSearchAgainClick}>
                        Search Again
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={onOrderResultsClick}
                        disabled={!selectedRestaurants.length}>
                        Next Step
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

RestaurantsResults.propTypes = {
    restaurants: PropTypes.array,
    selectedRestaurants: PropTypes.array,
    onSelectionChange: PropTypes.func,
    onSearchAgainClick: PropTypes.func,
    onOrderResultsClick: PropTypes.func
};

const mapStateToProps = ({ restaurants }) => ({
    restaurants
});

export default connect(mapStateToProps)(RestaurantsResults);
export { RestaurantsResults };
