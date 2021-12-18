import { json } from 'remix';

import {
  gqlClient,
  QueryTopicResponse,
  QueryTopicVariable,
  queryTopic,
  toTopicModel,
} from './strapi';

export async function getTopic(topicId: string) {
  const response = await gqlClient.request<
    QueryTopicResponse,
    QueryTopicVariable
  >(queryTopic, { topicId });
  const { data } = response.topic;
  if (!data) {
    throw json('Topic not found', { status: 404 });
  }
  return toTopicModel(data);
}
