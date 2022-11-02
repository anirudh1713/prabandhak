import {Container} from 'inversify';
import {IGlobalIDProvider} from './lib/global-object-id/global-object-id-provider';
import {GlobalObjectIDService} from './lib/global-object-id/global-object-id.service';
import {Base64} from './lib/global-object-id/providers/base64';
import TYPES from './inversify.types';

const container = new Container();

container.bind<IGlobalIDProvider>(TYPES.GlobalIDProvider).to(Base64);
container
  .bind<GlobalObjectIDService>(TYPES.GlobalObjectIDService)
  .to(GlobalObjectIDService);

export default container;
