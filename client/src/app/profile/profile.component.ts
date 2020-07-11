import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editProfileForm;
  isInEditMode = false;
  err;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: '',
    });
    this.userService
      .getUser()
      .then((user) => {
        if (!user) {
          this.err = 'user not found in profile page';
          router.navigate(['/login']);
          return;
        }
        this.editProfileForm = this.formBuilder.group({
          name: user['name'],
        });
      })
      .catch((err) => {
        this.err = 'get user err profile page: ' + JSON.stringify(err);
        router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.isInEditMode = false;
  }

  gotoEditMode() {
    this.isInEditMode = true;
  }

  onSubmit(editProfileData) {
    this.userService
      .updateProfile(editProfileData.name)
      .then((user) => {
        if (!user) {
          this.err = 'user not found in profile page';
          this.router.navigate(['/login']);
          return;
        }
        this.editProfileForm = this.formBuilder.group({
          name: user['name'],
        });
        this.isInEditMode = false;
      })
      .catch((err) => {
        this.err = JSON.stringify(err);
      });
  }
}
