import { Item } from "./item";

export class InstallmentsDonation implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public amount?: number,
    public paymethod?: string,
    public status?: string,
    public donation?: string
  ) {
    this["@id"] = _id;
  }
}
