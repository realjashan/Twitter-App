// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LikeDb, TweetDb, UserDb } = initSchema(schema);

export {
  LikeDb,
  TweetDb,
  UserDb
};