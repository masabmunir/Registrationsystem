import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from 'src/userModule/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  exclusive= new Subject<boolean>();

  username = new Subject<String>();

  constructor(private http: HttpClient) { }

  url='http://localhost:8000/userDetails';

  getData(){
    console.log('Making request to:', this.url);
    return this.http.get(this.url);
  }

  addUser(data:User){
    console.log('Post data request',this.url)
    return this.http.post(this.url+'/userDetails/addEmp',data);
  }
}
