
export interface IRegisterInput {
    name: 'email'|'username'|'password' ;
    placeholder: string;
    type: string;
    // validation: {
    //     required?: boolean;
    //     minLength?: number;
    //     pattern?: RegExp;
    // };
}

export interface ILoginInput {
    name: 'identifier'|'password' ;
    placeholder: string;
    type: string;

}

export interface IAxiosErrorMsg{

    error:{

        message?:string
    }
}