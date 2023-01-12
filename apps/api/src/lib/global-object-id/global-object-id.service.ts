import { IGlobalIDProvider } from './global-object-id-provider';
import { Base64 } from './providers/base64';

export class GlobalObjectIDService {
  private readonly _SEPARATOR = '|';
  private readonly _globalIDProvider: IGlobalIDProvider;

  public constructor(globalIDProvider: IGlobalIDProvider) {
    this._globalIDProvider = globalIDProvider;
  }

  private merge(...arguments_: string[]) {
    return arguments_.join(this._SEPARATOR);
  }

  private separate(parsedString: string) {
    return parsedString.split(this._SEPARATOR);
  }

  public create(typename: string, id: string) {
    return this._globalIDProvider.encode(this.merge(typename, id));
  }

  public parse(encodedText: string) {
    const parsedString = this._globalIDProvider.decode(encodedText);
    const delimiterPos = parsedString.indexOf(this._SEPARATOR);

    return {
      type: parsedString.slice(0, delimiterPos),
      id: parsedString.slice(delimiterPos + 1),
    };
  }
}

export const globalObjectIDService = new GlobalObjectIDService(new Base64());
