import {ObjectionModel} from './objection.model';
import {CustomValidator} from '../../CustomValidator';
import {Validator} from 'objection';

// If you have an associative (or junction) table, extend the Objection Model class directly
export class BaseModel extends ObjectionModel {
  static idColumn = 'id';

  id: string;
  createdAt: string;
  updatedAt: string;

  static createValidator(): Validator {
    return new CustomValidator();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
