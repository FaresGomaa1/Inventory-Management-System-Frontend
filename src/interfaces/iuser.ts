export interface IUser {
    FirstName: string,
    LastName: string,
    Password: string,
    PhoneNumber: string,
    Role: string,
    UserName: string,
    Email: string,
    TeamId: number,
    IsManager: boolean,
    ManagerId:string
}
export interface  IManager{
    id :string
    firstName: string,
    lastName: string,
    phoneNumber: string,
    userName: string,
    email: string,
    team: string
}
