import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users;
  err;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userService
        .search(params.get('text'))
        .then((users) => {
          this.users = users;
        })
        .catch((err) => (this.err = JSON.stringify(err)));
    });
  }

  onUserClick(id) {
    window.alert(id);
  }
}
