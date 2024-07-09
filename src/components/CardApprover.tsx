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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

interface ReviewCardProps {
  avatarText: string;
  title: string;
  subheader: string;
  content: string;
  description: string;
  onApprove: () => Promise<void>;
  onReject: (reason: string) => Promise<void>;
  imageUrl?: string;
  status: "pending" | "approved" | "rejected"; // Add status prop
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarText,
  title,
  subheader,
  content,
  description,
  onApprove,
  onReject,
  imageUrl,
  status,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState("");
  const [popupError, setPopupError] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRejectReason("");
    setPopupError("");
  };

  const handleRejectClick = async () => {
    if (rejectReason.trim() === "") {
      setPopupError("Please provide a reason for rejection");
      return;
    }

    try {
      await onReject(rejectReason);
      handleClosePopup(); // Close popup on successful rejection
    } catch (error) {
      console.error("Error rejecting application:", error);
      // Handle error state if needed
    }
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
          alt="Image"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <Typography variant="body2" color="RedText">
          View in Detail
        </Typography>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            marginLeft: 'auto',
            transition: 'transform 0.3s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        {status === "pending" && (
          <>
            <Button variant="contained" color="primary" onClick={onApprove}>
              Approve
            </Button>
            <Button variant="contained" color="secondary" onClick={handleOpenPopup}>
              Reject
            </Button>
          </>
        )}
        {/* Optionally, you can add a conditional check for "approved" status to hide buttons */}
        {status === "approved" && (
          <Typography variant="body2" color="text.secondary">
            Approved
          </Typography>
        )}
      </CardActions>
      
      {/* Popup for rejection reason */}
      {showPopup && (
        <div className="popup">
          <input
            type="text"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="rejection"
            className="popup-input m-4"
          />
          {popupError && <p className="popup-error">{popupError}</p>}
          <div className="popup-buttons m-4">
            <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleRejectClick}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ReviewCard;
