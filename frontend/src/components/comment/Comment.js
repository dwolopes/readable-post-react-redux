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

import { handleUpdateVote } from '../../actions/comments';
import { formatDate } from '../../utils/helper';


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
  gridBody : {
    marginTop: 20
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

class Comment extends Component {

    clickToHandleVote = (option, comment) => {
        const { dispatch } = this.props;
        dispatch(handleUpdateVote({ option , id: comment.id }));
    }

    render () {
        const { classes, comment } = this.props;

        return (
            <Fragment>
                <Card className={classes.card}>
                    <Grid container spacing={32} className={classes.gridUser}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {comment.author}
                            </Typography>
                        </Grid>
                        <Grid item xs={10} container direction="column" spacing={16} className={classes.gridBody}>
                            <Typography className={classes.pos} color="textSecondary">  
                                {comment.body}
                            </Typography>
                            <Typography component="p">
                                {formatDate(comment.timestamp)}
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} direction="row" justify="flex-start" alignItems="flex-end">
                            <Grid item className={classes.gridRemoveEdit}>
                                <Button
                                    variant="contained" 
                                    color="secondary" 
                                    className={classes.button}>
                                        Remove
                                </Button>
                            </Grid>
                            <Grid item className={classes.gridRemoveEdit}>
                                <Button
                                    type="submit"
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button}>
                                        Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" justify="flex-end" alignItems="flex-end">
                        <CardActions>
                            <CommentIcon/>
                            <span>{comment.commentCount}</span>
                            <Button size="small" onClick={() => this.clickToHandleVote('upVote', comment)}>
                                <AddCircleOutlineIcon/>
                            </Button>
                            <p>{comment.voteScore}</p>
                            <Button onClick={() => this.clickToHandleVote('downVote', comment)}>
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

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps( undefinied , { comment }) {
    return {
        comment
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Comment));
