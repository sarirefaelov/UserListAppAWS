import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap, catchError } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { XMLParser } from 'fast-xml-parser';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:44380/api/users';

  constructor(private http: HttpClient) {}

  // GET - Receive XML
  getUsers(): Observable<User[]> {
    return this.http.get(this.apiUrl, { 
      responseType: 'text',
      headers: { 'Accept': 'application/xml' }
    }).pipe(
      tap(xml => console.log('=== Raw XML ===', xml)),
      map(xml => {
        try {
          const parser = new XMLParser({
            ignoreAttributes: false,
            removeNSPrefix: true,
            parseTagValue: true,
            trimValues: true,
            isArray: (name) => name === 'User'
          });
          
          const result = parser.parse(xml);
          let usersRaw = result?.ArrayOfUser?.User;
          
          if (!usersRaw) return [];
          
          const usersArray = Array.isArray(usersRaw) ? usersRaw : [usersRaw];
          
          return usersArray.map((u: any) => ({
            Id: parseInt(u.Id?.toString() || '0', 10),     
            Name: u.Name?.toString() || 'Unknown'           
          }));
        } catch (error) {
          console.error('Error parsing XML:', error);
          return [];
        }
      }),
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