import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Post from '../post/Post';

import { sort } from '../../utils/helper';
import NewPost from '../newpost/NewPost';

const styles = theme => ({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
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


function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

class Dashboard extends Component {

    state = {
        open: false,
        query: ''
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    onChangeQuery = (query) => {
        this.setState({query: query.trim()});
    }

    render() {
        const { classes, posts = [], categoryExists } = this.props;
        let filteredPost = [];

        if(this.state.query){ 
            const match = new RegExp(escapeRegExp(this.state.query, 'i'))
            filteredPost = posts.filter(post => match.test(post.body));
        }

        if(categoryExists === false){
            return <Redirect to="/pageNotFound"/>
        }

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
                                    onChange={(event) => this.onChangeQuery(event.target.value)}
                                    fullWidth
                                    placeholder="Search Posts"
                                    InputProps={{
                                        disableUnderline: true,
                                        className: classes.searchInput,
                                    }}
                            />
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={this.handleOpen} 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.addUser}>
                                    What is happening? 
                                </Button>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <div style={getModalStyle()} className={classes.modal}>
                                        <Route render={(props) => <NewPost {...props} onClose={this.handleClose} />} />
                                    </div>
                                </Modal>
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
                        filteredPost.length > 0
                            ? filteredPost.map((post) => (<Post key={post.id} post={post}/>))
                            : this.props.posts.map((post) => (<Post key={post.id} post={post}/>))
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
    const { sortBy, order } = props.sorType;
    const { category } = props.match.params;
    let postsToSort = {};
    let categoryExists = false;

    if(!category) {
        postsToSort = Object.values(posts).filter((post) => post.deleted === false);
        categoryExists = true;
    } else if (category === 'react' || category === 'redux' || category === 'udacity') {
        postsToSort = Object.values(posts).filter(
            (post) => post.category === category && post.deleted === false);
        categoryExists = true;
    } else {
        postsToSort = [];
    }

    return {
        category,
        categoryExists,
        posts: sort(postsToSort, sortBy, order)
    }
}
  
export default connect(mapStateToProps)(withStyles(styles)(Dashboard));