import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    var token = userService.getToken();
    if (token) {
      this.router.navigate(['/profile']);
    }
    this.loginForm = this.formBuilder.group({
      userId: '',
      pass: '',
    });
  }

  ngOnInit() {}

  onSubmit(loginData) {
    if (!loginData.userId) {
      window.alert("UserId can't empty!");
      return;
    }
    if (!loginData.pass) {
      window.alert("Pass can't empty!");
      return;
    }
    this.userService
      .login(loginData.userId, loginData.pass)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        if (err.userId == 'IS_NOT_VALID') {
          window.alert('UserId is invalid!');
        } else if (err.pass == 'IS_NOT_VALID') {
          window.alert('Pass is invalid!');
        } else if (err.user == 'NOT_FOUND') {
          window.alert('dont match any user with this userId and pass');
        } else {
          window.alert(JSON.stringify(err));
        }
      });
  }
}
