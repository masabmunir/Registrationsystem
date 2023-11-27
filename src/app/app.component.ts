import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practice2';

  exclusive:boolean=false

  constructor(private userData:UsersService){}

  ngOnInit(){
    this.userData.exclusive.subscribe((res)=>{
      this.exclusive = res;
    
    })
  }
}
