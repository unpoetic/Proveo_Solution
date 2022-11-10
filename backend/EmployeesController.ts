const mongoose__ = require("mongoose");

const Employee = mongoose__.model('Employees');


// Retrieve all the employees saved in the database
exports.getAllEmployees = function(req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; json: (arg0: any) => void; }) {
  Employee.find({}, function(err: any, employee: any) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.json(employee);
    }
  });
};

// Create a new employeee
exports.createEmployee = function(req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; json: { (arg0: any): void; new(): any; }; }; }) {
  let new_employee = new Employee(req.body);
  new_employee.save(function(err: any, task: any) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(task);
    }
  });
};

// Retrieve a task by taskId
exports.getEmployeeById = function(req: { params: { taskId: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: { errors: { domain: string; reason: string; message: string; description: string; }[]; err: any; code: number; }; }): void; new(): any; }; }; json: (arg0: any) => void; }) {
  Employee.findById(req.params.taskId, function(err: any, employee: any) {
    if (err) {
      res.status(404).send({ error: { errors: [ { domain: 'global', reason: 'notFound', message: 'Not Found', 
                            description: 'Couldn\'t find the requested taskId \'' + req.params.taskId + '\'' } ], err, code: 404 } })
    } else {
      res.json(employee);
    }
  });
};

// Edit a task by taskId
exports.editEmployeeById = function(req: { params: { taskId: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; json: (arg0: any) => void; }) {
  Employee.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err: any, task: any) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(task);
    }
  });
};

// Delete a task by taskId
exports.deleteEmployeeById = function(req: { params: { employeeId: any; taskId: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: { errors: { domain: string; reason: string; message: string; description: string; }[]; code: number; message: string; }; } | undefined): void; new(): any; }; }; }) {
Employee.remove({
    _id: req.params.employeeId
  }, function(err: any, employee: any) {
    if (err) {
      res.status(404).send({ error: { errors: [ { domain: 'global', reason: 'notFound', message: 'Not Found', 
                            description: 'Couldn\'t find the requested taskId \'' + req.params.taskId + '\'' } ], code: 404, message: 'Not Found' } })
    } else {
      res.status(204);
    }
  });
};