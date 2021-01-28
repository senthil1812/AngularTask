import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../model/user";
import { NgxNotificationService } from 'ngx-notification';
import { Configuration } from 'src/app/app.configuration';
import { DataService } from 'src/shared/services/data-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  users: User[];
  userId: any;

  constructor(
    private router: Router,
    private ngxNotificationService: NgxNotificationService,
    private dataService: DataService,
    private configuration: Configuration
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.users = [];
    this.dataService.getAll(this.configuration.employeeList).subscribe(
      (data: any) => {
        this.users = data;
      }, err => {

      });
  }

  // User Delete Popup calling Method
  deleteUser(userId) {
    this.userId = userId;
  }

  // User Delete Confirmation Method
  deleteConfirm() {
    this.dataService.delete(this.userId, this.configuration.getEmployee + '/' + this.userId).subscribe(
      (data: any) => {
        this.ngxNotificationService.sendMessage('User deleted successfully.', 'dark', 'top-right');
        this.getUserList();
      }, err => {

      });
  };

  // User Delete Cancel Method
  deleteCancel() {
    this.userId = '';
  }

  // User Edit Method
  editUser(userId) {
    this.router.navigate(['edit-user', { userId: userId }]);
  };

  // User Add Method
  addUser() {
    this.router.navigate(['add-user']);
  };

  // User Logout Method
  logout() {
    this.router.navigate(['/']);
    this.ngxNotificationService.sendMessage('Logout successfully.', 'dark', 'top-right');
  }

}
