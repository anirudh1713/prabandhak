import {GlobalObjectIDService} from '../global-object-id.service';
import container from '../../../inversify.config';
import TYPES from '../../../inversify.types';
import { decodeMock, encodeMock, MockObjectIDProvider } from '../__mocks__/object-id-provider';

describe('globalObjectIDService', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  it('should create and parse global object id', () => {
    // Rebind GlobalIdProvider used in GlobalObjectIDService
    container.rebind(TYPES.GlobalIDProvider).to(MockObjectIDProvider);

    const globalObjectIDService = container.get<GlobalObjectIDService>(
      TYPES.GlobalObjectIDService,
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
    expect(parsedID).toEqual(['Viewer', 'test']);
  });
});
