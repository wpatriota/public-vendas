import { Item } from "./item";

export class Donation implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public amount?: number,
    public paymethod?: string,
    public donor?: string,
    public installmentsDonations?: string[]
  ) {
    this["@id"] = _id;
  }
}
