import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users;
  err;
  success;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifications: NotificationService
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

  onUserClick(u_id) {
    this.notifications
      .sendNotification(u_id)
      .then(() => {
        this.success =
          'Send notification to ' +
          this.users.filter((u) => u.id == u_id)[0].name +
          ' success.';
      })
      .catch((err) => (this.err = JSON.stringify(err)));
  }
}
