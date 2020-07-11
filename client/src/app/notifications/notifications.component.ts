import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'notifications-component',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  myNotifications;
  last_notification_id_viewed;
  err;
  success;
  isLoading = true;
  interval_id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifications: NotificationService
  ) {}

  ngOnInit() {
    this.userService
      .getUser()
      .then(
        (user) =>
          (this.last_notification_id_viewed =
            user['last_notification_id_viewed'])
      );
    this.checkNotificarion();
    this.interval_id = window.setInterval(
      this.checkNotificarion.bind(this),
      3000
    );
  }
  checkNotificarion() {
    this.notifications
      .getNotifications()
      .then((my_notifications) => {
        this.myNotifications = my_notifications;
        this.notifications.setLastNotificationViewed(
          this.myNotifications[this.myNotifications.length - 1].id
        );
      })
      .catch((err) => console.error(err));
  }
  ngOnDestroy() {
    if (this.interval_id) {
      clearInterval(this.interval_id);
    }
  }
}
