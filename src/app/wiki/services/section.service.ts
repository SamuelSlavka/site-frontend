import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Section, SectionCreate } from '../store/models/section.model';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private http: HttpClient) {}

  getOneSection(id: string): Observable<Section> {
    return this.http.get<Section>(`${environment.serverUrl}sections/id/${id}`);
  }

  createSection(data: SectionCreate): Observable<Section> {
    return this.http.post<Section>(`${environment.serverUrl}sections/id/${data.superSectionId}`, { text: data.text });
  }

  editSection(data: SectionCreate): Observable<Section> {
    return this.http.put<Section>(`${environment.serverUrl}sections/id/${data.superSectionId}`, { text: data.text });
  }

  deleteSection(id: string): Observable<Section> {
    return this.http.delete<Section>(`${environment.serverUrl}sections/id/${id}`);
  }
}
