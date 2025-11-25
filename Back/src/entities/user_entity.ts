import { randomUUID } from 'crypto';
import Person from "../interfaces/person_interface";

export default class UserEntity implements Person {
  readonly id = randomUUID();
  public name: string;
  public email: string;
  readonly createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public active: boolean = true;
  public password?: string;

  constructor(name: string, email: string , password?: string) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.active = true;
    this.password = password;
  }

}
