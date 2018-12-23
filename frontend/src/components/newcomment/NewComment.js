import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Input } from '@material-ui/core';
import { connect } from 'react-redux';

import { formatComment } from '../../utils/api/comments';
import { handleEditComment} from '../../actions/comments';
import { handleAddComment } from '../../actions/shared';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

class NewComment extends Component {

    state = {
        body: '',
        author: ''
    }

    componentDidMount () {
        const { comment } = this.props;

        if(comment) {
            this.setState({
                body: comment.body,
                author: comment.author
            })
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = e => {         
        e.preventDefault();
        const { dispatch, onClose, comment, post } = this.props;

        let newComment = this.state;
        let formatedComment = {};

        if (comment) {
            dispatch(handleEditComment(comment.id, newComment));
        } else {
            formatedComment = formatComment(newComment, post.id);
            dispatch(handleAddComment(formatedComment));
        }
        this.forceUpdate(); 
        onClose();
    }

    render () {
        const { classes } = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit}>
                <h2>Add a new Comment</h2>
                <TextField
                    fullWidth 
                    onChange={this.handleChange('body')}
                    id="comment"
                    label="Do you wanna add something?"
                    multiline
                    rows="4"
                    value={this.state.body}
                    className={classes.input}
                    margin="normal"
                    inputProps={{
                        'aria-label': 'Comment'
                    }}
                />
                <Input
                    fullWidth
                    onChange={this.handleChange('author')}
                    value={this.state.author}
                    placeholder="Author"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'author'
                    }}
                />
                <div>
                    <Button
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        // Pq não this.props.onClose()
                        onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                        Save
                    </Button>
                </div>
            </form>
        );

    }
}

NewComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(NewComment));