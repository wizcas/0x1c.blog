import { gqlClient, queries, converters } from '../strapi';

const DELIMITER = '+';

export function joinTagIds(ids: string[] | undefined | null) {
  return ids ? ids.join(DELIMITER) : undefined;
}

export function parseTagIds(idsString: string | undefined | null) {
  return idsString ? idsString.split(DELIMITER) : undefined;
}

export async function getTags(tagIds: string[]) {
  const response = await gqlClient.request<
    queries.TagsResponse,
    queries.TagsByIdsVariable
  >(queries.tagsByIds, { tagIds: tagIds.filter(Boolean) });
  return response.tags.data.map(converters.toTagModel);
}
