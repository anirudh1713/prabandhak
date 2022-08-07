/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import Objection, {Validator} from 'objection';

export class CustomValidator extends Validator {
  validate(arguments_: any) {
    // The model instance. May be empty at this point.
    const model = arguments_.model;

    // The properties to validate. After validation these values will
    // be merged into `model` by objection.
    const json = arguments_.json;

    // `ModelOptions` object. If your custom validator sets default
    // values or has the concept of required properties, you need to
    // check the `opt.patch` boolean. If it is true we are validating
    // a patch object (an object with a subset of model's properties).
    // const opt = arguments_.options;

    // A context object shared between the validation methods. A new
    // object is created for each validation operation. You can store
    // whatever you need in this object.
    // const ctx = arguments_.ctx;

    if (!model.constructor.joiSchema) {
      return json;
    }

    // Do your validation here and throw any exception if the
    // validation fails.
    const {error, value} = (
      model.constructor.joiSchema as Joi.ObjectSchema
    ).validate(json);
    if (error) {
      throw new Objection.ValidationError({
        type: 'ModelValidation',
        // TODO - only when in development.
        data: json,
        message: error.message,
      });
    }

    return value;
  }

  beforeValidate(arguments_: any) {
    // Takes the same arguments as `validate`. Usually there is no need
    // to override this.
    return super.beforeValidate(arguments_);
  }

  afterValidate(arguments_: any) {
    // Takes the same arguments as `validate`. Usually there is no need
    // to override this.
    return super.afterValidate(arguments_);
  }
}
