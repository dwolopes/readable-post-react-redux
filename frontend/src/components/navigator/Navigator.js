import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const categories = [
    {
      id: 'Develop',
      children: [
        { id: 'Authentication', icon: <PeopleIcon />, active: true },
        { id: 'Database', icon: <DnsRoundedIcon /> },
        { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
        { id: 'Hosting', icon: <PublicIcon /> },
        { id: 'Functions', icon: <SettingsEthernetIcon /> },
        { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
      ],
    },
    {
      id: 'Quality',
      children: [
        { id: 'Analytics', icon: <SettingsIcon /> },
        { id: 'Performance', icon: <TimerIcon /> },
        { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
      ],
    },
  ];
  
const styles = theme => ({
    categoryHeader: {
      paddingTop: 16,
      paddingBottom: 16,
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 4,
      paddingBottom: 4,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: 16,
      paddingBottom: 16,
    },
    firebase: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.common.white,
    },
    divider: {
      marginTop: theme.spacing.unit * 2,
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    select: {
      color: 'white'
    },
    label: {
      color: 'white'
    },
    helper: {
      color: 'white'
    }
});

class Navigator extends Component {

    state = {
      sortBy: '',
      order: '',
      name: 'hai',
      labelWidth: 0,
    };
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
      console.log(this.state);
    };
  

      render () {

        const { classes, ...other } = this.props;

        return (
            <Drawer variant="permanent" {...other}>
                <List disablePadding>
                    <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
                      Readable
                    </ListItem>
                    <ListItem className={classNames(classes.item, classes.itemCategory)}>
                      <ListItemIcon>
                          <HomeIcon />
                      </ListItemIcon>
                      <ListItemText
                          classes={{
                          primary: classes.itemPrimary,
                          }}
                      >
                          Sort By
                      </ListItemText>
                    </ListItem>
                    <form className={classes.root} autoComplete="off">
                      <FormControl className={classes.formControl}>
                        <InputLabel className={classes.label} htmlFor="sortby-helper">Sort by</InputLabel>
                        <Select
                          value={this.state.sortBy}
                          onChange={this.handleChange}
                          input={<Input name="sortBy" id="sortby-helper" />}
                        >
                          <MenuItem value={'date'}>Date</MenuItem>
                          <MenuItem value={'title'}>Title</MenuItem>
                          <MenuItem value={'votes'}>Votes</MenuItem>
                          <MenuItem value={'comments'}>Comments</MenuItem>
                        </Select>
                        <FormHelperText className={classes.helper}>Choose how you want to sort posts</FormHelperText>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel className={classes.label} htmlFor="order-helper">Order in </InputLabel>
                        <Select
                          value={this.state.order}
                          onChange={this.handleChange}
                          input={<Input name="order" id="order-helper" />}
                        >
                          <MenuItem value={'descending'}>Descending</MenuItem>
                          <MenuItem value={'ascending'}>Ascending</MenuItem>
                        </Select>
                        <FormHelperText className={classes.helper}>Choose the order</FormHelperText>
                      </FormControl>
                    </form>
                </List>
            </Drawer>
        )
      }
}

  Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Navigator);