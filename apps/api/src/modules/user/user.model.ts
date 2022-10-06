import Joi from 'joi';
import {BaseModel} from '../../db/models/common/base.model';

export class UserModel extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  static tableName = 'users';

  static get virtualAttributes(): string[] {
    return ['fullName'];
  }

  static joiSchema = Joi.object({
    id: Joi.string().uuid({version: 'uuidv4'}),

    firstName: Joi.string().min(2).trim().required(),

    lastName: Joi.string().min(2).trim().required(),

    password: Joi.string().required(),

    email: Joi.string().email().required(),
  });

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
