import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddEmployeeInfoModal from './AddEmployeeInfoModal';
import EditEmployeeInfoModal from './EditEmployeeInfoModal';
import DeleteEmployeeInfoModal from './DeleteEmployeeInfoModal';
import Grid from '@mui/material/Grid';

interface Employee {
	firstName: string;
	lastName: string;
}


 const EmployeeInfoCard = () =>{

	const [data, setData] = useState<any[]>([{firstName: ''}]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	useEffect(() => {
	fetch('http://127.0.0.1:8080/employee-info')
	.then((response) => response.json())
	.then((data) => {
		setData(data);
	});
	}, []);
    return (
        <React.Fragment>
            <Box sx={{ minWidth: 275, marginBottom:"10px" }}>
            <AddEmployeeInfoModal></AddEmployeeInfoModal>
                {data.map((employee) => (
                    <Card key={employee._id} variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 24, fontWeight:'bold' }} color="text.secondary" gutterBottom>
                                {employee.firstName} {employee.lastName} : {employee.age}
                            </Typography>
                            <Typography variant="body2">
                                {employee.email}
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Grid container spacing={1} columns={12}>
                            <Grid item xs={6}>
                                <EditEmployeeInfoModal firstName={employee.firstName } lastName={employee.lastName} email={employee.email} age={employee.age}></EditEmployeeInfoModal>
                            </Grid>
                            <Grid item xs={6}>
                            <DeleteEmployeeInfoModal firstName={employee.firstName } lastName={employee.lastName} email={employee.email} age={employee.age}></DeleteEmployeeInfoModal>
                            </Grid>
                        </Grid>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </React.Fragment>
    );
}

export default EmployeeInfoCard;