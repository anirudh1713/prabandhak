import {createModule} from 'graphql-modules';
import {loadFilesSync} from '@graphql-tools/load-files';
import path from 'node:path';

export const userGqlModule = createModule({
  id: 'user',
  dirname: __dirname,
  typeDefs: loadFilesSync(path.join(__dirname, './typedefs/*.graphql')),
  resolvers: loadFilesSync(path.join(__dirname, './resolvers/*.resolver.*')),
});
