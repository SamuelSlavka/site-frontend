import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SectionCreate, SectionDelete, SectionDto } from '../store/models/section.model';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private http: HttpClient) {}

  getOneSection(id: string): Observable<SectionDto[]> {
    return this.http.get<SectionDto[]>(
      `${environment.serverUrl}sections/id/${id}?page=0&pageSize=10&limit=10&initDepth=0`,
    );
  }

  createSection(data: SectionCreate): Observable<SectionDto> {
    return this.http.post<SectionDto>(`${environment.serverUrl}sections/id/${data.superSectionId}`, data.revision);
  }

  editSection(data: SectionCreate): Observable<SectionDto> {
    return this.http.put<SectionDto>(`${environment.serverUrl}sections/id/${data.superSectionId}`, data.revision);
  }

  deleteSection(data: SectionDelete): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}sections/id/${data.id}`);
  }
}
