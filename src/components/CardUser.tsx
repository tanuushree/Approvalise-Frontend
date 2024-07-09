import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface ReviewCardProps {
  avatarText: string;
  title: string;
  subheader: string;
  content: string;
  description: any;
  imageUrl?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarText,
  title,
  subheader,
  content,
  description,
  imageUrl,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log(description)
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: '0 0 10px rgba(0,0,0,0.6)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {avatarText}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      {imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt="Paella dish"
        />
      )}
      <CardContent sx={{ color: 'white' }}>
        <Typography variant="body2" color="text.secondary">
          {description["approvers"]}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          className={`expand-icon ${expanded ? 'expanded' : ''}`}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {content}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ReviewCard;
