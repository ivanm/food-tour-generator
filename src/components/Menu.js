import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Material-UI Core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Material-UI Icons
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';

// Styles
const useStyles = makeStyles(() => ({
    drawer: {
        width: 200
    }
}));

const Menu = ({
    setIsDrawerOpen,
    isDrawerOpen,
    onNewSearchClick,
    onFavoritesClick
}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Restaurant Tour Generator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => {
                    setIsDrawerOpen(false);
                }}>
                <div
                    className={classes.drawer}
                    role="presentation"
                    onClick={() => setIsDrawerOpen(false)}
                    onKeyDown={() => setIsDrawerOpen(false)}>
                    <List>
                        <ListItem button onClick={onNewSearchClick}>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary={'New Tour'} />
                        </ListItem>
                        <ListItem button onClick={onFavoritesClick}>
                            <ListItemIcon>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Favorites'} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </Fragment>
    );
};

Menu.propTypes = {
    setIsDrawerOpen: PropTypes.func,
    isDrawerOpen: PropTypes.bool,
    onNewSearchClick: PropTypes.func,
    onFavoritesClick: PropTypes.func
};

export default Menu;
export { Menu };
