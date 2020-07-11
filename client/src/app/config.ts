import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export class Config {
  host = 'http://localhost:5000';
  loginUrl = '/api/users/login';
  currentUserUrl = '/api/users/current';
  profileUrl = '/api/users/profile';
  updateUserUrl = '/api/users/update';
}
