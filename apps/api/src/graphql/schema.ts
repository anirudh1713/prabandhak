import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';
import {loadFiles} from '@graphql-tools/load-files';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {GraphQLSchema} from 'graphql';
import path from 'node:path';

const getTypeDefs = async () => {
  return loadFiles(path.join(__dirname, '../**/graphql/*.graphql'));
};

const getResolvers = async () => {
  return loadFiles(path.join(__dirname, '../**/resolver/*.resolver.*'), {
    ignoreIndex: false,
    extensions: ['.js', '.ts'],
  });
};

export const initializeSchema = async (): Promise<GraphQLSchema> => {
  const resolvers = mergeResolvers(await getResolvers());

  const typeDefs = mergeTypeDefs(await getTypeDefs());

  const graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    // https://stackoverflow.com/a/57218081/3783238
    inheritResolversFromInterfaces: true,
  });

  return graphqlSchema;
};
