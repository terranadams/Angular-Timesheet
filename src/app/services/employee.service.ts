import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private db: AngularFirestore) {}
  saveEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').add(employee);
  }

  getEmployeeHoursByDepartment(departmentId: string): Observable<Employee[]> {
    const filteredEmployees = this.db.collection('employee-hours', (ref) =>
      ref.where('departmentId', '==', departmentId)
    );
    return filteredEmployees.snapshotChanges().pipe(
      map((items: DocumentChangeAction<Employee>[]): Employee[] => {
        return items.map(
          (item: DocumentChangeAction<Employee>): Employee => {
            return {
              id: item.payload.doc.id,
              departmentId,
              name: item.payload.doc.data().name,
              payRate: item.payload.doc.data().payRate,
              monday: item.payload.doc.data().monday,
              tuesday: item.payload.doc.data().tuesday,
              wednesday: item.payload.doc.data().wednesday,
              thursday: item.payload.doc.data().thursday,
              friday: item.payload.doc.data().friday,
              saturday: item.payload.doc.data().saturday,
              sunday: item.payload.doc.data().sunday,
            };
          }
        );
      })
    );
  }
  /* 
  To explain the method above in a little more detail, the saveEmployeeHours(employee: Employee) method accepts a 
  parameter named employee which is of type Employee. Within that method, we are referencing this.db which is the 
  AngularFirestore injection, calling the .collection('employee-hours') property which creates a referece to the 
  emloyee-hours collection sense we are passing in 'employee-hours' to .collection(), and then finally we are calling 
  .add(employee) which is actually posting the employee parameter (an object) to the employee-hours collection.
  */

  updateEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').doc(employee.id).set(employee);
  }

  deleteEmployeeHours(employee: Employee): any {
    this.db.collection('employee-hours').doc(employee.id).delete();
  }
}
