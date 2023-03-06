import {EntityID} from './entity-id';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: EntityID;
  protected readonly props: T;

  protected constructor(properties: T, id?: EntityID) {
    this._id = id || new EntityID();
    this.props = properties;
  }

  public equals(object?: Entity<T>): boolean {
    if (!object) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
