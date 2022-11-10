import React, { useState, useEffect } from 'react';
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
	age: number
}

const bigTxt = {
	fontSize:'25px'
}

const AddEmployeeInfoModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	let [fName, setFirstName] = useState('');
	let [lName, setLastName] = useState('');
	let [email, setEmail] = useState('');
	let [age, setAge] = useState('');

	const handleChange = (input: string): any => {
		setFirstName(input);
	}

    const addNewInfo = (): any => {
		let postObject = {};

		if(fName && lName && email && age){
			console.log("You did it!!");
			postObject = {
				firstName: fName,
				lastName: lName,
				email,
				age: parseInt(age)
			};
			console.log(postObject);

			const rawResponse = fetch('http://127.0.0.1:8080/employee', {
    			method: 'POST',
    			headers: {
      				'Accept': 'application/json',
      				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify(postObject)
  			});
  			
			const content = rawResponse;
  			console.log(content);

		}
    }

	function sayHi() {
		console.log("hi");
	}

    return (
      <div>
        <Button sx={bigTxt} variant="outlined" onClick={handleOpen} size="small">+</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please enter the information for another employee.
            </Typography>
           
                           
                   <Grid container spacing={1} columns={12}>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				onChange={(event) => {setFirstName(event.target.value)}}
                id="outlined-search"
                label="First Name"
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				onChange={(event) => {setLastName(event.target.value)}}
                id="outlined-helperText"
                label="Last Name"
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
						 onChange={(event) => {setEmail(event.target.value)}}
                id="outlined-helperText"
                label="Email"
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				onChange={(event) => {setAge(event.target.value)}}
                id="outlined-helperText"
                label="Age"
                helperText="Some important text"
                />
            </Grid>
            <Grid item xs={9}>
            <Button size="large">&nbsp;</Button>
            </Grid>
            <Grid sx={txRight} item xs={3}>
            <Button onClick={addNewInfo} size="large">Save</Button>
            <Button onClick = {handleClose} size="large">Cancel</Button>
            </Grid>
            
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }

  
export default AddEmployeeInfoModal

