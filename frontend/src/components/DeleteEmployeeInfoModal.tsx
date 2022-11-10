import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { IconButton } from '@mui/material';
import EmployeeInfoCard from './EmployeeInfoCard';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const style = {
  position: 'absolute' as 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexGrow: 1
};

const btnTxt = {
    textAlign: 'center'
};

const txStyle = {
    marginBottom: '30px',
    textAlign: 'center'
};

const icon = {
    float:'right',
    width:'100px'

};

type EmployeeInfoProps = {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
}

const DeleteEmployeeInfoModal = ({firstName, lastName, email, age}: EmployeeInfoProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <div>
        <Button variant="outlined" onClick={handleOpen} size="small">Delete</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <Typography sx={txStyle} id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete {firstName}'s info?
            </Typography>
           
                           
            <Grid sx={btnTxt} container spacing={2} columns={12}>
            <Grid item xs={6}>
            <Button size="large">Yes</Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick = {handleClose} size="large">No</Button>
            </Grid>
            
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }

export default DeleteEmployeeInfoModal;



