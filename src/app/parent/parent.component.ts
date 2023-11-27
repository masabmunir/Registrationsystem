import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  addUser:FormGroup
  empData:any=[]
  displayStyle = "none";

  constructor(private userData:UsersService,
              private myFormBuilder: FormBuilder,) {   }

 
  formControl(){
    this.addUser = this.myFormBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
    })
  }

  ngOnInit(): void {this.formControl()}


  showData(){
    this.userData.getData().subscribe((res:any) => {
      this.empData.push(...res)
      console.log('After fetching data', this.empData);
    });
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
