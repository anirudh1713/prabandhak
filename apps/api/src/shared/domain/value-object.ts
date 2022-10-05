interface ValueObjectProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProperties> {
  public props: T;

  protected constructor(properties: T) {
    this.props = {
      ...properties,
    };
  }

  public equals(valueObject?: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    if (valueObject.props === undefined) {
      return false;
    }

    // TODO - update the comparison logic
    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}
