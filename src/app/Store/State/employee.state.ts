import {User} from "../../../userModule/user.module";
import {State} from "@ngxs/store";
import {Injectable} from "@angular/core";


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
export class UsersState{

}
