import {User} from "../../../userModule/user.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import { UsersService } from "src/Services/users.service";
import { getUser } from "../Action/employee.action";
import { tap } from "rxjs";


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
    debugger
   if(state.users === null){
    throw new Error("Data is null")
   }
   else{
    return state.users
   }
  }

   // Get loaded employee info
  
  //  @Selector()
  //  static isuserloaded(state:userStateModel){
  //    return state.userLoaded;
  //  }

   @Action(getUser)
   getUsers({ getState, setState }: StateContext<userStateModel>) {
    console.log("State Action  ====")
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


}
