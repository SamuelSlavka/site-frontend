import { OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): Observable<any> {
    return this.http.get("localhost:8081/api/v1/articles");
  }
}
