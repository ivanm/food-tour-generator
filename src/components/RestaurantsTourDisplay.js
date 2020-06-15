import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

// Material-UI Core
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Toolbar from '@material-ui/core/Toolbar';

// Material-UI Icons
import ImageIcon from '@material-ui/icons/Image';

// Common
import Map from './Map';
import WeatherDisplay from './WeatherDisplay';

// Redux
import { getFavoriteTours } from '../redux/actions/favoriteToursActions';

// Styles
const useStyles = makeStyles(theme => ({
    tourDisplay: {
        display: 'flex',
        width: '100%',
        height: '100%',
        maxWidth: 845
    },
    tourDisplayContainer: {
        flexGrow: 1
    },
    nameEmptyImage: {
        width: 90,
        height: 90,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        margin: 8
    },
    paper: {
        padding: 25,
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    img: {
        width: 90,
        height: 90,
        padding: 8
    },
    mapContainer: {
        marginBottom: 13
    },
    tourItem: {},
    tourItemsContainer: {
        paddingRight: 22
    },
    tourNumber: {
        minWidth: 'auto',
        width: 24,
        padding: 0,
        marginTop: 8
    },
    divider: {
        width: '100%'
    },
    buttonsTop: {
        marginTop: 50,
        marginLeft: 20,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 13
        }
    },
    buttonsBottom: {
        marginBottom: 50,
        marginLeft: 20,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 13
        }
    },
    button: {
        marginTop: 10,
        [theme.breakpoints.down('xs')]: {
            fontSize: 10,
            padding: 2
        }
    },
    buttonGroup: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    buttonGroupItem: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 10,
            padding: 2
        }
    },
    downloadText: {
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: 10
        }
    }
}));

// Prints PDF from DOM
const printPDF = () => {
    const domElement = document.getElementById('printPdf');
    html2canvas(domElement, {
        useCORS: true,
        height: domElement.scrollHeight,
        onclone: document => {
            document.getElementById(
                'printPdf'
            ).parentNode.parentNode.style.height = 'auto';
            document.getElementById('printPdf').style.height = 'auto';
            document.getElementById('printPdf').scrollTo(0, 0);
        }
    }).then(canvas => {
        const img = canvas.toDataURL('image/png');

        const pdf = new jsPdf('p', 'mm');
        const pageHeight = 295;
        const imgProps = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let heightLeft = pdfHeight;

        pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        heightLeft = heightLeft - pageHeight;
        while (heightLeft >= 0) {
            const newPosition = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(img, 'JPEG', 0, newPosition, pdfWidth, pdfHeight);
            heightLeft = heightLeft - pageHeight;
        }

        pdf.save('your-filename.pdf');
    });
};

const jsonToCsv = json => {
    const array = typeof json != 'object' ? JSON.parse(json) : json;
    let str = '';
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
};

