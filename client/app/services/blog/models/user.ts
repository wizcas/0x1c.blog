export interface Reader {
  id: string;
  name: string;
  avatar: string;
  website?: string;
  provider?: 'github';
}

export interface ReaderFormData {
  name: string;
  email: string;
  website?: string;
  authUser?: {
    provider: 'github';
    uid: string;
    username: string;
  };
}
