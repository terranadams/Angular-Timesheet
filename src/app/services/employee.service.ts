import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../interfaces/employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private db: AngularFirestore
  ) {}
  saveEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').add(employee);
}
}
/* 
To explain the method above in a little more detail, the saveEmployeeHours(employee: Employee) method accepts a 
parameter named employee which is of type Employee. Within that method, we are referencing this.db which is the 
AngularFirestore injection, calling the .collection('employee-hours') property which creates a referece to the 
emloyee-hours collection sense we are passing in 'employee-hours' to .collection(), and then finally we are calling 
.add(employee) which is actually posting the employee parameter (an object) to the employee-hours collection.
*/
