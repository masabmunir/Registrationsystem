import {User} from "../../../userModule/user.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import { UsersService } from "src/Services/users.service";
import { AddUser,  DeleteUser,  getUser } from "../Action/employee.action";
import { Observable, tap } from "rxjs";


export class userStateModel{
  users:User[]
  userLoaded:boolean
}

@State<userStateModel>({
  name:'Users',
  defaults:{
    users:[],
    userLoaded:false
  }
})

@Injectable()
export class UsersState {
  constructor(private userService:UsersService){}

  @Selector()
  static getUserlist(state:userStateModel){
    return state.users
  }

  //  Get loaded employee info

   @Selector()
   static isuserloaded(state:userStateModel){
     return state.userLoaded;
   }

   @Action(getUser)
   getUsers({ getState, setState }: StateContext<userStateModel>) {
     return this.userService.getData().pipe(
       tap((res:any) => {
         const state = getState();
         setState({
           ...state,
           users: res,
           userLoaded: true
         });
       })
     );
   }

   @Action(AddUser)
   addUser({ getState, patchState }: StateContext<userStateModel>, { payload }: AddUser): Observable<any> {
    return this.userService.addUser(payload).pipe(
      tap((res: any) => { 
        const state = getState();
  
        
        if (res && res._id && res.firstName && res.lastName && res.email) {
          patchState({
            users: [...state.users, res as User], 
          });
        } else {

          console.log('Something went wrong:', res);

        }
      })
    );
  }
  

  @Action(DeleteUser)
  deleteUser({setState,getState}:StateContext<userStateModel>,{id}:DeleteUser){

    return this.userService.deleteUser(id).pipe(tap((res:User)=>{
      const state = getState();
      const filteredEmployees = state.users.filter(user=>user._id !== id)   // Getting Data of Remaining Employees

      setState({
        ...state,
        users:filteredEmployees
      })
    }))
  }
}