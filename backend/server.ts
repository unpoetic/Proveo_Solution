import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 8081;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const getDataFromJson = () => {
	let employeesInfoRaw = fs.readFileSync('info.json',{encoding:'utf8', flag:'r'});
	let employeesInfo = JSON.parse(employeesInfoRaw);

	console.log(employeesInfo);
	return employeesInfo;
}


app.get('/employee-info', (_req: any, res: { setHeader: (arg0: string, arg1: string) => void; json: (arg0: any) => void; }) => {
    //console.log(employeesInfo);
	let info = getDataFromJson();

    res.setHeader('Content-Type', 'application/json');
    res.json(info);
});

//create if it's not there
app.post('/employees', (req: { body: any; }, res: any) => {
    const employee = req.body;
	let employeesInfo = getDataFromJson();
    let eInfo = [...employeesInfo, employee];
    let data = JSON.stringify(eInfo, null, 2);
    
    fs.writeFile('info.json', data, (err: any) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    res.status(201).json(data);

});

//update if editing
app.put('/employees/:id', (req: { body: any; }, res: any) => {
    const employee = req.body;
    console.log(employee);

    let employeesInfoRaw = fs.readFileSync('info.json',{encoding:'utf8', flag:'r'});
    let employeesInfo = JSON.parse(employeesInfoRaw);

    employeesInfo[employee.id] = employee;

    let data = JSON.stringify(employeesInfo, null, 2);

    fs.writeFile('info.json', data, (err: any) => {
      if (err) throw err;
      console.log('Data written to file');
    });

    res.status(201).json(data);
});


//remove
app.delete('/employees/:id', (req: { body: any; }, res: any) => {
	const employee = req.body;
	console.log(employee);

	let employeesInfoRaw = fs.readFileSync('info.json',{encoding:'utf8', flag:'r'});
	let employeesInfo = JSON.parse(employeesInfoRaw);
	let itemToBeRemoved = employeesInfo[employee.id];

	let newEmployeesInfo = employeesInfo.filter((item: any) => item !== itemToBeRemoved)

	console.log(employeesInfo);

	let data = JSON.stringify(newEmployeesInfo, null, 2);

	fs.writeFile('info.json', data, (err: any) => {
	if (err) throw err;
	console.log('Data written to file');
	});

	res.status(204).json(data);
});

app.listen(port, () => console.log(`Proveo Backend Up And Running at ${port}.`));