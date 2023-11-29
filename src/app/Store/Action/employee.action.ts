import {User} from "../../../userModule/user.model";

export class getUser {
  static readonly type = '[Users] Get';
}

export class AddUser {
  static readonly type = '[Users] Add';
  constructor(public payload: User) {}
}

export class editUser {
  static readonly type = '[Users] Edit';
  constructor(public id:string,public payload: User) {}
}

export class DeleteTodo {
  static readonly type = '[Users] Delete';
  constructor(public id: string) {}
}
