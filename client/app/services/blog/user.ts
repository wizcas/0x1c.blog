import { json } from 'remix';

import { converters, gqlClient, mutations, queries } from '../strapi';
import { AuthUserAttributes, Entity, ReaderAttributes } from '../strapi/models';
import { ReaderInput } from '../strapi/mutations';

import { ReaderFormData } from './models';

async function findAuthUser(provider: string, uid: string) {
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

async function createAuthUser(data: AuthUserAttributes) {
  const newAuthUser = await gqlClient.request<
    mutations.CreateAuthUserResponse,
    mutations.CreateAuthUserVariable
  >(mutations.createAuthUser, { data });
  return newAuthUser.authUser.data?.id;
}

export async function findReader(email: string) {
  const response = await gqlClient.request<
    queries.FindReaderResponse,
    queries.FindReaderByEmailVariable
  >(queries.findReaderByEmail, { email });
  const hasReader = response.readers.data.length > 0;
  if (!hasReader) {
    return null;
  }
  const firstMatch = response.readers.data[0];
  return converters.toReaderModel(firstMatch);
}

async function getAuthUsers(
  formData: ReaderFormData,
  reader?: Entity<ReaderAttributes>
): Promise<ReaderInput> {
  const { authUser, ...rest } = formData;
  const authUsers: string[] = [
    ...((reader?.attributes?.authUsers?.data
      ?.map((au) => au.id)
      .filter(Boolean) as string[]) ?? []),
  ];
  if (authUser) {
    const authUserId = await findAuthUser(authUser.provider, authUser.uid);
    if (authUserId) {
      authUsers.push(authUserId);
    } else {
      const newAuthId = await createAuthUser(authUser);
      if (newAuthId) {
        authUsers.push(newAuthId);
      }
    }
  }
  return { ...rest, authUsers };
}

export async function createReader(formData: ReaderFormData) {
  const data = await getAuthUsers(formData);
  const response = await gqlClient.request<
    mutations.CreateReaderResponse,
    mutations.CreateReaderVariable
  >(mutations.createReader, { data });
  const newReader = response.reader?.data;
  if (!newReader) {
    throw json('failed creating new reader', { status: 400 });
  }
  return converters.toReaderModel(newReader);
}

async function updateReader(id: string, formData: ReaderFormData) {
  const getResponse = await gqlClient.request<
    queries.ReaderResponse,
    queries.ReaderVariable
  >(queries.reader, { id });
  const reader = getResponse.reader.data;
  if (!reader) {
    throw json('reader not found', { status: 404 });
  }
  const data = await getAuthUsers(formData, reader);
  const updateResponse = await gqlClient.request<
    mutations.UpdateReaderResponse,
    mutations.UpdateReaderVariable
  >(mutations.updateReader, {
    id,
    data,
  });
  const updatedReader = updateResponse.reader?.data;
  if (!updatedReader) {
    throw json('failed updating reader', { status: 500 });
  }
  return converters.toReaderModel(updatedReader);
}

export async function upsertReader(data: ReaderFormData) {
  const reader = await findReader(data.email);
  if (!reader) {
    // new reader
    return createReader(data);
  }
  // update an existing reader
  return updateReader(reader.id, data);
}
