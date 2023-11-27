import { Component } from '@angular/core';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component {
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

