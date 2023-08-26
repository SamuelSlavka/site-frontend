import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  message = 'message';
  constructor(private router: Router) {}

  ngOnInit() {}

  back() {
    this.router.navigate(['']);
  }
}
