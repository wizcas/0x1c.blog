import { gql } from 'graphql-request';

import type {
  CategoryAttributes,
  Collection,
  ArticleAttributes,
  Singular,
  TopicAttributes,
  TagAttributes,
  ID,
} from '../models';

export interface CategoriesResponse {
  categories: Collection<CategoryAttributes>;
}
export const categories = gql`
  query Categories {
    categories {
      data {
        id
        attributes {
          title
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          themeColor
          description
        }
      }
    }
  }
`;

export const categoriesWithArticles = gql`
  query CategoriesWithArticles {
    categories {
      data {
        id
        attributes {
          title
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          themeColor
          description
          articles(sort: "updatedAt:desc", pagination: { limit: 3 }) {
            data {
              id
              attributes {
                title
                excerpt
                cover {
                  data {
                    attributes {
                      url
                      previewUrl
                    }
                  }
                }
                updatedAt
                topic {
                  data {
                    id
                    attributes {
                      title
                    }
                  }
                }
                tags {
                  data {
                    id
                    attributes {
                      label
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type CategoryVariable = { categoryId: ID };
export type CategoryResponse = { category: Singular<CategoryAttributes> };
export const category = gql`
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      data {
        id
        attributes {
          title
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          themeColor
          description
        }
      }
    }
  }
`;

export type TopicVariable = { topicId: ID };
export type TopicResponse = { topic: Singular<TopicAttributes> };
export const topicById = gql`
  query Topic($topicId: ID!) {
    topic(id: $topicId) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export type TagsByIdsVariable = { tagIds: ID[] };
export type TagsResponse = { tags: Collection<TagAttributes> };
export const tagsByIds = gql`
  query TagsByIds($tagIds: [ID]!) {
    tags(filters: { id: { in: $tagIds } }) {
      data {
        id
        attributes {
          label
        }
      }
    }
  }
`;

export type ArticlesVariable = {
  categoryId: ID;
  topicId?: ID;
  tagIds?: ID[];
  page?: number;
  pageSize?: number;
};
export type ArticlesResponse = {
  articles: Collection<ArticleAttributes>;
};
export const articles = gql`
  query ArticlesByFilters(
    $categoryId: ID!
    $topicId: ID
    $tagIds: [ID]
    $page: Int
    $pageSize: Int
  ) {
    articles(
      sort: "updatedAt:desc"
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
        category: { id: { eq: $categoryId } }
        topic: { id: { eq: $topicId } }
        tags: { id: { in: $tagIds } }
      }
    ) {
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        id
        attributes {
          title
          excerpt
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          updatedAt
          topic {
            data {
              id
              attributes {
                title
              }
            }
          }
          tags {
            data {
              id
              attributes {
                label
              }
            }
          }
        }
      }
    }
  }
`;

export type ArticleVariable = { id: ID };
export type ArticleResponse = { article: Singular<ArticleAttributes> };
export const article = gql`
  query ($id: ID!) {
    article(id: $id) {
      data {
        id
        attributes {
          title
          updatedAt
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          category {
            data {
              id
              attributes {
                title
              }
            }
          }
          topic {
            data {
              id
              attributes {
                title
              }
            }
          }
          tags {
            data {
              id
              attributes {
                label
              }
            }
          }
          content
        }
      }
    }
  }
`;
