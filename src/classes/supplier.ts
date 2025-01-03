import { AddSupplierDTO } from "src/interfaces/isupplier";

export class Supplier implements AddSupplierDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
