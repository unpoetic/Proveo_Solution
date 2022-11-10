import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import mongoose from "mongoose";
import EmployeeModel from './Employees';



const mongoDB = "mongodb://127.0.0.1/employees";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once('open', (_: any) => {
    console.log('Database connected:', mongoDB)
  })
  
  db.on('error', (err: any) => {
    console.error('connection error:', err)
  })


const app = express();
const port = 8081;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Importing route
let routes = require('./EmployeesRoutes.ts'); 

//Register the route
routes(app); 

// Start the server
app.listen(port);
console.log('RESTful API demo server started on: ' + port);

// Get an instance of the express Router
var router = express.Router();


let employeesInfoRaw = fs.readFileSync('info.json');
let employeesInfo = JSON.parse(employeesInfoRaw);

let jData = employeesInfo.map((employee: any) =>{
    let dataModel = new EmployeeModel(employee);

    dataModel.save((err: any) => {
        if (err) return err;
        // saved!
      });
    return dataModel;
});

console.log(jData);


/*  app.get('/', (req, res) => {
    if(employeeInfo) {
        res.send(employeeInfo[1].firstName + " " + employeeInfo[1].lastName);
    } else {
        res.send('Hello World, from express');
    }
});*/

app.get('/employee-info', (_req: any, res: { setHeader: (arg0: string, arg1: string) => void; json: (arg0: any) => void; }) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(jData);
});

//create if it's not there
app.post('/employee-info-post', (req: { body: any; }, res: any) => {
    const employee = req.body;
    //console.log(employee);
   
    let employeesInfoRaw = fs.readFileSync('info.json');
    let employeesInfo = JSON.parse(employeesInfoRaw);

    let eInfo = [...employeesInfo, employee];
    
    let data = JSON.stringify(eInfo, null, 2);

    let new_employee = req.body;
    new_employee.save(function(err: any, task: any) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(task);
      }
    });

    
    fs.writeFile('info.json', data, (err: any) => {
        if (err) throw err;
        console.log('Data written to file');
    });

});

//update if editing
/*app.put('/employee-info', (req, res) => {
    const employee = req.body;
    console.log(employee);
    employeeInfo.push(employee);

    let data = JSON.stringify(employee, null, 2);

    fs.writeFile('info.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});

//remove
app.delete('employee-info', (req, res) => {
    const employee = req.body;
    console.log(employee);
    employeeInfo.push(employee);

    let data = JSON.stringify(employee, null, 2);

    fs.writeFile('info.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});
*/
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));