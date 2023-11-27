import { Component } from '@angular/core';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component {

  username:String='';

  constructor(private userData:UsersService){
    this.userData.username.subscribe((res)=>{
      this.username=res
    })
  }

  onChange(uname:any){
    this.userData.username.next(uname.value)
  }
}
