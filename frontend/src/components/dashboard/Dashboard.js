import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Post from '../post/Post';
import { sort } from '../../utils/helper';

const styles = theme => ({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing.unit,
    },
    dashboardWrapper: {
      margin: '40px 16px',
    }
});

class Dashboard extends Component {

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                 <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={16} alignItems="center">
                            <Grid item>
                                <SearchIcon className={classes.block} color="inherit" />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    placeholder="Search Posts"
                                    InputProps={{
                                        disableUnderline: true,
                                        className: classes.searchInput,
                                    }}
                            />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" className={classes.addUser}>
                                    What is happening? 
                                </Button>
                                <Tooltip title="Reload">
                                    <IconButton>
                                        <RefreshIcon className={classes.block} color="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <div className={classes.dashboardWrapper}>
                        {
                            this.props.posts.map((post) => (<Post key={post.id} post={post}/>))
                        }
                </div>              
            </Paper>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps ( { posts } , props) {
    const { category } = props.match.params;
    const { sortBy, order } = props.sorType;
    let postsToSort = {};

    if(!category) {
        postsToSort = Object.values(posts);
    } else {
        postsToSort = Object.values(posts).filter((post) => post.category === category);
    }

    return {
        category,
        posts:  sort(postsToSort, sortBy, order)
    }
}
  
export default connect(mapStateToProps)(withStyles(styles)(Dashboard));