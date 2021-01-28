import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxNotificationService } from 'ngx-notification';
import { DataService } from 'src/shared/services/data-service';
import { Configuration } from '../app.configuration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxNotificationService: NgxNotificationService,
    private dataService: DataService,
    private configuration: Configuration
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Login submit Method
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let values = this.loginForm.value;
    let signInModal = {
      UserName: values.userName,
      Password: values.password
    }
    this.dataService.add(this.configuration.login, signInModal).subscribe(
      (data: any) => {
        if (data.isSuccess == true) {
          this.router.navigate(['list-user']);
          this.ngxNotificationService.sendMessage('Login successfully.', 'dark', 'top-right');
        }
        else {
          this.invalidLogin = true;
          this.ngxNotificationService.sendMessage('Invalid credentials.', 'dark', 'top-right');
        }
      }, err => {

      });
  }

}
