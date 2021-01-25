import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Employee } from '../team/dash-board/employees/employee.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userIsAuthencated = false;
  private user: Employee;
  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  login(email: string, password: string) {

    this.firestore.collection<Employee>('users', ref => ref.where('email', '==', email).where('password', '==', password)).snapshotChanges()
      .pipe(map(actions => actions.map(resultData => {
        const id = resultData.payload.doc.id;
        const data = resultData.payload.doc.data();
        return { id, ...data }

      }))).subscribe(respons => {
        this.user = respons[0];
        console.log(this.user)
        if (respons.length >= 1) {
          this.userIsAuthencated = true;
          this.router.navigate(['/', 'team', 't', 'dash-board', 'schedule'])
        } else {
          console.log("no user found")
        }

      });
  }
  getEmployee() {
    return this.user;
  }

  get isUserAuthnticated() {
    return this.userIsAuthencated;
  }

  logout() {
    this.userIsAuthencated = false;
    this.user = null;
    this.router.navigateByUrl('/login');
  }
}
