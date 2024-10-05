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