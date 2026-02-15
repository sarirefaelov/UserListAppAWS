import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap, catchError } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { XMLParser } from 'fast-xml-parser';

@Injectable({ providedIn: 'root' })
export class UserService {
private apiUrl = 'http://34.224.165.170:5234/api/users';

  constructor(private http: HttpClient) {}

  // GET - Receive XML
  // GET - Receive JSON
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.apiUrl).pipe(
    tap(users => console.log('✅ Users loaded successfully:', users)),
    catchError(error => {
      console.error('HTTP Error:', error);
      return of([]);
    })
  );
}



  // POST/PUT/DELETE - Work with JSON
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}