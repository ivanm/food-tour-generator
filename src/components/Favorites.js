import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

// Material-UI Core
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import MULink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// Redux
import {
    getFavoriteTours,
    removeFavoriteTourById
} from '../redux/actions/favoriteToursActions';

// Styles
const useStyles = makeStyles({
    favoritesContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    pageTitle: {
        textAlign: 'center',
        marginTop: 20
    },
    pageSubtitle: {
        marginBottom: 3
    }
});

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

const Favorites = ({
    favoriteTours,
    getFavoriteTours,
    removeFavoriteTourById
}) => {
    // Hooks
    const classes = useStyles();
    useEffect(() => {
        getFavoriteTours();
    }, [JSON.stringify(favoriteTours)]);

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
                    Favorite Tours
                </Typography>
                <Typography
                    variant="subtitle1"
                    className={classes.pageSubtitle}>
                    Tours saved for later
                </Typography>
            </Grid>
            <Grid item container alignItems="flex-start" xs>
                <Container className={classes.favoritesContainer}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                            {
                                title: 'Name',
                                field: 'name',
                                render: rowData => (
                                    <MULink
                                        to={`/favorites/${rowData.id}`}
                                        component={Link}>
                                        {rowData.name}
                                    </MULink>
                                )
                            }
                        ]}
                        title={''}
                        data={favoriteTours}
                        options={{
                            search: false,
                            paging: false,
                            pageSizeOptions: [],
                            paginationType: 'stepped',
                            padding: 'dense',
                            toolbar: false,
                            actionsColumnIndex: -1
                        }}
                        style={{
                            minWidth: '80%'
                        }}
                        actions={[
                            {
                                icon: () => (
                                    <HighlightOffIcon color="secondary" />
                                ),
                                tooltip: 'Remove',
                                onClick: (event, rowData) =>
                                    removeFavoriteTourById(rowData.id)
                            }
                        ]}
                    />
                </Container>
            </Grid>
        </Grid>
    );
};

Favorites.propTypes = {
    favoriteTours: PropTypes.array,
    getFavoriteTours: PropTypes.func,
    removeFavoriteTourById: PropTypes.func
};

const mapStateToProps = ({ favoriteTours }) => ({
    favoriteTours
});

const mapDispatchToProps = dispatch => ({
    getFavoriteTours: bindActionCreators(getFavoriteTours, dispatch),
    removeFavoriteTourById: bindActionCreators(removeFavoriteTourById, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
export { Favorites };
