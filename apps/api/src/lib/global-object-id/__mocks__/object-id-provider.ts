import {IGlobalIDProvider} from '../global-object-id-provider';

// Create a mock obejctIDProvider - i.e. Base64 etc.
export const decodeMock = jest.fn().mockImplementation(() => 'Viewer|test');
export const encodeMock = jest.fn();
export const MockObjectIDProvider = jest
  .fn<IGlobalIDProvider, []>()
  .mockImplementation(() => {
    return {
      decode: decodeMock,
      encode: encodeMock,
    };
  });
