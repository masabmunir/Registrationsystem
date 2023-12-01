import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select,Store } from '@ngxs/store';
import { UsersService } from 'src/Services/users.service';
import { AddUser, DeleteUser, UpdateUser, getUser } from '../Store/Action/employee.action';
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
  isUpdate:Boolean = false;
  userID: any = 0;

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

    this.userData.getData().subscribe((res)=>{
      this.empData = res;
    },(err=>{
      console.log("Data not loading .....",err)
    })
    )

      this.userLoaded$.subscribe(res=> {
        if (!res) {
          this.store.dispatch(new getUser())
        }
      })

  }



  addData(){
    this.store.dispatch(new AddUser(this.addUser.value)).subscribe(() => {

      //add data without page refresh
      this.empData.push({ _id: Math.random().toString(), ...this.addUser.value });
      this.addUser.reset(); 
    });
  }

  delUser(item:any){

    if(confirm("Data Deleted permanently")){
    this.store.dispatch(new DeleteUser(item));  
    // delete data without refresh

    this.empData = this.empData.filter(emp => emp._id !== item);
    }
    else{
      console.log("data will not be deleted")
    }

  }

  updateView(user:any){
    this.userID = user._id
    this.isUpdate = true;
    this.addUser.controls['firstName'].setValue(user.firstName);
    this.addUser.controls['lastName'].setValue(user.lastName);
    this.addUser.controls['email'].setValue(user.email)
    this.openPopup()
  }


  updateData() {
    this.store.dispatch(new UpdateUser(this.userID,this.addUser.value)) // used to get data from store

    // update data without page refresh
    const index = this.empData.findIndex(emp => emp._id === this.userID);
    if (index !== -1) {
      this.empData[index] = { _id: this.userID, ...this.addUser.value };
    }
    
  }
  

  openPopup(){
    this.displayStyle = "block";
  }

  closeModal() {
    this.displayStyle = "none";
  }
}
