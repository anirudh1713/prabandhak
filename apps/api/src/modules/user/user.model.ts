import Joi from 'joi';
import {ModelObject, ToJsonOptions} from 'objection';
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

  toJSON(opt?: ToJsonOptions): ModelObject<this> {
    /**
     * "any" here because:
     * {@link} https://github.com/Vincit/objection.js/issues/1861
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = super.toJSON(opt) as any;

    delete result.password;

    return result;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
