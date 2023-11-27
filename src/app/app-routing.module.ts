import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'parent', component: ParentComponent },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forRoot(routes)]],
})
export class AppRoutingModule {}
