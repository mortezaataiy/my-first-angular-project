import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  searchForm;
  isLogin = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      text: '',
    });
  }

  ngOnInit() {}

  getIsLogin() {
    if (this.userService.getToken()) {
      return true;
    } else {
      return false;
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
