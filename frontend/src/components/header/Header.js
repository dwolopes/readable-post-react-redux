import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

class Header extends Component {

    state = {
      value : 0
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    componentDidMount () {
      const { pathname } = this.props.location;
      switch(pathname) {
        case '/react':
          return this.setState({value: 1});
        case '/redux':
          return this.setState({value: 2 });
        case '/udacity' :
          return this.setState({value: 3 });
        default:
          return this.setState ({ value: 0});
      }
    }
  

    render () {

        const { classes, onDrawerToggle } = this.props;
        const { value } = this.state;

        return (
            <Fragment>
              <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                  <Grid container spacing={8} alignItems="center">
                    <Hidden smUp>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={onDrawerToggle}
                          className={classes.menuButton}
                        >
                          <MenuIcon />
                        </IconButton>
                      </Grid>
                    </Hidden>
                    <Grid item xs />
                    <Grid item>
                      <Typography className={classes.link} component="a" href="#">
                        Top of the page
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Alerts • No alters">
                        <IconButton color="inherit">
                          <NotificationsIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
              >
                <Toolbar>
                  <Grid container alignItems="center" spacing={8}>
                    <Grid item xs>
                      <Typography color="inherit" variant="h5">
                        Categories
                      </Typography>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
              >
                <Tabs value={value} textColor="inherit" onChange={this.handleChange}>
                  <Tab textColor="inherit" label="Todos" component={Link}  to="/" />
                  <Tab textColor="inherit" label="React" component={Link}  to="/react"/>
                  <Tab textColor="inherit" label="Redux" component={Link}  to="/redux"/>
                  <Tab textColor="inherit" label="Udacity" component={Link}  to="/udacity"/>
                </Tabs>
              </AppBar>
            </Fragment>
          )
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);