const employeesList = require('./EmployeesController.ts');


module.exports = function(app: { route: (arg0: string) => { (): any; new(): any; get: { (arg0: any): { (): any; new(): any; post: { (arg0: any): void; new(): any; }; put: { (arg0: any): { (): any; new(): any; delete: { (arg0: any): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) {
  // Employees List Routes
  app.route('/employees')
    .get(employeesList.getAllEmployees)
    .post(employeesList.createEmployee);

  app.route('/employees/:employeeId')
    .get(employeesList.getEmployeeById)
    .put(employeesList.editEmployeeById)
    .delete(employeesList.deleteEmployeeById);
};