import {TEntityType} from '../../shared/domain/types';
import {globalObjectIDService} from './global-object-id.service';

interface IGlobalObjectIDProperties {
  /*
   * type of entity
   */
  type: TEntityType;
  /*
   * raw id used in persistance layer
   */
  rawID: string;
  /*
   * Generated global object id - combination of `type` and `rawID`
   * */
  value: string;
}

export class GlobalObjectID {
  private props: IGlobalObjectIDProperties;

  public constructor(entityType: TEntityType, id: string) {
    this.props = {
      type: entityType,
      rawID: id,
      value: globalObjectIDService.create(entityType, id),
    };
  }

  get type() {
    return this.props.type;
  }

  get rawID() {
    return this.props.rawID;
  }

  get value() {
    return this.props.value;
  }
}
