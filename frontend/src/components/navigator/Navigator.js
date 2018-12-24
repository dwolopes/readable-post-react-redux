import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SortIcon from '@material-ui/icons/Sort';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
  
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
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: 16,
      paddingBottom: 16,
      color: 'white'
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
      color: 'black'
    }
});

class Navigator extends Component {

      render () {

        const { classes, handleChange, sorType, ...other } = this.props;

        return (
            <Drawer variant="permanent" {...other}>
                <List disablePadding>
                    <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
                      Readable
                    </ListItem>
                    <ListItem className={classNames(classes.item, classes.itemCategory)}>
                      <ListItemIcon>
                          <SortIcon />
                      </ListItemIcon>
                      <ListItemText
                          classes={{
                          primary: classes.itemPrimary,
                          }}
                      >
                          Filter
                      </ListItemText>
                    </ListItem>
                    <form className={classes.root} autoComplete="off">
                      <FormControl className={classes.formControl}>
                        <InputLabel className={classes.label} htmlFor="sortby-helper">Sort by</InputLabel>
                        <Select
                          value={sorType.sortBy}
                          onChange={handleChange}
                          input={<Input name="sortBy" id="sortby-helper" />}
                          className={classes.select}
                        >
                          <MenuItem value={'timestamp'}>Date</MenuItem>
                          <MenuItem value={'title'}>Title</MenuItem>
                          <MenuItem value={'voteScore'}>Votes</MenuItem>
                          <MenuItem value={'commentCount'}>Comments</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel className={classes.label} htmlFor="order-helper">Order in </InputLabel>
                        <Select
                          value={sorType.order}
                          onChange={handleChange}
                          input={<Input name="order" id="order-helper" />}
                          className={classes.select}
                        >
                          <MenuItem value={'descending'}>Descending</MenuItem>
                          <MenuItem value={'ascending'}>Ascending</MenuItem>
                        </Select>
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