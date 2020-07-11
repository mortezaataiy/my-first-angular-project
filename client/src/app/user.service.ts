import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Config } from './config';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user;
  token;
  constructor(private http: HttpClient, private config: Config) {
    this.token = localStorage.getItem('token');
  }

  login(userId, pass) {
    return new Promise((res, rej) => {
      var req = this.http.post(this.config.host + this.config.loginUrl, {
        userId,
        pass,
      });
      req.subscribe((response) => {
        if (response['success']) {
          this.user = response['user'];
          this.token = response['token'];
          localStorage.setItem('token', this.token);
          res();
        } else {
          rej(response);
        }
      });
    });
  }

  getUser() {
    return new Promise((res, rej) => {
      if (!this.token) {
        res(null);
        return;
      }
      // if (this.user) {
      //   res(this.user);
      //   return;
      // }
      var req = this.http.post(
        this.config.host + this.config.currentUserUrl,
        {},
        {
          headers: new HttpHeaders({
            Authorization: this.token,
          }),
        }
      );
      req.subscribe((response) => {
        if (response['success']) {
          this.user = response['user'];
          res(this.user);
        } else {
          rej(response);
        }
      });
    });
  }
  getToken() {
    return this.token;
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    return this.user;
  }

  updateProfile(name) {
    return new Promise((res, rej) => {
      if (!this.token) {
        res(null);
        return;
      }
      var req = this.http.post(
        this.config.host + this.config.updateUserUrl,
        { name },
        {
          headers: new HttpHeaders({
            Authorization: this.token,
          }),
        }
      );
      req.subscribe((response) => {
        if (response['success'] == true) {
          this.user = response['user'];
          res(this.user);
        } else {
          rej(response);
        }
      });
    });
  }
}
