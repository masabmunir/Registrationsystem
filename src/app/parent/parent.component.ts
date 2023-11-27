import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  showemp:FormGroup;
  empData:any=[]

  constructor(private userData:UsersService,
              private myFormBuilder: FormBuilder,) {   }

 
  formControl(){
    this.showemp = this.myFormBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
    })
  }

  ngOnInit(): void {this.formControl()}


  showData(){
    console.log('Before fetching data');
    this.userData.getData().subscribe((res:any) => {
      this.empData.push(...res)
      console.log('After fetching data', this.empData);
    });
  }
}
