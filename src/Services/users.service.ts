import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/userModule/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  exclusive= new Subject<boolean>();

  username = new Subject<String>();

  constructor(private http: HttpClient) { }

  url='http://localhost:8000/userDetails';

  getData(){
    return this.http.get<User[]>(this.url);
  }

  addUser(data:User){
    return this.http.post(this.url+'/addEmp',data);
  }

  deleteUser(id:string):Observable<User>{
   return this.http.delete<User>(this.url + `/${id}`)
  }

  updateUser(id:string,data:User):Observable<User>{
    return this.http.put<User>(this.url +`/${id}`, data)
  }
  
}
