import {IGlobalIDProvider} from './global-object-id-provider';

export class GlobalObjectIDService {
  private readonly _SEPARATOR = '|';
  private readonly _globalIDService: IGlobalIDProvider;

  public constructor(globalIDEncoder: IGlobalIDProvider) {
    this._globalIDService = globalIDEncoder;
  }

  private merge(...arguments_: string[]) {
    return arguments_.join(this._SEPARATOR);
  }

  private separate(parsedString: string) {
    return parsedString.split(this._SEPARATOR);
  }

  public create(typename: string, id: string) {
    return this._globalIDService.encode(this.merge(typename, id));
  }

  public parse(encodedText: string) {
    const parsedString = this._globalIDService.decode(encodedText);

    return this.separate(parsedString);
  }
}
