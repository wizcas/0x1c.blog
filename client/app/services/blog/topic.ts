import { json } from 'remix';

import { gqlClient, queries, converters } from '../strapi';

export async function getTopic(topicId: string) {
  const response = await gqlClient.request<
    queries.TopicResponse,
    queries.TopicVariable
  >(queries.topicById, { topicId });
  const { data } = response.topic;
  if (!data) {
    throw json('Topic not found', { status: 404 });
  }
  return converters.toTopicModel(data);
}
