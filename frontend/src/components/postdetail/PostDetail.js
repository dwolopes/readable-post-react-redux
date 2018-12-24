import React, { Component, Fragment } from 'react';
import { Route,  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Post from '../post/Post';
import Comment from '../comment/Comment';
import NewComment from '../newcomment/NewComment';
import avatar from '../../images/avatars/thingone.jpg';


const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
  },
  modal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
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
  addUser: {
    marginRight: theme.spacing.unit,
  },
  button: {
    borderColor: lightColor,
  },
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

class PostDetail extends Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    }

    render () {
        const { classes, post = {}, relatedComments = [] } = this.props;

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
                    <Grid item>
                      <IconButton color="inherit" className={classes.iconButtonAvatar}>
                        <Avatar className={classes.avatar} src={avatar} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Toolbar>
                <Toolbar>
                  <Grid container alignItems="center" spacing={8}>
                    <Grid item xs>
                      <Typography color="inherit" variant="h5">
                        Categorie: {post.category}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={this.props.history.goBack} 
                        className={classes.button} 
                        variant="outlined" 
                        color="inherit" 
                        size="small">
                        Home
                      </Button>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <br/>
              <Grid container direction="column" justify="center" alignItems="center">
                <Post post={post} isDetailedPost={true}/>
                <h2>Comments</h2>
                <Grid item>
                    {
                        relatedComments.map((comment) => <Comment key={comment.id} comment={comment}/>)
                    }
                </Grid>
              </Grid>
              <Grid  container direction="column" justify="center" alignItems="center">
                <Button
                    onClick={this.handleOpen} 
                    variant="contained" 
                    color="primary" 
                    className={classes.addUser}>
                        Add a Comment
                </Button>
                <br/>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.modal}>
                          <Route render={(props) => <NewComment {...props} post={post} onClose={this.handleClose} />} />
                    </div>
                </Modal>
              </Grid>
            </Fragment>
          )
    }
}

function mapStateToProps({ posts, comments }, props) {
    const { id } = props.match.params;
    let post = posts[id];
    let relatedComments;

    if(post) {
        relatedComments = Object.values(comments)
          .filter((comment) => comment.parentId === post.id && comment.deleted === false)
    } else {
        relatedComments = [];
    }

    return {
        post: !post ? [] : post,
        relatedComments
    }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(PostDetail));