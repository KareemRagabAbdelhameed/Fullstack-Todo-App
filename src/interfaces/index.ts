export interface IRegisterInput {
   name : "username" | "email" | "password", 
   placeholder : string,
   type : string,
   validation : {
    required? : boolean,
    minlingth? : number,
    pattern? : RegExp,
   }

}

export interface IErrorResponse {
   error : {
      message : string,
   }
}

export interface ILoginInput {
   name : "identifier" | "password",
   placeholder : string,
   type : string,
   validation : {
      required? : boolean,
      pattern? : RegExp,
      minLength? : number,
   }
}

export interface ITodo {
   id : number,
   title : string,
   description? : string,
}