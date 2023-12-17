interface IUserModel {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}



interface IEmployeeModel {
    _id: String,
    userName: String,
    salary: Number,
    age: String
}

export type { IUserModel, IEmployeeModel };