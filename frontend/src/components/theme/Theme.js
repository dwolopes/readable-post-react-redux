import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import {Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Dashboard from '../dashboard/Dashboard';
import Header from '../header/Header';
import Navigator from '../navigator/Navigator';

let theme = createMuiTheme({
    typography: {
      useNextVariants: true,
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
  
  theme = {
    ...theme,
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: '#5300b7',
        },
      },
      MuiButton: {
        label: {
          textTransform: 'initial',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      MuiTabs: {
        root: {
          marginLeft: theme.spacing.unit,
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
      MuiTab: {
        root: {
          textTransform: 'initial',
          margin: '0 16px',
          minWidth: 0,
          [theme.breakpoints.up('md')]: {
            minWidth: 0,
          },
        },
        labelContainer: {
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: theme.spacing.unit,
        },
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 4,
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: '#404854',
        },
      },
      MuiListItemText: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      MuiListItemIcon: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20,
          },
        },
      },
      MuiAvatar: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      ...theme.mixins,
      toolbar: {
        minHeight: 48,
      },
    },
  };
  
  const drawerWidth = 256;
  
  const styles = () => ({
    root: {
      display: 'flex',
      minHeight: '100vh',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: 1,
      padding: '48px 36px 0',
      background: '#eaeff1',
    },
});

class Theme extends Component {

    state = {
        mobileOpen: false,
        sortBy: 'timestamp',
        order: 'descending'
    };
    
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render () {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Navigator PaperProps={{ style: { width: drawerWidth } }} handleChange={this.handleChange} sorType={this.state}/>
                    </Hidden>
                </nav>
                <div className={classes.appContent}>
                    <Route render={(props) => <Header {...props} onDrawerToggle={this.handleDrawerToggle} />}/>
                    <main className={classes.mainContent}>
                      <Route exact path='/' render={(props) => <Dashboard {...props} sorType={this.state} />} />
                      <Route exact path='/:category' render={(props) => <Dashboard {...props} sorType={this.state} />} />
                    </main>
                </div>
            </div>
        </MuiThemeProvider>

        )
    }
}

Theme.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Theme)