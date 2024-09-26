export interface IRegisterInput {
    name: 'email'|'userName'|'password' ;
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;
    };
}