import { Item } from "./item";

export class Donor implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public email?: string,
    public donations?: string[]
  ) {
    this["@id"] = _id;
  }
}
