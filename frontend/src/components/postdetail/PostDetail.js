import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Post from '../post/Post';
import Comment from '../comment/Comment';


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

class PostDetail extends Component {
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
                        Go to docs
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
                        <Avatar className={classes.avatar} src="/static/images/avatar/1.jpg" />
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
                      <Button className={classes.button} variant="outlined" color="inherit" size="small">
                        Home
                      </Button>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Help">
                        <IconButton color="inherit">
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <br/>
              <Grid container direction="column" justify="center" alignItems="center">
                <Post post={post}/>
                <h2>Comments</h2>
                <Grid item>
                    {
                        relatedComments.map((comment) => <Comment key={comment.id} comment={comment}/>)
                    }
                </Grid>
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
        relatedComments = Object.values(comments).filter((comment) => comment.parentId === post.id)
    } else {
        relatedComments = [];
    }

    return {
        post: !post ? [] : post,
        relatedComments
    }
}

export default connect(mapStateToProps)(withStyles(styles)(PostDetail));