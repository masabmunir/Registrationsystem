import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit,OnDestroy {

  username:String='';

  constructor(private userData:UsersService) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.userData.exclusive.next(true)
  }, 0);


    this.userData.username.subscribe((res)=>{
      this.username=res;
    })
  }


  // Code for exclusive button 
  ngOnDestroy(): void {
    this.userData.exclusive.next(false);
  }

}
