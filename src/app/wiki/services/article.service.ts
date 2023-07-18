import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticleListItem, CreateArticle } from '../store/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(page: number): Observable<ArticleListItem[]> {
    return this.http.get<ArticleListItem[]>(`${environment.serverUrl}articles?page=${page}`);
  }

  getOneArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${environment.serverUrl}articles/id/${id}`);
  }

  createArticle(data: CreateArticle): Observable<ArticleListItem> {
    return this.http.post<ArticleListItem>(`${environment.serverUrl}articles`, data);
  }

  editArticle(id: string, data: CreateArticle): Observable<ArticleListItem> {
    return this.http.put<ArticleListItem>(`${environment.serverUrl}articles/${id}`, data);
  }
}
