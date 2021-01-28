import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';
import { Configuration } from 'src/app/app.configuration';
import { DataService } from 'src/shared/services/data-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  departmentList = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngxNotificationService: NgxNotificationService,
    private dataService: DataService,
    private configuration: Configuration,
    private route: ActivatedRoute
  ) { }

  userForm: FormGroup;
  userMainArray = [];
  userId: any;
  submitted: boolean = false;
  invalidUser: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
    this.createForm();
    this.getById();
    this.getDepartmentList();
  }

  // User Updating Method

  onSubmit(userForm) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let values = this.userForm.value;
    let updateModal = {
      Id: Number(this.userId),
      Name: values.userName,
      Email: values.email,
      Department: Number(values.department),
      Dob: new Date(values.dob).toISOString()
    }
    this.dataService.update(this.userId, this.configuration.updateEmployee, updateModal).subscribe(
      (data: any) => {
        if (data.isSuccess == true) {
          this.ngxNotificationService.sendMessage('User updated successfully.', 'dark', 'top-right');
          this.router.navigate(['list-user']); this.router.navigate(['list-user']);
        }
        else {
          this.ngxNotificationService.sendMessage('Something went wrong.', 'dark', 'top-right');
        }
      }, err => {

      });
  }

  // User Update Cancel Method
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

  // User Record Getting Method
  getById() {
    this.dataService.getAll(this.configuration.getEmployee + '/' + this.userId).subscribe(
      (data: any) => {
        let department = String(data.data.department);
        this.userForm.patchValue({
          userName: data.data.name,
          email: data.data.email,
          department: department,
          dob: this.formatDate(data.data.dob),
        });
      }, err => {

      });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getDepartmentList() {
    this.departmentList = [];
    this.dataService.getAll(this.configuration.departmentList).subscribe(
      (data: any) => {
        this.departmentList = data.data;
      }, err => {

      });
  }

}
