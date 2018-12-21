import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostDetail extends Component {
    render () {
        console.log(this.props)
        return (
            <div>
                New Post Page
            </div>
        )
    }
}

function mapStateToProps({posts, comments}, props) {
    const { id } = props.match.params;
    let post = posts[id];
    console.log(comments);
    let relatedComments = 
        Object.values(comments).filter((comment) => comment.parentId === post.id)

    return {
        relatedComments
    }
}

export default connect(mapStateToProps)(PostDetail);