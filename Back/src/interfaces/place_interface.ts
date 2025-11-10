interface Adress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;

}

export default interface Place {
  id: string;
  name: string;
  adress: Adress;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
