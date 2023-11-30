import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select,Store } from '@ngxs/store';
import { UsersService } from 'src/Services/users.service';
import { AddUser, DeleteUser, getUser } from '../Store/Action/employee.action';
import { Observable } from 'rxjs';
import { User } from 'src/userModule/user.model';
import { UsersState } from '../Store/State/employee.state';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  addUser:FormGroup
  empData: User[] = [];
  collection: any = [];
  displayStyle = "none";

  @Select(UsersState.getUserlist) employeeData$: Observable<User[]>;
  @Select(UsersState.isuserloaded) userLoaded$: Observable<boolean>;

  constructor(private userData:UsersService,
              private myFormBuilder: FormBuilder,
              private store:Store) {   }


  formControl(){
    this.addUser = this.myFormBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.formControl()
      this.userLoaded$.subscribe(res=> {
        if (!res) {
          this.store.dispatch(new getUser())
        }
      })

  }


  showData(){

    this.userData.getData().subscribe((res)=>{
      this.empData = res;
    },(err=>{
      console.log("Data not loading .....",err)
    })
    )

  }

  addData(){
    this.store.dispatch(new AddUser(this.addUser.value))
  }

  delUser(item:any){
    if(confirm("Data Deleted permanently")){
    this.store.dispatch(new DeleteUser(item));
    this.showData()
    }else{
      console.log("data will not be deleted")
    }
  }

  openPopup(){
    this.displayStyle = "block";
  }

  closeModal() {
    this.displayStyle = "none";
  }
}
