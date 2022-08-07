import Objection, {PartialModelObject} from 'objection';
import knexInstance from '../../knex';

// Attach knex to objection model
Objection.Model.knex(knexInstance);

export class ObjectionModel extends Objection.Model {
  /**
   * Set this object's property values. Internally calls `Objection.Model.$set()` method but with
   * auto completion based on this model's properties.
   *
   * {@link}: https://github.com/Vincit/objection.js/issues/1716
   */
  set(values: PartialModelObject<this>): void {
    this.$set(values);
  }
}
