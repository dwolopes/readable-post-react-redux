import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Avatar from '@material-ui/core/Avatar';

import { formatDate } from '../../utils/helper';
import { handleUpdateVote } from '../../actions/posts';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    margin: 10,
  }
};

class Post extends Component {

    clickToHandleVote = (option, post) => {
        const { dispatch } = this.props;
        dispatch(handleUpdateVote({ option , id: post.id }));
    }

    render () {
        const { classes, post } = this.props;

        return (
            <Fragment>
                <Card className={classes.card}>
                    <Grid container spacing={24} alignItems="center" > 
                        <Grid item xs={16} sm container>
                            <CardContent>
                                <Grid container spacing={32} alignItems="center">
                                    <Grid item > 
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {post.author}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" component="h2">
                                            {post.title}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {post.body}
                                        </Typography>
                                        <Typography component="p">
                                            {formatDate(post.timestamp)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end" alignItems="flex-end">
                            <CardActions>
                                <CommentIcon/>
                                <span>{post.commentCount}</span>
                                <Button size="small" onClick={() => this.clickToHandleVote('upVote', post)}>
                                    <AddCircleOutlineIcon/>
                                </Button>
                                    <p>{post.voteScore}</p>
                                <Button onClick={() => this.clickToHandleVote('downVote', post)}>
                                    <RemoveCircleOutlineIcon/>
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
              </Card>
              <br/>
            </Fragment>
        )
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps( undefinied , { post }) {
    return {
        post
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Post));

