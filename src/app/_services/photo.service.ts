import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(pageNumber) {
    const url = `${appConfig.apiUrl}${appConfig.client_id}&page=${pageNumber}`;
    return this.http.get<any>(url);
  }

  getDownloadPhoto(id: string): Observable<any> {
    const url = `${appConfig.apiUrl}/${id}/download${appConfig.client_id}`;
    return this.http.get(url);
  }
}
