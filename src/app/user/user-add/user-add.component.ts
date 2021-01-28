import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';
import { Configuration } from 'src/app/app.configuration';
import { DataService } from 'src/shared/services/data-service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {

  departmentList = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngxNotificationService: NgxNotificationService,
    private dataService: DataService,
    private configuration: Configuration
  ) { }

  userForm: FormGroup;
  userMainArray = [];
  submitted: boolean = false;
  invalidUser: boolean = false;

  ngOnInit() {
    this.createForm();
    this.getDepartmentList();
  }

  // User Record Adding Method
  onSubmit(userForm) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let values = this.userForm.value;
    let registerModal = {
      Name: values.userName,
      Email: values.email,
      Department: Number(values.department),
      Dob: new Date(values.dob).toISOString()
    }
    this.dataService.add(this.configuration.addEmployee, registerModal).subscribe(
      (data: any) => {
        if (data.isSuccess == true) {
          this.ngxNotificationService.sendMessage('User created successfully.', 'dark', 'top-right');
          this.router.navigate(['list-user']);
        }
        else {
          this.ngxNotificationService.sendMessage('Something went wrong.', 'dark', 'top-right');
        }
      }, err => {

      });
  }

  getDepartmentList() {
    this.departmentList = [];
    this.dataService.getAll(this.configuration.departmentList).subscribe(
      (data: any) => {
        this.departmentList = data.data;
      }, err => {

      });
  }

  // User Record Add Cancel Method
  cancel() {
    this.router.navigate(['list-user']);
  }

  // User Form Initializing Method
  createForm() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

}
