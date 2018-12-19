import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { handleAddPost } from '../../actions/posts';

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

class NewPost extends Component {

    state = {
        title: '',
        body: '',
        category: '',
        author: 'thingone'
    }

    componentDidMount () {
        const { post } = this.props;

        if(post) {
            this.setState({
                title: post.title,
                body: post.body,
                category: post.category
            })
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        let post = this.state;
        const { dispatch, onClose } = this.props;

        console.log("No Handle Submit", post);
        dispatch(handleAddPost(post));
        onClose();

    }

    render () {
        const { classes } = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit}>
                <h2>Add a new Post</h2>
                <Input
                    fullWidth
                    onChange={this.handleChange('title')}
                    value={this.state.title}
                    placeholder="Title"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Title'
                    }}
                />
                <TextField
                    fullWidth 
                    onChange={this.handleChange('body')}
                    id="post"
                    label="What is happening?"
                    multiline
                    rows="4"
                    value={this.state.body}
                    className={classes.input}
                    margin="normal"
                    inputProps={{
                        'aria-label': 'Post'
                    }}
                />
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="age-simple">Category</InputLabel>
                    <Select
                        value={this.state.category}
                        onChange={this.handleChange('category')}
                        inputProps={{
                            name: 'category',
                            id: 'category-simple',
                        }}
                    >
                        <MenuItem value={'react'}>React</MenuItem>
                        <MenuItem value={'redux'}>Redux</MenuItem>
                        <MenuItem value={'udacity'}>Udacity</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Button
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                        Post
                    </Button>
                </div>
            </form>
        );

    }
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(NewPost));