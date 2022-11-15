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
	updatedData: any,
	data: Array<[]>[],
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
}

const EditEmployeeInfoModal = ({id, data, updatedData, firstName, lastName, email, age}: EmployeeInfoProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
	let [fName, setFirstName] = useState(firstName);
	let [lName, setLastName] = useState(lastName);
	let [email_, setEmail] = useState(email);
	let [age_, setAge] = useState(age);
	let [newData, setData] = useState(data);
	let [eMailValid, setIsEmailValid] = useState(true);
	let [ageValid, setAgeValid] = useState(true);
	let [firstNameValid, setFirstNameValid] = useState(true);
	let [lastNameValid, setLastNameValid] = useState(true);
	let [btnDisabled, setButtonDisabled] = useState(false);

	function resetFormState() {
		setFirstName(firstName);
		setLastName(lastName);
		setEmail(email);
		setAge(age);
		setIsEmailValid(true);
		setAgeValid(true);
		setFirstNameValid(true);
		setLastNameValid(true);
		setButtonDisabled(false);
	}

	function handleEmailChange  (input: string) {
		if(validateEmail(input)){
			email = input;
		console.log(email);
		console.log(input);
		setEmail(input);
		}
		return input;
	}

	function handleAgeChange  (input: number) :any {
		if(Number.isInteger(input)) {
			setAge(input);
			age = input;
			setAgeValid(true);
			console.log(age);
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
			console.log(input);
			console.log(fName);
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
			console.log(input);
			console.log(lName);
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
		if(fName && lName && email_ && age_) {
			//setButtonDisabled(false);
			return false;
		} else {
			return true;
			//setButtonDisabled(true);
		}
	}

    const editNewInfo = (): any => {
    	if(id && fName && lName && email && age){
			console.log("You did it!!");
			let postObject = {
				id:id,
				firstName: fName,
				lastName: lName,
				email: email_,
				age: age_
			};

			let url = 'http://127.0.0.1:8081/employees/' + id;
			fetch(url, {
				method: 'PUT',
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


				console.log("new data", data);
				setData(data);
				updatedData(data);
	
				//response.json()
			})
			.catch(error => {
				console.error('There was an error!', error);
			})
			.then(data => {
			});

			handleClose();
			resetFormState();
    	}
    }

    return (
		<React.Fragment>
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
					error={!firstNameValid}
					onChange={(event) => {handleFNameChange(event.target.value)}}
					id="outlined-search"
					label="First Name"
					defaultValue={firstName}
					helperText="Some important text"
					/>
				</Grid>
				<Grid item xs={3}>
				<TextField sx={txStyle}				
					error={!lastNameValid}
					onChange={(event) => {handleLNameChange(event.target.value)}}
					id="outlined-helperText"
					label="Last Name"
					defaultValue={lastName}
					helperText="Some important text"
					/>
				</Grid>
				<Grid item xs={3}>
				<TextField sx={txStyle}
					error = {!eMailValid}
					onChange={(event) => {handleEmailChange(event.target.value)}}
					id="outlined-helperText"
					label="Email"
					defaultValue={email}
					helperText="Some important text"
					/>
				</Grid>
				<Grid item xs={3}>
				<TextField sx={txStyle}
					error={!ageValid}
					onChange={(event) => {handleAgeChange(parseInt(event.target.value))}}
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
				<Button onClick={editNewInfo} size="large">Save</Button>
				<Button onClick = {handleClose} size="large">Cancel</Button>
				</Grid>
				</Grid>
			</Box>
			</Modal>
		</React.Fragment>
    );
  }

  
export default EditEmployeeInfoModal




