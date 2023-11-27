import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  exclusive= new Subject<boolean>();

  username = new Subject<String>();

  constructor(private http: HttpClient) { }

  url='http://localhost:8000/empDetails';

  getData(){
    console.log('Making request to:', this.url);
    return this.http.get(this.url);
  }
}
