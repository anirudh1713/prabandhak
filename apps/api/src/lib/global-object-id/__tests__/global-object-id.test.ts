import { GlobalObjectIDService } from '../global-object-id.service';
import {
  decodeMock,
  encodeMock,
  MockObjectIDProvider,
} from '../__mocks__/object-id-provider';

describe('globalObjectIDService', () => {
  it('should create and parse global object id', () => {
    const globalObjectIDService = new GlobalObjectIDService(
      new MockObjectIDProvider(),
    );
    globalObjectIDService.create('Viewer', 'test');

    // encode method on objectIDProvider should be called with correct args.
    expect(encodeMock).toHaveBeenCalled();
    expect(encodeMock).toHaveBeenCalledWith('Viewer|test');

    // deocde method on objectIDProvider should be called with correct args.
    const parsedID = globalObjectIDService.parse('encoded_string');
    expect(decodeMock).toHaveBeenCalled();
    expect(decodeMock).toHaveBeenCalledWith('encoded_string');

    // parsedID should be correct
    expect(parsedID).toEqual({ id: 'test', type: 'Viewer' });
  });
});
