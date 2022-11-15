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
	fetch('http://127.0.0.1:8081/employee-info')
	.then((response) => response.json())
	.then((data) => {
		setData(data);
	});
	}, []);

    const getNewData = (data: any) => {
        if(data)
            setData(JSON.parse(data));
    }

    return (
        <React.Fragment>
            <Box sx={{ minWidth: 275 }}>
            <AddEmployeeInfoModal data={data} updatedData={getNewData}></AddEmployeeInfoModal>
                {data.map((employee, i) => (
                    <Card sx={{marginBottom: '10px', paddingBottom: '10px', width: "500px"}} key={i} variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 24, fontWeight:'bold' }} color="text.secondary" gutterBottom>
                                {employee.firstName} {employee.lastName} : {employee.age}
                            </Typography>
                            <Typography sx={{lineHeight:"40px"}} variant="body2">
                                {employee.email}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Grid container spacing={1} columns={12}>
                            <Grid item xs={2}>
                            <Typography sx={{lineHeight:"40px", marginLeft:"5px"}} variant="body2">
                                {"www."}{employee.firstName}{employee.lastName}{".com"}
                            </Typography>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            
                            <Grid item xs={2}>
                                <EditEmployeeInfoModal data={data} id={i} updatedData={getNewData} firstName={employee.firstName } lastName={employee.lastName} email={employee.email} age={employee.age}></EditEmployeeInfoModal>
                            </Grid>
                            <Grid item xs={2}>
                            <DeleteEmployeeInfoModal data ={data} id={i} firstName={ employee.firstName } updatedData={getNewData}></DeleteEmployeeInfoModal>
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