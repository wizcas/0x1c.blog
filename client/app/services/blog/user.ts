import { json } from 'remix';

import { ReaderFormData } from './models';
import { converters, gqlClient, mutations, queries } from './strapi';
import { ReaderInput } from './strapi/mutations';

export async function findReader(email: string) {
  const findResult = await gqlClient.request<
    queries.FindReaderResponse,
    queries.FindReaderByEmailVariable
  >(queries.findReaderbyEmail, { email });
  const hasReader = findResult.readers.data.length > 0;
  if (!hasReader) {
    return null;
  }
  return converters.toReaderModel(findResult.readers.data[0]);
}

export async function findAuthUser(provider: string, uid: string) {
  const findResult = await gqlClient.request<
    queries.FindAuthUserResponse,
    queries.FindAuthUserVariable
  >(queries.findAuthUser, { provider, uid });
  const hasAuthUser = findResult.authUsers.data.length > 0;
  if (!hasAuthUser) {
    return null;
  }
  return findResult.authUsers.data[0].id;
}

export async function createReader(formData: ReaderFormData) {
  const { authUser, ...rest } = formData;
  const authUsers: string[] = [];
  if (authUser) {
    const authUserId = await findAuthUser(
      formData.authUser.provider,
      formData.authUser.uid
    );
    if (authUserId) {
      authUsers.push(authUserId);
    } else {
      const newAuthUser = await gqlClient.request<
        mutations.CreateAuthUserResponse,
        mutations.CreateAuthUserVariable
      >(mutations.createAuthUser, { data: authUser });
      const newAuthId = newAuthUser.createAuthUser.data?.id;
      if (newAuthId) {
        authUsers.push(newAuthId);
      }
    }
  }
  const data: ReaderInput = { ...rest, authUsers };
  const response = await gqlClient.request<
    mutations.CreateReaderResponse,
    mutations.CreateReaderVariable
  >(mutations.createReader, { data });
  const newReader = response.createReader?.data;
  if (!newReader) {
    throw json('failed creating new reader', { status: 400 });
  }
  return converters.toReaderModel(newReader);
}
