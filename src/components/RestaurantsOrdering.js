import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Draggable } from 'react-smooth-dnd';
import arrayMove from 'array-move';

// Material-UI Core
import MUContainer from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

// Material-UI Icons
import DragHandleIcon from '@material-ui/icons/DragHandle';

// Helpers
import { formatMeters } from '../helpers/formatMeters';
import { formatRating } from '../helpers/formatRating';

// Styles
const useStyles = makeStyles({
    ordering: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    tableContainer: {
        width: 'auto',
        maxHeight: 358,
        overflowX: 'auto'
    },
    buttons: {
        width: '100%',
        marginTop: 16,
        justifyContent: 'space-evenly',
        display: 'flex',
        marginBottom: 20
    },
    ratingStar: {
        color: '#ca7919',
        fontSize: '1rem'
    },
    ratingText: {
        color: '#ca7919'
    },
    pageTitle: {
        textAlign: 'center',
        marginTop: 20
    },
    pageSubtitle: {
        marginBottom: 7
    }
});

const RestaurantsOrdering = ({
    tourRestaurants,
    onSelectAgainClick,
    onCreateTourClick
}) => {
    // Hooks
    const classes = useStyles();
    const [items, setItems] = useState(
        tourRestaurants.sort((a, b) => a.distance - b.distance)
    );

    // Methods
    const onDrop = ({ removedIndex, addedIndex }) => {
        setItems(items => arrayMove(items, removedIndex, addedIndex));
    };
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
                    Ordering
                </Typography>
                <Typography
                    variant="subtitle1"
                    className={classes.pageSubtitle}>
                    Select the tour items order
                </Typography>
            </Grid>
            <Grid item container alignItems="center" xs>
                <MUContainer className={classes.ordering}>
                    <div id="print-pfd">
                        <TableContainer
                            component={Paper}
                            className={classes.tableContainer}>
                            <Table aria-label="custom pagination table">
                                <Container
                                    dragHandleSelector=".drag-handle"
                                    lockAxis="y"
                                    onDrop={onDrop}
                                    render={ref => (
                                        <TableBody ref={ref}>
                                            {items.map(
                                                ({
                                                    id,
                                                    name,
                                                    distance,
                                                    rating
                                                }) => (
                                                    <Draggable
                                                        key={id}
                                                        render={() => (
                                                            <TableRow key={id}>
                                                                <TableCell
                                                                    style={{
                                                                        width: 50
                                                                    }}
                                                                    component="th"
                                                                    className="drag-handle"
                                                                    scope="row">
                                                                    <DragHandleIcon />
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{
                                                                        width: 300
                                                                    }}>
                                                                    {name}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{
                                                                        width: 100
                                                                    }}>
                                                                    {formatMeters(
                                                                        distance
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{
                                                                        width: 150,
                                                                        textAlign:
                                                                            'end'
                                                                    }}>
                                                                    {formatRating(
                                                                        rating,
                                                                        classes
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    />
                                                )
                                            )}
                                        </TableBody>
                                    )}
                                />
                            </Table>
                        </TableContainer>
                    </div>
                </MUContainer>
            </Grid>
            <Grid item>
                <div className={classes.buttons}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onSelectAgainClick}>
                        Select Again
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={onCreateTourClick(items)}
                        className={classes.backToSearch}>
                        Create Tour
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

RestaurantsOrdering.propTypes = {
    tourRestaurants: PropTypes.array,
    onSelectAgainClick: PropTypes.func,
    onCreateTourClick: PropTypes.func
};

export default RestaurantsOrdering;
