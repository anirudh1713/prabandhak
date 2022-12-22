import {EntityID} from '../../../shared/domain/entity-id';
import {ValueObject} from '../../../shared/domain/value-object';

interface IUserIDProperties {
  value: EntityID;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class UserID extends ValueObject<IUserIDProperties> {
  get value(): EntityID {
    return this.props.value;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(userIDProperites: IUserIDProperties) {
    super(userIDProperites);
  }

  public static create(id: string) {
    return new UserID({
      value: EntityID.fromGlobalObjectID(id),
    });
  }

  public static createFromEntityID(id: EntityID) {
    return new UserID({value: id});
  }
}
