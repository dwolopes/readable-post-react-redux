import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import { Route, Link } from 'react-router-dom';

import { formatDate } from '../../utils/helper';
import { handleUpdateVote, handleRemoveVote } from '../../actions/posts';
import NewPost from '../newpost/NewPost';


const styles = theme => ({
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
    margin: 10
  },
  gridUser : {
      marginLeft: 20,
      paddingRight: 50
  },
  gridRemoveEdit: {
    paddingTop:50,
    padding: 5
  },
  modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
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

class Post extends Component {

    state = {
        open: false,
    };

    clickToHandleVote = (option, post) => {
        const { dispatch } = this.props;
        dispatch(handleUpdateVote({ option , id: post.id }));
    }

    clickToHandleRemovePost = (id) =>{
        const { dispatch } = this.props;
        dispatch(handleRemoveVote(id));
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render () {
        const { classes, post } = this.props;

        return (
            <Fragment>
                <Card className={classes.card}>
                    <Grid container spacing={32} className={classes.gridUser}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {post.author}
                            </Typography>
                        </Grid>
                        <Grid item xs={10} container direction="column" spacing={16}>
                            <Link to={`posts/${post.id}`}>
                                <Typography variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                            </Link>
                            <Typography className={classes.pos} color="textSecondary">  
                                {post.body}
                            </Typography>
                            <Typography component="p">
                                {formatDate(post.timestamp)}
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} direction="row" justify="flex-start" alignItems="flex-end">
                            <Grid item className={classes.gridRemoveEdit}>
                                <Button
                                    onClick={() => this.clickToHandleRemovePost(post.id)}
                                    variant="contained" 
                                    color="secondary" 
                                    className={classes.button}>
                                        Remove
                                </Button>
                            </Grid>
                            <Grid item className={classes.gridRemoveEdit}>
                                <Button
                                    onClick={this.handleOpen} 
                                    type="submit"
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button}>
                                        Edit
                                </Button>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <div style={getModalStyle()} className={classes.modal}>
                                        <Route render={(props) => <NewPost {...props} onClose={this.handleClose} post={post}/>} />
                                    </div>
                                </Modal>
                            </Grid>
                        </Grid>
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

