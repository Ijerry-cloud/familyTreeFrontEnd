import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar } from '@mui/material';



export default function InfoDialog (props) {
  
    return (
        <div>
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.bio?.full_name}
            </DialogTitle>
            <DialogContent>
            <Avatar
                alt="Remy Sharp"
                src={props.bio?.image}
                sx={{ width: "auto", height: "auto" }}
                variant="square"
            />
            <DialogContentText >
                <Typography><strong>Last Name:</strong> {props.bio?.last_name}</Typography>
            </DialogContentText>
            <DialogContentText >
                <Typography><strong>First Name:</strong> {props.bio?.first_name}</Typography>
            </DialogContentText>
            <DialogContentText >
                <Typography><strong>Gender:</strong> {props.bio?.gender}</Typography>
            </DialogContentText>
            <DialogContentText >
                <Typography><strong>Marital Status:</strong> {props.bio?.marital_status}</Typography>
            </DialogContentText>
            <DialogContentText >
                <Typography><strong>Date of Birth:</strong> {props.bio?.dob}</Typography>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleBio}>View Bio</Button>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </div>
            );
}        
