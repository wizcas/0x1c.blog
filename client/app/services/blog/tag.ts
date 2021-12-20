import {
  gqlClient,
  QueryTagsByIdsVariable,
  QueryTagsResponse,
  queryTagsByIds,
  toTagModel,
} from './strapi';

const DELIMITER = '+';

export function joinTagIds(ids: string[] | undefined | null) {
  return ids ? ids.join(DELIMITER) : undefined;
}

export function parseTagIds(idsString: string | undefined | null) {
  return idsString ? idsString.split(DELIMITER) : undefined;
}

export async function getTags(tagIds: string[]) {
  const response = await gqlClient.request<
    QueryTagsResponse,
    QueryTagsByIdsVariable
  >(queryTagsByIds, { tagIds: tagIds.filter(Boolean) });
  return response.tags.data.map(toTagModel);
}