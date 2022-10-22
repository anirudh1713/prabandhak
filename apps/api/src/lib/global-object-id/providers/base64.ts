import {IGlobalIDProvider} from '../global-object-id-provider';

export class Base64 implements IGlobalIDProvider {
  encode(plainText: string): string {
    const buff = Buffer.from(plainText, 'utf8');

    return buff.toString('base64');
  }

  decode(encodedText: string): string {
    const buff = Buffer.from(encodedText, 'base64');

    return buff.toString('utf8');
  }
}
