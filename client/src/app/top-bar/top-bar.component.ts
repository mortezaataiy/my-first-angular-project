import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  searchForm;
  isLogin = false;
  myNotifications;
  interval_id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifications: NotificationService
  ) {
    this.searchForm = this.formBuilder.group({
      text: '',
    });
  }

  ngOnInit() {
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
      })
      .catch((err) => console.error(err));
  }

  getIsLogin() {
    if (this.userService.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.interval_id) {
      clearInterval(this.interval_id);
    }
  }

  showNotifications() {
    window.alert('soon');
  }
  logOut() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
  search(text) {
    this.router.navigate(['/search', text]);
  }
}
