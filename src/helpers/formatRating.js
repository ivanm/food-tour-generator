import React from 'react';

// Material-UI Core
import Typography from '@material-ui/core/Typography';

// Material-UI Icons
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export const formatRating = (rating, classes) => (
    <div>
        <div className="ratingStars">
            {Array(parseInt(rating))
                .fill()
                .map((_, index) => (
                    <StarIcon
                        className={classes.ratingStar}
                        fontSize="small"
                        key={index}
                    />
                ))}
            {parseInt(rating) / rating != 1 && (
                <StarHalfIcon className={classes.ratingStar} fontSize="small" />
            )}
            {Array(parseInt(5 - rating))
                .fill()
                .map((_, index) => (
                    <StarBorderIcon
                        className={classes.ratingStar}
                        fontSize="small"
                        key={index}
                    />
                ))}
        </div>
        <Typography variant="caption" className={classes.ratingText}>
            {rating.toFixed(1)}
        </Typography>
    </div>
);