const RestaurantsTourDisplay = ({
    weather,
    favoriteTours,
    getFavoriteTours,
    tourRestaurants,
    onFinishTourClick,
    onSaveNewFavoriteTour,
    onBackToFavoritesClick,
    match,
    formValues,
    windowSize
}) => {
    const isFavoriteTour = !!(match && match.params && match.params.id);
    const dateFormatted = formValues.date && format(formValues.date, 'P');
    const classes = useStyles();
    const [restaurants, setRestaurants] = useState(tourRestaurants);
    const [weatherDayForecast, setWeatherDayForecast] = useState(
        dateFormatted && weather && weather.forecast
            ? weather.forecast.find(({ date }) => date == dateFormatted)
            : null
    );
    const [dateText, setDateText] = useState(
        formValues.date && format(formValues.date, 'PPP')
    );
    useEffect(() => {
        if (isFavoriteTour) {
            getFavoriteTours();
        }
    }, []);
    useEffect(() => {
        if (favoriteTours.length && isFavoriteTour) {
            const { restaurants, weatherForecast, date } = favoriteTours.find(
                ({ id }) => id == match.params.id
            );
            setRestaurants(restaurants);
            setWeatherDayForecast(weatherForecast);
            if (date) {
                setDateText(format(new Date(date), 'PPP'));
            }
        }
    }, [JSON.stringify(favoriteTours)]);
    const handleDownloadPdfClick = () => {
        printPDF();
    };
    const [isFavorite, setIsFavorite] = useState(false);
    const handleSaveAsFavoriteClick = () => {
        setIsFavorite(true);
        onSaveNewFavoriteTour(restaurants);
    };
    return (
        <Container className={classes.tourDisplay}>
            {restaurants && (
                <Grid container className={classes.tourDisplay}>
                    <Grid item component={Toolbar} />
                    <Grid
                        container
                        item
                        className={classes.tourDisplayContainer}>
                        <Grid
                            item
                            component={Paper}
                            className={classes.paper}
                            xs={9}
                            style={{
                                height: windowSize.height - 64
                            }}
                            id="printPdf">
                            {weatherDayForecast && (
                                <Grid container item justify="center">
                                    <WeatherDisplay
                                        forecast={weatherDayForecast}
                                        dateText={dateText}
                                    />
                                </Grid>
                            )}
                            <Grid container item justify="center">
                                <Map
                                    markerCoordinates={restaurants.map(item => [
                                        item.coordinates.longitude,
                                        item.coordinates.latitude
                                    ])}
                                    classes={classes}
                                />
                            </Grid>
                            <Grid container direction="column">
                                <Grid
                                    container
                                    item
                                    spacing={1}
                                    className={classes.tourItemsContainer}>
                                    {restaurants.map(
                                        (
                                            { name, id, location, image_url },
                                            index
                                        ) => (
                                            <Fragment key={id}>
                                                <Grid
                                                    item
                                                    container
                                                    className={
                                                        classes.tourItem
                                                    }>
                                                    <Grid item container xs={1}>
                                                        <Grid item>
                                                            <Button
                                                                className={
                                                                    classes.tourNumber
                                                                }
                                                                variant="outlined"
                                                                color="primary">
                                                                {index + 1}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item container xs={5}>
                                                        {image_url ? (
                                                            <img
                                                                className={
                                                                    classes.img
                                                                }
                                                                alt="complex"
                                                                src={image_url}
                                                            />
                                                        ) : (
                                                            <div
                                                                className={
                                                                    classes.nameEmptyImage
                                                                }>
                                                                <ImageIcon />
                                                            </div>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6} container>
                                                        <Grid
                                                            item
                                                            xs
                                                            container
                                                            direction="column"
                                                            spacing={2}>
                                                            <Grid item xs>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="subtitle1">
                                                                    {name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    gutterBottom>
                                                                    {location.display_address.join(
                                                                        ', '
                                                                    )}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container>
                                                    <Divider
                                                        className={
                                                            classes.divider
                                                        }
                                                    />
                                                </Grid>
                                            </Fragment>
                                        )
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={3} direction="row">
                            <Grid item container>
                                <div className={classes.buttonsTop}>
                                    <Typography
                                        component="div"
                                        className={classes.downloadText}
                                        variant="button">
                                        Download
                                    </Typography>
                                    <ButtonGroup
                                        className={classes.buttonGroup}
                                        variant="contained"
                                        orientation={
                                            windowSize.width < 600
                                                ? 'vertical'
                                                : 'horizontal'
                                        }
                                        color="primary"
                                        aria-label="contained primary button group">
                                        <Button
                                            className={classes.buttonGroupItem}
                                            onClick={handleDownloadPdfClick}>
                                            PDF
                                        </Button>
                                        <Button
                                            className={classes.buttonGroupItem}
                                            component="a"
                                            download="data.json"
                                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                                JSON.stringify(restaurants)
                                            )}`}>
                                            JSON
                                        </Button>
                                        <Button
                                            component="a"
                                            className={classes.buttonGroupItem}
                                            download="data.csv"
                                            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                                                jsonToCsv(restaurants)
                                            )}`}>
                                            CSV
                                        </Button>
                                    </ButtonGroup>
                                    {!isFavoriteTour && (
                                        <Button
                                            className={classes.button}
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            disabled={isFavorite}
                                            onClick={handleSaveAsFavoriteClick}>
                                            {isFavorite
                                                ? 'Saved'
                                                : 'Save as Favorite'}
                                        </Button>
                                    )}
                                    {isFavorite && (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            fullWidth
                                            onClick={onBackToFavoritesClick}>
                                            Back to Favorites
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                            <Grid item container alignItems="flex-end">
                                <div className={classes.buttonsBottom}>
                                    {isFavoriteTour ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            fullWidth
                                            onClick={onBackToFavoritesClick}>
                                            Favorites
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            fullWidth
                                            onClick={onFinishTourClick}>
                                            Search Again
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

RestaurantsTourDisplay.propTypes = {
    weather: PropTypes.object,
    match: PropTypes.object,
    tourRestaurants: PropTypes.array,
    getFavoriteTours: PropTypes.func,
    favoriteTours: PropTypes.array,
    onFinishTourClick: PropTypes.func,
    onSaveNewFavoriteTour: PropTypes.func,
    onBackToFavoritesClick: PropTypes.func,
    formValues: PropTypes.object,
    windowSize: PropTypes.object
};

const mapStateToProps = ({ favoriteTours, weather }) => ({
    weather,
    favoriteTours
});

const mapDispatchToProps = dispatch => ({
    getFavoriteTours: bindActionCreators(getFavoriteTours, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantsTourDisplay);

export { RestaurantsTourDisplay };
