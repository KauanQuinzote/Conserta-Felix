export default interface Address {
  street: string;
  addressNumber: number;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;

}
