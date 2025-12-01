export default interface Person {
  readonly id: string;
  name: string;
  email: string;
  number: string
  readonly createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
