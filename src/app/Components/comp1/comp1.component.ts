import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  username:String='';
  
  constructor(private userData:UsersService){
    this.userData.username.subscribe((res)=>{
      this.username=res
    })
  }

  ngOnInit(){}

  onChange(uname:any){
    this.userData.username.next(uname.value)
  }

}
