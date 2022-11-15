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
    data: Array<[]>[],
	updatedData: any
}

const bigTxt = {
	fontSize:'25px'
}

const AddEmployeeInfoModal = ({data, updatedData}: EmployeeInfoProps)  => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	let [fName, setFirstName] = useState('');
	let [lName, setLastName] = useState('');
	let [email, setEmail] = useState('');
	let [age, setAge] = useState(0);
	let [newData, setData] = useState(data);
	let [eMailValid, setIsEmailValid] = useState(false);
	let [ageValid, setAgeValid] = useState(false);
	let [firstNameValid, setFirstNameValid] = useState(false);
	let [lastNameValid, setLastNameValid] = useState(false);
	let [btnDisabled, setButtonDisabled] = useState(true);

	function resetFormState() {
		setFirstName('');
		setLastName('');
		setEmail('');
		setAge(0);
		setIsEmailValid(false);
		setAgeValid(false);
		setFirstNameValid(false);
		setLastNameValid(false);
		setButtonDisabled(true);
	}

	function handleEmailChange  (input: string) {
		if(validateEmail(input)){
			email = input;
		//console.log(email);
		//console.log(input);
		setEmail(input);
		}
		return input;
	}

	function handleAgeChange  (input: number) :any {
		if(Number.isInteger(input)) {
			setAge(input);
			age = input;
			setAgeValid(true);
			//console.log(age);
			return true;
		} else {
			setAgeValid(false);
			return false;
		}
	}

	function handleFNameChange  (input: string) :any {
		if(/^[A-Za-z]+$/.test(input)) {
			setFirstNameValid(true);
			fName = input;
			//console.log(input);
			//console.log(fName);
			setFirstName(input);
			return true;
		} else {
			setFirstNameValid(false);
			return false;
		}
	}

	function handleLNameChange  (input: string) :any {
		if(/^[A-Za-z]+$/.test(input)) {
			setLastNameValid(true);
			lName = input;
			//console.log(input);
			//console.log(lName);
			setLastName(input);
			return true;
		} else {
			setLastNameValid(false);
			return false;
		}
	}

	const validateEmail = (mail: string) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			setIsEmailValid(true);
			setEmail(mail);
			return true;
		}

		setIsEmailValid(false);
		return false;
	}


	const disableButton = () => {
		if(fName && lName && email && age) {
			//setButtonDisabled(false);
			return false;
		} else {
			return true;
			//setButtonDisabled(true);
		}
	}

    const addNewInfo = (): any => {
		let postObject = {};
    	if(data) {
        	setData(data);

        console.log(data.length);
    	}

		if(fName && lName && email && age){
			console.log("You did it!!");
			postObject = {
        		id:data.length,
				firstName: fName,
				lastName: lName,
				email: email,
				age: age
			};
      
      		//for creating a new thing, post
			const rawResponse = fetch('http://127.0.0.1:8081/employees', {
    			method: 'POST',
    			headers: {
      				'Accept': 'application/json',
      				'Content-Type': 'application/json'
    			},
    			body: JSON.stringify(postObject)
  			})
			.then(async response => {
				const isJson = response.headers.get('content-type')?.includes('application/json');
				const data = isJson && await response.json();
		
				// check for error response
				if (!response.ok) {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}

				setData(data);
				updatedData(data);
	
			})
			.catch(error => {
				console.error('There was an error!', error);
			});


			setOpen(false);
			resetFormState();
		}
    }

    return (
      <React.Fragment>
        <Button sx={bigTxt} variant="outlined" onClick={handleOpen} size="small">+</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please enter the information for another contact.
            </Typography>
           
                           
                   <Grid container spacing={1} columns={12}>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				error={!firstNameValid}
				onChange={(event) => {handleFNameChange(event.target.value)}}
                id="outlined-search"
                label="First Name"
                helperText="A-Z, a-z characters only"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				error={!lastNameValid}
				onChange={(event) => {handleLNameChange(event.target.value)}}
                id="outlined-helperText"
                label="Last Name"
                helperText="A-Z, a-z characters only"
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				error = {!eMailValid}
				onChange={(event) => {handleEmailChange(event.target.value)}}
                id="outlined-helperText"
                label="Email"
                helperText={"Enter a valid e-mail."}
                />
            </Grid>
            <Grid item xs={3}>
            <TextField sx={txStyle}
				error={!ageValid}
				onChange={(event) => {handleAgeChange(parseInt(event.target.value))}}
                id="outlined-helperText"
                label="Age"
                helperText="Enter a valid age."
                />
            </Grid>
            <Grid item xs={9}>
            <Button size="large">&nbsp;</Button>
            </Grid>
            <Grid sx={txRight} item xs={3}>
            <Button disabled={disableButton()} onClick={addNewInfo} size="large">Save</Button>
            <Button onClick = {handleClose} size="large">Cancel</Button>
            </Grid>
            
            </Grid>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  
export default AddEmployeeInfoModal


