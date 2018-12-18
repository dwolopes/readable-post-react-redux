import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
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
                    onChange={this.handleChange('title')}
                    value={this.state.title}
                    placeholder="Title"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Title'
                    }}
                />
                <Input
                    onChange={this.handleChange('body')}
                    value={this.state.body}
                    placeholder="What is happening"
                    className={classes.input}
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