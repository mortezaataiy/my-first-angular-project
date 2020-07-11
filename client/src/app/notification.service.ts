import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Config } from './config';
import { rejects } from 'assert';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private config: Config,
    private user: UserService
  ) {}

  getNotifications() {
    return new Promise((res, rej) => {
      if (!this.user.token) {
        rej(null);
        return;
      }
      var req = this.http.post(
        this.config.host + this.config.notificationsUrl,
        {},
        {
          headers: new HttpHeaders({
            Authorization: this.user.token,
          }),
        }
      );
      req.subscribe((response) => {
        if (response['success']) {
          res(response['notifications']);
        } else {
          rej(response);
        }
      });
    });
  }

  sendNotification(u_id) {
    return new Promise((res, rej) => {
      if (!this.user.token) {
        rej(null);
        return;
      }
      var req = this.http.post(
        this.config.host + this.config.send_notificationUrl,
        { u_id },
        {
          headers: new HttpHeaders({
            Authorization: this.user.token,
          }),
        }
      );
      req.subscribe((response) => {
        if (response['success']) {
          res(true);
        } else {
          rej(response);
        }
      });
    });
  }

  setLastNotificationViewed(last_notification_id_viewed) {
    return new Promise((res, rej) => {
      if (!this.user.token) {
        rej(null);
        return;
      }
      var req = this.http.post(
        this.config.host + this.config.set_last_notification_id_viewedUrl,
        { last_notification_id_viewed },
        {
          headers: new HttpHeaders({
            Authorization: this.user.token,
          }),
        }
      );
      req.subscribe((response) => {
        if (response['success']) {
          res(true);
        } else {
          rej(response);
        }
      });
    });
  }
}
