import {v4 as uuidv4} from 'uuid';
import {Identifier} from './identifier';

export class EntityID extends Identifier<string> {
  constructor(id?: string) {
    super(id || uuidv4());
  }
}
