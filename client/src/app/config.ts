import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export class Config {
  host = 'http://localhost:5000';
  loginUrl = '/api/users/login';
  currentUserUrl = '/api/users/current';
  profileUrl = '/api/users/profile';
  updateUserUrl = '/api/users/update';
  searchUrl = '/api/users/search';
  notificationsUrl = '/api/notifications';
  set_last_notification_id_viewedUrl =
    '/api/notifications/set_last_notification_id_viewed';
  send_notificationUrl = '/api/notifications/send_notification';
}
