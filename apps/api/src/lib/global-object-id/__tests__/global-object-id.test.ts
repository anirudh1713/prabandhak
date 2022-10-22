import {IGlobalIDProvider} from '../global-object-id-provider';
import {GlobalObjectIDService} from '../global-object-id.service';

describe('globalObjectIDService', () => {
  it('should create and parse global object id', () => {
    const typename = 'Viewer';
    const id = 'test';
    const separator = '|';
    // Create a mock obejctIDProvider - i.e. Base64 etc.
    const MockObjectIDProvider = jest.fn<IGlobalIDProvider, []>(() => {
      return {
        decode: jest.fn(() => `${typename}${separator}${id}`),
        encode: jest.fn(),
      };
    });
    const mockObjectIDProvider = new MockObjectIDProvider();
    // Mocked globalObjectIDService
    const globalObjectIDService = new GlobalObjectIDService(
      mockObjectIDProvider,
    );

    globalObjectIDService.create(typename, id);
    // encode method on objectIDProvider should be called with correct args.
    expect(mockObjectIDProvider.encode).toHaveBeenCalled();
    expect(mockObjectIDProvider.encode).toHaveBeenCalledWith(
      `${typename}${separator}${id}`,
    );

    // deocde method on objectIDProvider should be called with correct args.
    const parsedID = globalObjectIDService.parse('encoded_string');
    expect(mockObjectIDProvider.decode).toHaveBeenCalled();
    expect(mockObjectIDProvider.decode).toHaveBeenCalledWith('encoded_string');

    // parsedID should be correct
    expect(parsedID).toEqual([typename, id]);
  });
});
