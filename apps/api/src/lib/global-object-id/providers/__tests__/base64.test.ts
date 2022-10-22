import {Base64} from '../base64';

describe('base64 - globalObjectIDProvider', () => {
  it('should encode string to base64', () => {
    const input = 'Viewer|test';
    const output = 'Vmlld2VyfHRlc3Q=';

    const base64 = new Base64();

    const encodedString = base64.encode(input);
    expect(encodedString).toBe(output);

    const decodedString = base64.decode(output);
    expect(decodedString).toBe(input);
  });
});
