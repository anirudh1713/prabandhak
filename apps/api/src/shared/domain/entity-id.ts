import {v4 as uuidv4} from 'uuid';
import {GlobalObjectID} from '../../lib/global-object-id/global-object-id';
import {globalObjectIDService} from '../../lib/global-object-id/global-object-id.service';
import {Identifier} from './identifier';
import {TEntityType} from './types';

export class EntityID extends Identifier<GlobalObjectID> {
  public static fromType(entityType: TEntityType) {
    const id = new GlobalObjectID(entityType, uuidv4());
    return new EntityID(id);
  }

  public static fromGlobalObjectID(globalObjectID: string) {
    const [type, rawID] = globalObjectIDService.parse(globalObjectID);
    return new EntityID(new GlobalObjectID(type as TEntityType, rawID));
    // return this.fromType(type as TEntityType);
  }
}
