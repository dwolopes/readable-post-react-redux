import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PageNotFound from '../../images/page-not-found.png';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={PageNotFound}
                title="Page Not Found"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Sorry,
                    </Typography>
                    <Typography component="p">
                        The Page requested was not found in our server.Maybe, what you are looking for does
                        not exist anymore. Try again:
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to="/" size="small" color="primary">
                Go to Main Page
                </Link>
            </CardActions>
        </Card>
    </Grid>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
