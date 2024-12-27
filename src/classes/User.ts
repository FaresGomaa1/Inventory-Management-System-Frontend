import { IUser } from '../interfaces/iuser';

export class User implements IUser {
  FirstName: string;
  LastName: string;
  Password: string;
  PhoneNumber: string;
  Role: string;
  UserName: string;
  Email: string;
  TeamId: number;
  IsManager: boolean;
  ManagerId: string;

  constructor(
    FirstName: string,
    LastName: string,
    Password: string,
    PhoneNumber: string,
    Role: string,
    UserName: string,
    Email: string,
    TeamId: number,
    IsManager: boolean,
    ManagerId: string
  ) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Password = Password;
    this.PhoneNumber = PhoneNumber;
    this.Role = Role;
    this.UserName = UserName;
    this.Email = Email;
    this.TeamId = TeamId;
    this.IsManager = IsManager;
    this.ManagerId = ManagerId;

     // Validate fields during object creation
     if (!this.checkPassword()) throw new Error("Password validation failed");
     if (!this.checkPhoneNumber()) throw new Error("Phone number validation failed");
     if (!this.checkRole()) throw new Error("Role validation failed");
     if (!this.checkUserName()) throw new Error("Username validation failed");
     if (!this.checkEmail()) throw new Error("Email validation failed");
     if (!this.checkIsManager()) throw new Error("IsManager validation failed");
     if (!this.checkManagerId()) throw new Error("ManagerId validation failed");
  }

  checkPassword(): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(this.Password);
  }

  checkPhoneNumber(): boolean {
    const phoneRegex = /^(010|011|012)\d{8}$/;
    return phoneRegex.test(this.PhoneNumber);
  }

  checkRole(): boolean {
    const validRoles = [
      'Staff Member',
      'Inventory Manager',
      'Department Manager',
      'Staff Member Manager',
      'Inventory Manager Manager',
      'Department Manager Manager',
    ];
    return validRoles.includes(this.Role);
  }

  checkUserName(): boolean {
    return !/\s/.test(this.UserName);
  }

  checkEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.Email);
  }

  checkIsManager(): boolean {
    const roleParts = this.Role.split(' ');
    if (roleParts.length === 3 && roleParts[2] === 'Manager') {
      return this.IsManager === true;
    }
    return this.IsManager === false;
  }

  checkManagerId(): boolean {
    return this.IsManager ? true : this.ManagerId.trim() !== '';
  }
}
