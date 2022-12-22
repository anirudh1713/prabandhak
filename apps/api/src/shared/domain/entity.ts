import {EntityID} from './entity-id';
import {TEntityType} from './types';

interface IEntityProperties<T> {
  properties: T;
}

interface IExistingEntityProperties<T> extends IEntityProperties<T> {
  id: EntityID;
}

interface INewEntityProperties<T> extends IEntityProperties<T> {
  type: TEntityType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: EntityID;
  public readonly props: T;

  protected constructor(entityProperties: IExistingEntityProperties<T>);
  protected constructor(entityProperties: INewEntityProperties<T>);
  protected constructor(
    data: IExistingEntityProperties<T> | INewEntityProperties<T>,
  ) {
    this.props = data.properties;

    this._id = 'id' in data ? data.id : EntityID.fromType(data.type);
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
