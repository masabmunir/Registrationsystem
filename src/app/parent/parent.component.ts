import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Selector, Store } from '@ngxs/store';
import { UsersService } from 'src/Services/users.service';
import { getUser } from '../Store/Action/employee.action';
import { Observable } from 'rxjs';
import { User } from 'src/userModule/user.module';
import { UsersState } from '../Store/State/employee.state';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  addUser:FormGroup
  empData:any=[]
  displayStyle = "none";

  @Select(UsersState.getUserlist) $employeeData: Observable<User[]>;
  @Select(UsersState.isuserloaded) $userLoaded: Observable<boolean>;

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
    this.$employeeData.subscribe((res)=>{
    console.log('state slice data is:  ',res)
    this.empData = res
  })
  }


  showData(){
    this.$userLoaded.subscribe((res)=>{
      if(!res){
        this.store.dispatch(new getUser())
      }
    })
    // this.userData.getData().subscribe((res:any) => {
    //   this.empData.push(...res)
    //   console.log('After fetching data', this.empData);
    // });
  }

  async addData() {
    try {
      const response = await this.userData.addUser(this.addUser.value);
      this.addUser.reset();
      this.showData();
    } catch (error:any) {
      console.error('Error while saving data:', error);
      if (error && error.status === 404) {
        console.error('Resource not found.');
      } else {
        console.error('Unknown error occurred.');
      }
    }
  }
  

  openPopup(){
    this.displayStyle = "block";
  }

  closeModal() {
    this.displayStyle = "none";
  }
}
