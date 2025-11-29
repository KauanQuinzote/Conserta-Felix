import { randomUUID } from 'crypto';
import Person from "../interfaces/person_interface";
import bcrypt from 'bcrypt';

export default class UserEntity implements Person {
  readonly id = randomUUID();
  public name: string;
  public email: string;
  public password: string;
  public role: 'client' | 'admin';
  readonly createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public active: boolean = true;

  constructor(name: string, email: string, password: string, role: 'client' | 'admin') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
