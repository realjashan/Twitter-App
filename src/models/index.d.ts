import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type LikeDbMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TweetDbMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserDbMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class LikeDb {
  readonly id: string;
  readonly userdbIDs: string;
  readonly tweetdbID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LikeDb, LikeDbMetaData>);
  static copyOf(source: LikeDb, mutator: (draft: MutableModel<LikeDb, LikeDbMetaData>) => MutableModel<LikeDb, LikeDbMetaData> | void): LikeDb;
}

export declare class TweetDb {
  readonly id: string;
  readonly content: string;
  readonly image?: string | null;
  readonly user?: string | null;
  readonly userdbID: string;
  readonly LikeDbs?: (LikeDb | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TweetDb, TweetDbMetaData>);
  static copyOf(source: TweetDb, mutator: (draft: MutableModel<TweetDb, TweetDbMetaData>) => MutableModel<TweetDb, TweetDbMetaData> | void): TweetDb;
}

export declare class UserDb {
  readonly id: string;
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly image?: string | null;
  readonly sub?: string | null;
  readonly TweetDbs?: (TweetDb | null)[] | null;
  readonly LikeDbs?: (LikeDb | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserDb, UserDbMetaData>);
  static copyOf(source: UserDb, mutator: (draft: MutableModel<UserDb, UserDbMetaData>) => MutableModel<UserDb, UserDbMetaData> | void): UserDb;
}