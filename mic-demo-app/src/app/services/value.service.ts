import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class ValueService {
  constructor(private http: HttpClient) { }

  public getValues() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get('http://127.0.0.1:5000/api/values', {headers : headers});
  }
}
