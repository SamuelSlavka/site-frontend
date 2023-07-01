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
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get(`http://localhost:8090/api/v1/articles?page=0`).subscribe((data: any) => {
      this.message = data.message;
    });
  }

  back() {
    this.router.navigate(['']);
  }
}
