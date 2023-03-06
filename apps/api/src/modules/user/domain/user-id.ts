import { Entity } from '../../../shared/domain/entity';
import { EntityID } from '../../../shared/domain/entity-id';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class UserId extends Entity<any> {
  get id(): EntityID {
    return this._id;
  }

  private constructor(id?: EntityID) {
    super(undefined, id);
  }

  public static create(id?: EntityID) {
    return new UserId(id);
  }

  public static createFromExisting(id: string) {
    return new UserId(new EntityID(id));
  }
}
