import { Collection } from './base';

export interface ReaderAttributes {
  uid: string;
  name: string;
  email: string;
  website?: string;
  authUsers?: Collection<AuthUserAttributes>;
}

export interface AuthUserAttributes {
  provider: 'github';
  uid: string;
  username?: string;
}
