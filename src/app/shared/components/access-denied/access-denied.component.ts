import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {
  message = 'message';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get(`${environment.serverUrl}articles`).subscribe((data: any) => {
      this.message = data.message;
    });
  }

  back() {
    this.router.navigate(['']);
  }
}
