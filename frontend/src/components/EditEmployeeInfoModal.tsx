import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


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

const txStyle = {
    marginTop: '30px'
};

const txRight = {
  textAlign:'center',
  paddingRight: '10px',
  marginTop: '15px'
};


type EmployeeInfoProps = {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
}

const EditEmployeeInfoModal = ({firstName, lastName, email, age}: EmployeeInfoProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <div>
        <Button variant="outlined" onClick={handleOpen} size="small">Edit</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Feel free to edit the information as you please.
            </Typography>
           
                           
            <Grid container spacing={1} columns={12}>
            <Grid item xs={3}>
            <TextField sx={txStyle}
                id="outlined-search"
                label="First Name"
                defaultValue={firstName}
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
                id="outlined-helperText"
                label="Last Name"
                defaultValue={lastName}
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
                id="outlined-helperText"
                label="Email"
                defaultValue={email}
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
                defaultValue={age}
                id="outlined-helperText"
                label="Age"
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={9}>
            <Button size="large">&nbsp;</Button>
            </Grid>
            <Grid sx={txRight} item xs={3}>
            <Button size="large">Save</Button>
            <Button onClick = {handleClose} size="large">Cancel</Button>
            </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }

  
export default EditEmployeeInfoModal




